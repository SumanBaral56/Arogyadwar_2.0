import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Languages } from 'lucide-react';
import { Button } from './ui';

const API_KEY = 'AIzaSyBGw6HbI2JehcmdWuqG2HrHvfhl5OxBVsk';

const QUESTIONS = [
  "What is your main health problem or symptom?",
  "How many days have you been experiencing this?",
  "How would you rate the severity? (mild/moderate/severe)",
  "Do you have a fever? If yes, what is your temperature?",
  "Are there any other symptoms you're experiencing?",
];

const LANGUAGES = [
  { code: 'en', name: 'English', libretranslate: 'en' },
  { code: 'hi', name: 'हिंदी (Hindi)', libretranslate: 'hi' },
  { code: 'bn', name: 'বাংলা (Bengali)', libretranslate: 'bn' },
  { code: 'te', name: 'తెలుగు (Telugu)', libretranslate: 'te' },
  { code: 'mr', name: 'मराठी (Marathi)', libretranslate: 'mr' },
  { code: 'ta', name: 'தமிழ் (Tamil)', libretranslate: 'ta' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', libretranslate: 'gu' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', libretranslate: 'kn' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', libretranslate: 'ml' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', libretranslate: 'pa' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', libretranslate: 'or' },
  { code: 'ur', name: 'اردو (Urdu)', libretranslate: 'ur' },
  { code: 'as', name: 'অসমীয়া (Assamese)', libretranslate: 'as' },
];

// Multiple free translation services as fallbacks
const TRANSLATION_SERVICES = {
  // Google Translate (via proxy - free, supports all Indian languages)
  google: async (text, source, target) => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      
      if (!response.ok) {
        console.log(`Google Translate HTTP error: ${response.status}`);
        return null;
      }
      
      const data = await response.json();
      if (data && Array.isArray(data) && data[0] && Array.isArray(data[0])) {
        const translated = data[0]
          .map(item => item && item[0] ? item[0] : '')
          .filter(item => item)
          .join('');
        if (translated && translated.trim()) {
          return translated;
        }
      }
      return null;
    } catch (error) {
      console.log('Google Translate error:', error.message);
      return null;
    }
  },
  
  // LibreTranslate (open source)
  libretranslate: async (text, source, target) => {
    try {
      const endpoints = [
        'https://libretranslate.de/translate',
        'https://translate.argosopentech.com/translate',
      ];
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: text,
              source: source,
              target: target,
              format: 'text',
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.translatedText) {
              return data.translatedText;
            }
          }
        } catch (e) {
          continue;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [healthData, setHealthData] = useState({
    problem: '',
    days: '',
    severity: '',
    temperature: '',
    otherSymptoms: '',
  });
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const [isChatStopped, setIsChatStopped] = useState(false);
  const messagesEndRef = useRef(null);
  const translationCache = useRef(new Map());

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestion(0);
    setUserInput('');
    setIsTyping(false);
    setHealthData({
      problem: '',
      days: '',
      severity: '',
      temperature: '',
      otherSymptoms: '',
    });
    setInvalidAttempts(0);
    setIsChatStopped(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const translateText = async (text, targetLang) => {
    if (targetLang === 'en' || !text) return text;

    const cacheKey = `${text}-en-${targetLang}`;
    if (translationCache.current.has(cacheKey)) {
      console.log(`Using cached translation for: "${text}"`);
      return translationCache.current.get(cacheKey);
    }

    try {
      setIsTranslating(true);

      const langInfo = LANGUAGES.find(l => l.code === targetLang);
      const targetLangCode = langInfo?.libretranslate || targetLang;

      // Try Google Translate first (most reliable for Indian languages)
      let translated = await TRANSLATION_SERVICES.google(text, 'en', targetLangCode);
      if (translated) {
        translationCache.current.set(cacheKey, translated);
        return translated;
      }

      // Fallback to LibreTranslate
      translated = await TRANSLATION_SERVICES.libretranslate(text, 'en', targetLangCode);
      if (translated) {
        translationCache.current.set(cacheKey, translated);
        return translated;
      }

      // If all fail, return original text
      console.warn('Translation failed, returning original text');
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const translateToEnglish = async (text, sourceLang) => {
    if (sourceLang === 'en' || !text) return text;

    // Skip translation for numbers and very short strings (likely don't need translation)
    if (/^\d+$/.test(text.trim()) || text.trim().length <= 1) {
      return text;
    }

    const cacheKey = `${text}-${sourceLang}-en`;
    if (translationCache.current.has(cacheKey)) {
      console.log(`Using cached translation for: "${text}"`);
      return translationCache.current.get(cacheKey);
    }

    try {
      const langInfo = LANGUAGES.find(l => l.code === sourceLang);
      const sourceLangCode = langInfo?.libretranslate || sourceLang;

      console.log(`Attempting to translate from ${sourceLang} (${sourceLangCode}) to English: "${text}"`);

      // Try Google Translate first (most reliable for Indian languages)
      let translated = await TRANSLATION_SERVICES.google(text, sourceLangCode, 'en');
      if (translated && translated.trim() && translated !== text) {
        console.log(`Google Translate succeeded: "${translated}"`);
        translationCache.current.set(cacheKey, translated);
        return translated;
      }

      // Fallback to LibreTranslate
      translated = await TRANSLATION_SERVICES.libretranslate(text, sourceLangCode, 'en');
      if (translated && translated.trim() && translated !== text) {
        console.log(`LibreTranslate succeeded: "${translated}"`);
        translationCache.current.set(cacheKey, translated);
        return translated;
      }

      // If all fail, return original text
      console.warn(`Translation to English failed for "${text}" from ${sourceLang}, returning original text`);
      return text;
    } catch (error) {
      console.error('Translation to English error:', error);
      return text;
    }
  };

  const translateMessages = async (newMessages, targetLang) => {
    if (targetLang === 'en') {
      // If switching back to English, restore original content for bot messages
      return newMessages.map(msg => {
        if (msg.type === 'user') {
          // Keep user messages as they are (in their original language)
          return msg;
        }
        return {
          ...msg,
          content: msg.originalContent || msg.content,
        };
      });
    }
    
    const translatedMessages = await Promise.all(
      newMessages.map(async (msg) => {
        // Don't translate user messages - keep them in their original language
        if (msg.type === 'user') {
          return msg;
        }
        
        // Use original content for translation if available
        const textToTranslate = msg.originalContent || msg.content;
        const translated = await translateText(textToTranslate, targetLang);
        return {
          ...msg,
          content: translated,
          originalContent: msg.originalContent || msg.content,
          translatedContent: translated,
          translatedLanguage: targetLang,
        };
      })
    );
    return translatedMessages;
  };

  useEffect(() => {
    if (messages.length > 0) {
      const translateAllMessages = async () => {
        const translated = await translateMessages(messages, selectedLanguage);
        setMessages(translated);
      };
      translateAllMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initializeMessages = async () => {
        const welcomeMsg = "Hello! I'm your health assistant. I'll ask you a few questions to understand your condition better. Let's start with your health concerns.";
        const firstQuestion = QUESTIONS[0];
        
        let welcomeTranslated = welcomeMsg;
        let questionTranslated = firstQuestion;
        
        if (selectedLanguage !== 'en') {
          welcomeTranslated = await translateText(welcomeMsg, selectedLanguage);
          questionTranslated = await translateText(firstQuestion, selectedLanguage);
        }
        
        setMessages([
          {
            type: 'bot',
            content: welcomeTranslated,
            originalContent: welcomeMsg,
            translatedContent: welcomeTranslated,
            translatedLanguage: selectedLanguage,
            timestamp: new Date(),
          },
        ]);
        setTimeout(async () => {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: questionTranslated,
            originalContent: firstQuestion,
            translatedContent: questionTranslated,
            translatedLanguage: selectedLanguage,
            timestamp: new Date(),
          }]);
        }, 1000);
      };
      initializeMessages();
    }
  }, [isOpen, messages.length, selectedLanguage]);

  const isValidNumberWord = (input) => {
    const numberWords = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
      'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
      'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
      'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
      'eighty': 80, 'ninety': 90, 'hundred': 100
    };
    return numberWords[input] !== undefined;
  };

  const isValidMedicalSymptom = (input) => {
    const lowerInput = input.toLowerCase().trim();
    const medicalKeywords = [
      'nausea', 'vomit', 'stomach', 'digest', 'fever', 'temperature', 'chill',
      'cough', 'throat', 'congestion', 'cold', 'headache', 'migraine', 'head',
      'cramp', 'cramps', 'pain', 'ache', 'joint', 'body', 'skin', 'rash', 'itch',
      'burn', 'irritation', 'eye', 'eyes', 'vision', 'sight', 'ear', 'earache',
      'hearing', 'tired', 'fatigue', 'weak', 'exhaust', 'energy', 'stress',
      'anxiety', 'worry', 'nervous', 'runny nose', 'sneeze', 'sore throat',
      'period', 'menstrual', 'monthly', 'back', 'spine', 'posture', 'flu',
      'infection', 'allergy', 'asthma', 'diarrhea', 'constipation', 'indigestion',
      'heartburn', 'acid reflux', 'arthritis', 'sprain', 'strain', 'bruise',
      'wound', 'cut', 'burn', 'sunburn', 'poison', 'bite', 'sting', 'allergic',
      'reaction', 'swelling', 'inflammation', 'infection', 'virus', 'bacterial',
      'fungal', 'parasite', 'dehydration', 'dizziness', 'vertigo', 'lightheaded',
      'fainting', 'seizure', 'convulsion', 'tremor', 'shaking', 'numbness',
      'tingling', 'paralysis', 'weakness', 'paralysis', 'stroke', 'heart',
      'chest', 'breathing', 'shortness', 'breath', 'asthma', 'bronchitis',
      'pneumonia', 'sinus', 'sinusitis', 'tonsillitis', 'pharyngitis', 'laryngitis',
      'otitis', 'conjunctivitis', 'keratitis', 'glaucoma', 'cataract', 'retinitis',
      'uveitis', 'blepharitis', 'stye', 'chalazion', 'dermatitis', 'eczema',
      'psoriasis', 'acne', 'boil', 'carbuncle', 'abscess', 'cyst', 'wart',
      'mole', 'tumor', 'cancer', 'diabetes', 'hypertension', 'hypotension',
      'anemia', 'thyroid', 'hormone', 'endocrine', 'kidney', 'liver', 'gallbladder',
      'pancreas', 'spleen', 'intestine', 'colon', 'rectum', 'anus', 'bladder',
      'prostate', 'uterus', 'ovary', 'cervix', 'vagina', 'penis', 'testicle',
      'breast', 'lung', 'bone', 'muscle', 'tendon', 'ligament', 'cartilage',
      'joint', 'spine', 'neck', 'shoulder', 'arm', 'elbow', 'wrist', 'hand',
      'finger', 'hip', 'knee', 'ankle', 'foot', 'toe', 'skull', 'brain',
      'nerve', 'spinal cord', 'meningitis', 'encephalitis', 'neuropathy',
      'neuralgia', 'sciatica', 'hernia', 'ulcer', 'gastritis', 'colitis',
      'hepatitis', 'cirrhosis', 'nephritis', 'cystitis', 'urethritis', 'prostatitis',
      'endometriosis', 'fibroids', 'polycystic', 'ovarian', 'menopause',
      'pregnancy', 'labor', 'delivery', 'miscarriage', 'abortion', 'infertility',
      'impotence', 'erectile', 'dysfunction', 'std', 'sti', 'hiv', 'aids',
      'herpes', 'syphilis', 'gonorrhea', 'chlamydia', 'hepatitis', 'tuberculosis',
      'malaria', 'dengue', 'chikungunya', 'zika', 'ebola', 'covid', 'coronavirus',
      'sars', 'mers', 'influenza', 'measles', 'mumps', 'rubella', 'chickenpox',
      'shingles', 'pertussis', 'diphtheria', 'tetanus', 'polio', 'rabies',
      'leprosy', 'leishmaniasis', 'trypanosomiasis', 'schistosomiasis', 'filariasis',
      'onchocerciasis', 'dracunculiasis', 'guinea worm', 'lymphatic', 'elephantiasis',
      'river blindness', 'sleeping sickness', 'chagas', 'african', 'trypanosomiasis',
      'american', 'trypanosomiasis', 'visceral', 'leishmaniasis', 'cutaneous',
      'mucocutaneous', 'toxoplasmosis', 'cryptosporidiosis', 'giardiasis',
      'amebiasis', 'ascariasis', 'trichuriasis', 'hookworm', 'enterobiasis',
      'strongyloidiasis', 'taeniasis', 'cysticercosis', 'echinococcosis',
      'opisthorchiasis', 'clonorchiasis', 'fascioliasis', 'fasciolopsiasis',
      'paragonimiasis', 'schistosomiasis', 'lung fluke', 'liver fluke',
      'intestinal fluke', 'blood fluke', 'trematode', 'cestode', 'nematode',
      'protozoa', 'helminth', 'parasite', 'worm', 'tapeworm', 'roundworm',
      'flatworm', 'pinworm', 'whipworm', 'hookworm', 'ascarid', 'trichinella',
      'toxocara', 'ancylostoma', 'necator', 'strongyloides', 'dracunculus',
      'wuchereria', 'brugia', 'onchocerca', 'loa loa', 'mansonella', 'dirofilaria',
      'toxoplasma', 'cryptosporidium', 'giardia', 'entamoeba', 'plasmodium',
      'trypanosoma', 'leishmania', 'schistosoma', 'fasciola', 'opisthorchis',
      'clonorchis', 'fasciolopsis', 'paragonimus', 'echinococcus', 'taenia',
      'hymenolepis', 'dipylidium', 'spirometra', 'diphyllobothrium', 'anisakis',
      'pseudoterranova', 'contracaecum', 'capillaria', 'trichostrongylus',
      'ostertagia', 'haemonchus', 'bunostomum', 'oesophagostomum', 'trichuris',
      'capillaria', 'trichinella', 'toxocara', 'baylisascaris', 'anisakis',
      'pseudoterranova', 'contracaecum', 'gnathostoma', 'angiostrongylus',
      'parastrongylus', 'metastrongylus', 'dictyocaulus', 'protostrongylus',
      'muellerius', 'crenosoma', 'filaroides', 'oslerus', 'stewardsonia',
      'capillaria', 'eucoleus', 'trichuris', 'capillaria', 'trichinella',
      'toxocara', 'baylisascaris', 'anisakis', 'pseudoterranova', 'contracaecum',
      'gnathostoma', 'angiostrongylus', 'parastrongylus', 'metastrongylus',
      'dictyocaulus', 'protostrongylus', 'muellerius', 'crenosoma', 'filaroides',
      'oslerus', 'stewardsonia', 'capillaria', 'eucoleus', 'trichuris', 'capillaria',
      'acidity', 'sour stomach', 'gastroesophageal reflux', 'reflux', 'burning sensation in chest', 
      'regurgitation', 'Hyperacidity','bleeding','blood','bruise','swelling','open wound','scratch',
      'dog bite','cat bite','animal bite','insect bite','bug bite','spider bite','snake bite','scorpion sting',
      'sting','burn','blister','acid burn','chemical burn','sunburn','frostbite burn','sun burn','heat burn',
      'electric burn','thermal burn'
    ];

    return medicalKeywords.some(keyword => lowerInput.includes(keyword));
  };

  const validateInput = (input, questionIndex) => {
    const trimmedInput = input.trim();
    switch (questionIndex) {
      case 0: // Symptom - must contain valid medical keywords
        return isValidMedicalSymptom(input);
      case 1: // Days - should be a positive number or number word
        const days = parseInt(trimmedInput);
        if (!isNaN(days) && days > 0) return true;
        return isValidNumberWord(trimmedInput);
      case 2: // Severity - should be mild/moderate/severe
        return ['mild', 'moderate', 'severe'].includes(trimmedInput);
      case 3: // Fever - should be yes/no or a temperature number
        if (trimmedInput === 'yes' || trimmedInput === 'no') return true;
        const temp = parseFloat(trimmedInput);
        return !isNaN(temp) && temp > 0 && temp < 200; // reasonable temperature range
      case 4: // Other symptoms - always valid
        return true;
      default:
        return true;
    }
  };

  const getValidationErrorMessage = (questionIndex) => {
    switch (questionIndex) {
      case 0:
        return "Please describe a valid medical symptom or health concern (e.g., headache, fever, stomach pain).";
      case 1:
        return "Please enter a valid number of days (e.g., 3 or 5).";
      case 2:
        return "Please specify the severity as 'mild', 'moderate', or 'severe'.";
      case 3:
        return "Please answer 'yes' or 'no' for fever, or provide your temperature if you have it (e.g., 98.6).";
      default:
        return "Please provide a valid answer.";
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isChatStopped) return;

    // Validate input first
    if (!validateInput(userInput, currentQuestion)) {
      // Handle invalid attempts for symptom question
      if (currentQuestion === 0) {
        setInvalidAttempts(prev => prev + 1);
        if (invalidAttempts + 1 >= 3) {
          // Stop chat after 3 invalid attempts
          setIsChatStopped(true);
          const regretMsg = "I'm sorry, but I need valid medical symptoms to provide helpful advice. Please consult a healthcare professional for proper guidance.";
          let translatedRegret = regretMsg;

          if (selectedLanguage !== 'en') {
            translatedRegret = await translateText(regretMsg, selectedLanguage);
          }

          setMessages(prev => [...prev, {
            type: 'bot',
            content: translatedRegret,
            originalContent: regretMsg,
            translatedContent: translatedRegret,
            translatedLanguage: selectedLanguage,
            timestamp: new Date(),
          }]);
          return;
        }
      }

      const errorMsg = getValidationErrorMessage(currentQuestion);
      let translatedError = errorMsg;

      if (selectedLanguage !== 'en') {
        translatedError = await translateText(errorMsg, selectedLanguage);
      }

      setMessages(prev => [...prev, {
        type: 'bot',
        content: translatedError,
        originalContent: errorMsg,
        translatedContent: translatedError,
        translatedLanguage: selectedLanguage,
        timestamp: new Date(),
      }]);
      return; // Don't proceed, stay on current question
    }

    // Translate user input to English for AI processing
    let englishInput = userInput;
    if (selectedLanguage !== 'en') {
      console.log(`Translating user input from ${selectedLanguage} to English: "${userInput}"`);
      englishInput = await translateToEnglish(userInput, selectedLanguage);
      console.log(`Translated to English: "${englishInput}"`);

      // If translation failed, use original input
      if (!englishInput || englishInput === userInput) {
        console.warn('Translation may have failed, using original input');
      }
    }

    const userMessage = {
      type: 'user',
      content: userInput, // Display original user input in their language
      originalContent: userInput,
      englishContent: englishInput, // Store English translation for AI
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Store the English translated answer for AI processing
    const fieldNames = ['problem', 'days', 'severity', 'temperature', 'otherSymptoms'];
    setHealthData(prev => ({
      ...prev,
      [fieldNames[currentQuestion]]: englishInput || userInput, // Store English version for AI, fallback to original
    }));

    setUserInput('');
    setCurrentQuestion(prev => prev + 1);

    if (currentQuestion + 1 < QUESTIONS.length) {
      setTimeout(async () => {
        const nextQuestion = QUESTIONS[currentQuestion + 1];
        let translatedQuestion = nextQuestion;

        if (selectedLanguage !== 'en') {
          translatedQuestion = await translateText(nextQuestion, selectedLanguage);
        }

        setMessages(prev => [...prev, {
          type: 'bot',
          content: translatedQuestion,
          originalContent: nextQuestion,
          translatedContent: translatedQuestion,
          translatedLanguage: selectedLanguage,
          timestamp: new Date(),
        }]);
      }, 1000);
    } else {
      // All questions answered, get AI advice
      setIsTyping(true);
      await getAIAdvice();
      setIsTyping(false);
    }
  };

  const getAIAdvice = async () => {
    const mainSymptom = (healthData.problem || '').toLowerCase();
    const additionalSymptoms = (healthData.otherSymptoms || '').toLowerCase();

    let advice = '';

    // DIRECT CONDITIONAL LOGIC - Check main symptom first
    if (mainSymptom.includes('nausea') || mainSymptom.includes('vomit') || mainSymptom.includes('stomach pain') || mainSymptom.includes('stomach')||mainSymptom.includes('stomach ache')|| mainSymptom.includes('digest') || mainSymptom.includes('constipation') || mainSymptom.includes('diarrhea')) {
      advice = `Based on your nausea/stomach issues, here are specific digestive care steps:

1. Sip clear fluids slowly - take small sips of water, electrolyte drinks, or ice chips every 10-15 minutes
2. Follow BRAT diet only - eat only bananas, plain rice, applesauce, and dry toast for 24 hours
3. Drink fresh ginger tea - steep thin slices of fresh ginger root in hot water for 5-10 minutes
4. Take small sips of peppermint tea - let peppermint tea bags steep in hot water
5. Lie down with your head elevated on extra pillows to reduce nausea/ stomach issues

If nausea worsens, vomiting becomes frequent, or you can't keep fluids down, seek medical attention immediately.`;
    }
    else if (mainSymptom.includes('fever') || mainSymptom.includes('temperature') || mainSymptom.includes('hot') || mainSymptom.includes('chill')) {
      advice = `Based on your fever symptoms, here are specific fever management steps:

1. Apply a cool, damp cloth to your forehead and neck - change it every 10-15 minutes
2. Drink plenty of cool water or clear fluids - aim for frequent small sips
3. Wear light, loose clothing and keep your room cool (around 70°F/21°C)
4. Rest in a comfortable, quiet environment away from bright lights
5. Take a lukewarm (not cold) bath if you're shivering to help reduce chills

If your fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe headache, confusion, or difficulty breathing, seek immediate medical care.`;
    }
    else if (mainSymptom.includes('cough') || mainSymptom.includes('throat') || mainSymptom.includes('congestion') || mainSymptom.includes('cold')) {
      advice = `Based on your respiratory symptoms, here are specific breathing care steps:

1. Inhale steam from a hot water bowl with a towel over your head for 5-10 minutes
2. Gargle with warm salt water - mix 1/2 teaspoon salt in 8 ounces warm water
3. Drink warm honey-lemon water - mix 1 teaspoon honey with fresh lemon juice in warm water
4. Use a humidifier in your bedroom at night to add moisture to the air
5. Sleep with your head elevated on extra pillows to help with congestion

If breathing becomes difficult, chest pain occurs, or symptoms worsen rapidly, seek emergency medical care.`;
    }
    else if (mainSymptom.includes('headache') || mainSymptom.includes('migraine') || mainSymptom.includes('head pain')) {
      advice = `Based on your headache symptoms, here are specific headache relief steps:

1. Rest in a dark, quiet room away from bright lights and loud noises
2. Apply a cold compress or ice pack wrapped in a cloth to your forehead for 15-20 minutes
3. Drink plenty of water and stay hydrated - dehydration can trigger headaches
4. Practice deep breathing exercises or gentle neck and shoulder stretches
5. Try relaxation techniques like meditation or progressive muscle relaxation

If headaches are severe, frequent, or accompanied by nausea, vomiting, vision changes, or neck stiffness, consult a healthcare provider promptly.`;
      console.log('DEBUG - Matched HEADACHE category');
    }
    else if ((mainSymptom.includes('cramp') || mainSymptom.includes('cramps')) && !(mainSymptom.includes('period') || mainSymptom.includes('menstrual') || mainSymptom.includes('monthly'))) {
      advice = `Based on your cramp symptoms, here are specific relief steps:

1. Gently stretch and massage the affected muscle - hold the stretch for 20-30 seconds without bouncing
2. Apply heat or cold therapy - try a warm compress for relaxation or ice pack for 15-20 minutes to reduce inflammation
3. Stay hydrated and replenish electrolytes - drink water with a pinch of salt or electrolyte-rich fluids like coconut water
4. Elevate the affected area above heart level and rest comfortably
5. Consider gentle walking or light activity to improve circulation, but avoid strenuous exercise

If cramps are frequent, severe, last more than 10 minutes, or are accompanied by swelling/redness, consult a healthcare provider.`;
      console.log('DEBUG - Matched CRAMP category');
    }
    else if (mainSymptom.includes('pain') || mainSymptom.includes('ache')  || mainSymptom.includes('joint') || mainSymptom.includes('body ache')) {
      advice = `Based on your pain symptoms, here are specific pain relief steps:

1. Apply ice wrapped in a cloth for 15-20 minutes to reduce swelling and numb pain
2. Rest the affected area completely - avoid using it until pain decreases
3. Elevate the injured area above your heart level when possible
4. Use gentle compression with an elastic bandage if swelling is present
5. Apply a warm compress after 48 hours to improve blood flow and healing

If pain is severe, swelling increases rapidly, or you can't move the affected area, consult a healthcare provider promptly.`;
      console.log('DEBUG - Matched PAIN category');
    }
    else if (mainSymptom.includes('skin') || mainSymptom.includes('rash') || mainSymptom.includes('itch')  || mainSymptom.includes('irritation')) {
      advice = `Based on your skin symptoms, here are specific skin care steps:

1. Apply cool, wet compresses to the affected area for 10-15 minutes
2. Avoid scratching or rubbing the skin to prevent further irritation
3. Wear loose, breathable cotton clothing over the area
4. Apply pure aloe vera gel or calamine lotion to soothe the skin
5. Keep the area clean and dry, changing clothes frequently if needed

If the rash spreads rapidly, you develop blisters, or experience severe swelling, seek medical attention immediately.`;
      console.log('DEBUG - Matched SKIN category');
    }
    else if (mainSymptom.includes('eye') || mainSymptom.includes('eyes') || mainSymptom.includes('vision') || mainSymptom.includes('sight')) {
      advice = `Based on your eye symptoms, here are specific eye care steps:

1. Apply a cool, damp cloth over closed eyes for 10-15 minutes
2. Use preservative-free artificial tears eye drops if available
3. Avoid rubbing your eyes to prevent further irritation
4. Clean your hands thoroughly before touching your eyes
5. Rest your eyes by limiting screen time and reading

If you experience severe pain, vision changes, light sensitivity, or discharge from the eye, consult an eye doctor promptly.`;
      console.log('DEBUG - Matched EYE category');
    }
    else if (mainSymptom.includes('ear') || mainSymptom.includes('earache') || mainSymptom.includes('hearing')) {
      advice = `Based on your ear symptoms, here are specific ear care steps:

1. Apply a warm (not hot) compress to the affected ear for 10-15 minutes
2. Stay well hydrated with plenty of fluids
3. Avoid inserting anything into the ear canal
4. Rest on the side opposite the affected ear when sleeping
5. Use over-the-counter pain relief if appropriate for your age

If ear pain is severe, accompanied by fever, or you experience hearing loss, consult a healthcare provider.`;
      console.log('DEBUG - Matched EAR category');
    }
    else if (mainSymptom.includes('tired') || mainSymptom.includes('fatigue') || mainSymptom.includes('weak') || mainSymptom.includes('exhaust') || mainSymptom.includes('energy')) {
      advice = `Based on your fatigue symptoms, here are specific energy restoration steps:

1. Take short naps of 20-30 minutes during the day to recharge
2. Eat small, frequent nutritious meals throughout the day
3. Stay well hydrated with water and clear fluids
4. Do gentle stretching or take short walks if you have energy
5. Maintain a consistent sleep schedule going to bed and waking at the same time

If fatigue persists for more than 2 weeks, is severe, or is accompanied by other symptoms, consult a healthcare provider.`;
      console.log('DEBUG - Matched FATIGUE category');
    } 

    //ME
    
    else if (mainSymptom.includes('acid reflux') || mainSymptom.includes('GERD') || mainSymptom.includes('heartburn') || mainSymptom.includes('indigestion') || mainSymptom.includes('stomach upset') || mainSymptom.includes('acidity') || mainSymptom.includes('sour stomach') || mainSymptom.includes('gastroesophageal reflux') || mainSymptom.includes('reflux')|| mainSymptom.includes('burning sensation in chest') || mainSymptom.includes('regurgitation') || mainSymptom.includes('Hyperacidity')) {
      advice = `Based on your acid reflux symptoms, here are specific headache relief steps:

1. Eat small, frequent meals instead of large portions

2.Avoid spicy, fried, acidic foods and carbonated drinks

3. Do not lie down for at least 2–3 hours after eating

4. Elevate your head slightly while sleeping

5. Take antacids or acid-reducing medication as prescribed

If you experience chest pain, difficulty swallowing, frequent vomiting, or symptoms that do not improve, seek medical attention immediately.`;
      console.log('DEBUG - Matched ACID REFLUX category');
    }

    else if (mainSymptom.includes('cut') || mainSymptom.includes('wound') || mainSymptom.includes('abrasion') || mainSymptom.includes('laceration') || mainSymptom.includes('scratch') || mainSymptom.includes('open wound') || mainSymptom.includes('bleeding') || mainSymptom.includes('scab')) {
      advice = `Based on your cut symptoms, here are specific care steps:

1.Rinse the cut gently with clean running water to remove dirt

2.Stop bleeding by applying gentle pressure with a clean cloth

3.Apply an antiseptic or antibiotic ointment

4.Cover the cut with a clean, dry bandage

5.Change the dressing daily or if it becomes wet or dirty

If the cut is deep, bleeding does not stop, or the edges are wide open, seek medical attention immediately.`;
      console.log('DEBUG - Matched CUT category');
    }
    else if (mainSymptom.includes('bite') || mainSymptom.includes('animal bite') || mainSymptom.includes('snake bite') || mainSymptom.includes('dog bite') || mainSymptom.includes('cat bite')) {
      advice = `Based on your animal bite symptoms, here are specific care steps:

1.Wash the wound thoroughly with soap and running water

2.Control bleeding with gentle pressure

3.Apply antiseptic and cover with a clean dressing

4.Avoid closing the wound tightly without medical advice

5.Seek medical care for vaccination and infection prevention

If the bite is deep, bleeding heavily, or from a stray animal, seek medical attention immediately.`;
      console.log('DEBUG - Matched Animal BITE category');
    }
    else if (mainSymptom.includes('insect bite') || mainSymptom.includes('sting') || mainSymptom.includes('bee sting') || mainSymptom.includes('scorpion sting')) {
      advice = `Based on your bite or sting symptoms, here are specific care steps:

1.Clean the area with soap and water

2.Apply a cold compress to reduce swelling and pain

3.Avoid scratching the area

4.Apply calamine lotion or antihistamine cream if needed

5.Observe for signs of allergic reaction

If you develop severe swelling, breathing difficulty, dizziness, or widespread rash, seek medical attention immediately.`;
      console.log('DEBUG - Matched INSECT BITE category');
    }
     else if (mainSymptom.includes('burn') || mainSymptom.includes('scald') || mainSymptom.includes('sunburn') || mainSymptom.includes('chemical burn')|| mainSymptom.includes('heat injury')|| mainSymptom.includes('fire burn')|| mainSymptom.includes('thermal burn')|| mainSymptom.includes('electric burn')|| mainSymptom.includes('flash burn')|| mainSymptom.includes('radiation burn')|| mainSymptom.includes('friction burn')|| mainSymptom.includes('cold burn')|| mainSymptom.includes('ice burn')|| mainSymptom.includes('hypothermia burn')|| mainSymptom.includes('frostbite burn')|| mainSymptom.includes('sun burn')|| mainSymptom.includes('chemical burn')|| mainSymptom.includes('acid burn')) {
      advice = `Based on your burn or heat injury symptoms, here are specific care steps:

1.Cool the affected area immediately under clean running water for 10–20 minutes

2.Remove tight clothing or jewelry near the burn area (do not remove stuck material)

3.Do not apply ice, toothpaste, butter, oil, or home remedies

4.Cover the burn loosely with a clean, non-stick dressing or cloth

5.Do not break blisters; take pain-relief medication only if advised

6.If the burn is deep, causes severe blistering, affects the face, hands, feet, or genitals, covers a large area, or is due to chemicals or electricity, seek medical attention immediately.`;
      console.log('DEBUG - Matched BURN category');
    }
    // end me

    
    else if ((mainSymptom.includes('cramp') || mainSymptom.includes('cramps')) && !(mainSymptom.includes('period') || mainSymptom.includes('menstrual') || mainSymptom.includes('monthly'))) {
      advice = `Based on your cramp symptoms, here are specific relief steps:

1. Gently stretch and massage the affected muscle - hold the stretch for 20-30 seconds without bouncing
2. Apply heat or cold therapy - try a warm compress for relaxation or ice pack for 15-20 minutes to reduce inflammation
3. Stay hydrated and replenish electrolytes - drink water with a pinch of salt or electrolyte-rich fluids like coconut water
4. Elevate the affected area above heart level and rest comfortably
5. Consider gentle walking or light activity to improve circulation, but avoid strenuous exercise

If cramps are frequent, severe, last more than 10 minutes, or are accompanied by swelling/redness, consult a healthcare provider.`;
      console.log('DEBUG - Matched CRAMP category');
    }

    
    else if (mainSymptom.includes('stress') || mainSymptom.includes('anxiety') || mainSymptom.includes('worry') || mainSymptom.includes('nervous')) {
      advice = `Based on your stress/anxiety symptoms, here are specific relaxation steps:

1. Practice deep breathing: inhale slowly for 4 counts, hold for 4, exhale for 4
2. Take short walks in nature or a quiet environment
3. Try progressive muscle relaxation - tense and release muscle groups
4. Limit caffeine and maintain regular meal times
5. Establish a calming bedtime routine with dim lights and no screens

If anxiety is severe, persistent, or interfering with daily activities, consult a mental health professional.`;
      console.log('DEBUG - Matched STRESS category');
    }
    else if (mainSymptom.includes('cold') || mainSymptom.includes('runny nose') || mainSymptom.includes('sneeze') || mainSymptom.includes('sore throat')) {
      advice = `Based on your cold symptoms, here are specific cold relief steps:

1. Stay hydrated with warm fluids like herbal tea or clear broth
2. Use a saline nasal spray or rinse to clear nasal passages
3. Gargle with warm salt water for sore throat relief
4. Rest in a comfortable environment with good ventilation
5. Use a humidifier to add moisture to the air

If symptoms persist beyond 10 days, worsen, or include high fever, consult a healthcare provider.`;
      console.log('DEBUG - Matched COLD category');
    }

    else if (mainSymptom.includes('period') || mainSymptom.includes('menstrual') || mainSymptom.includes('cramps') || mainSymptom.includes('monthly')) {
      advice = `Based on your menstrual symptoms, here are specific period relief steps:

1. Apply a heating pad or warm compress to your lower abdomen
2. Practice gentle stretching or yoga poses for cramps
3. Stay hydrated and eat small, frequent meals
4. Try herbal teas like ginger or peppermint for nausea
5. Rest when needed and avoid strenuous activities

If menstrual pain is severe, irregular, or accompanied by heavy bleeding, consult a healthcare provider.`;
      console.log('DEBUG - Matched MENSTRUAL category');
    }
    else if (mainSymptom.includes('back pain') || mainSymptom.includes('spine pain') || mainSymptom.includes('posture')) {
      advice = `Based on your back symptoms, here are specific back care steps:

1. Apply ice for the first 48 hours, then switch to heat therapy
2. Maintain good posture when sitting and standing
3. Sleep on a supportive mattress with proper pillow alignment
4. Do gentle stretching exercises focusing on back and core muscles
5. Avoid heavy lifting and twisting movements

If back pain is severe, radiates down the legs, or is accompanied by numbness, seek medical attention.`;
      console.log('DEBUG - Matched BACK category');
    }
    else {
      // Generic fallback only if no specific symptoms match
      advice = `I’m sorry, I couldn’t understand your message.Please try describing your symptoms, such as fever, pain, or cough.`;
      console.log('DEBUG - Fell back to GENERIC category');
    }

    // Use the advice directly instead of calling AI
    let translatedAdvice = advice;
    if (selectedLanguage !== 'en') {
      translatedAdvice = await translateText(advice, selectedLanguage);
    }

    setMessages(prev => [...prev, {
      type: 'bot',
      content: translatedAdvice,
      originalContent: advice,
      translatedContent: translatedAdvice,
      translatedLanguage: selectedLanguage,
      timestamp: new Date(),
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl h-3/4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t-lg bg-green-50">
          <div className="flex items-center space-x-2">
            <Bot className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-green-800">Health Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Languages className="text-green-600" size={18} />
              <select
                value={selectedLanguage}
                onChange={async (e) => {
                  const newLang = e.target.value;
                  setSelectedLanguage(newLang);
                  if (messages.length > 0) {
                    const translated = await translateMessages(messages, newLang);
                    setMessages(translated);
                  }
                }}
                className="px-2 py-1 text-sm text-green-800 bg-white border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isTranslating}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-center mb-1 space-x-2">
                  {message.type === 'user' ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot size={16} />
                  <span className="text-sm">
                    {selectedLanguage === 'en' ? 'AI is thinking...' : 
                     selectedLanguage === 'hi' ? 'AI सोच रहा है...' :
                     selectedLanguage === 'bn' ? 'AI চিন্তা করছে...' :
                     selectedLanguage === 'te' ? 'AI ఆలోచిస్తోంది...' :
                     selectedLanguage === 'mr' ? 'AI विचार करत आहे...' :
                     selectedLanguage === 'ta' ? 'AI சிந்திக்கிறது...' :
                     selectedLanguage === 'gu' ? 'AI વિચારી રહ્યું છે...' :
                     selectedLanguage === 'kn' ? 'AI ಯೋಚಿಸುತ್ತಿದೆ...' :
                     selectedLanguage === 'ml' ? 'AI ചിന്തിക്കുന്നു...' :
                     selectedLanguage === 'pa' ? 'AI ਸੋਚ ਰਿਹਾ ਹੈ...' :
                     selectedLanguage === 'or' ? 'AI ଚିନ୍ତା କରୁଛି...' :
                     selectedLanguage === 'ur' ? 'AI سوچ رہا ہے...' :
                     selectedLanguage === 'as' ? 'AI ভাবি আছে...' :
                     'AI is thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {currentQuestion < QUESTIONS.length && (
          <div className="p-4 border-t rounded-b-lg bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toLowerCase())}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedLanguage === 'en' ? "Type your answer..." : 
                  selectedLanguage === 'hi' ? "अपना उत्तर टाइप करें..." :
                  selectedLanguage === 'bn' ? "আপনার উত্তর টাইপ করুন..." :
                  selectedLanguage === 'te' ? "మీ సమాధానం టైప్ చేయండి..." :
                  selectedLanguage === 'mr' ? "तुमचे उत्तर टाइप करा..." :
                  selectedLanguage === 'ta' ? "உங்கள் பதிலை தட்டச்சு செய்யவும்..." :
                  selectedLanguage === 'gu' ? "તમારો જવાબ ટાઇપ કરો..." :
                  selectedLanguage === 'kn' ? "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಟೈಪ್ ಮಾಡಿ..." :
                  selectedLanguage === 'ml' ? "നിങ്ങളുടെ ഉത്തരം ടൈപ്പ് ചെയ്യുക..." :
                  selectedLanguage === 'pa' ? "ਆਪਣਾ ਜਵਾਬ ਟਾਈਪ ਕਰੋ..." :
                  selectedLanguage === 'or' ? "ଆପଣଙ୍କର ଉତ୍ତର ଟାଇପ୍ କରନ୍ତୁ..." :
                  selectedLanguage === 'ur' ? "اپنا جواب ٹائپ کریں..." :
                  selectedLanguage === 'as' ? "আপোনাৰ উত্তৰ টাইপ কৰক..." :
                  "Type your answer..."
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}
        {currentQuestion >= QUESTIONS.length && (
          <div className="p-4 border-t rounded-b-lg bg-gray-50">
            <div className="flex items-center justify-end">
              <Button
                onClick={resetChat}
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                disabled={isTyping}
              >
                Chat Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
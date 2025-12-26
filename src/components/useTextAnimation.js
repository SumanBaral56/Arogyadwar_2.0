import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter text animation
 * @param {string} text - The text to animate
 * @param {Object} options - Animation options
 * @param {number} options.typingDelay - Delay between characters (default: 100ms)
 * @param {number} options.spaceDelay - Delay for spaces (default: 500ms)
 * @param {number} options.restartDelay - Delay before restarting (default: 2000ms)
 * @param {boolean} options.autoRestart - Whether to auto-restart animation (default: true)
 * @returns {string} The currently displayed text
 */
export function useTextAnimation(
  text,
  {
    typingDelay = 100,
    spaceDelay = 500,
    restartDelay = 2000,
    autoRestart = true
  } = {}
) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const delay = text[index] === ' ' ? spaceDelay : typingDelay;
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (autoRestart) {
      // Wait before restarting
      const restartTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, restartDelay);
      return () => clearTimeout(restartTimeout);
    }
  }, [index, text, typingDelay, spaceDelay, restartDelay, autoRestart]);

  return displayedText;
}

/**
 * Custom hook for viewport-triggered text animation
 * @param {string} text - The text to animate
 * @param {boolean} isInView - Whether the element is in viewport
 * @param {Object} options - Animation options
 * @returns {string} The currently displayed text
 */
export function useViewportTextAnimation(
  text,
  isInView,
  options = {}
) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isInView && index < text.length) {
      const delay = text[index] === ' ' ? (options.spaceDelay || 500) : (options.typingDelay || 100);
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (!isInView) {
      setDisplayedText('');
      setIndex(0);
    }
  }, [index, text, isInView, options.typingDelay, options.spaceDelay]);

  return displayedText;
}

import { motion } from "framer-motion";
import { useTextAnimation } from "./useTextAnimation";
import RotatingMedicalImages from "./RotatingMedicalImages";

/**
 * HomeSection component for the Arogyadwar application
 * @param {Object} props - Component props
 * @param {string} props.welcomeText - The welcome text to animate
 * @param {Object} props.animationConfig - Configuration for text animation
 * @returns {JSX.Element} HomeSection component
 */
export default function HomeSection({ welcomeText, animationConfig }) {
  const displayedText = useTextAnimation(welcomeText, animationConfig);

  return (
    <motion.section
      id="home"
      className="relative flex flex-col items-center justify-center max-w-6xl gap-8 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="mb-4 text-3xl font-bold text-center">{displayedText}</h2>
      <div className="text-center">
        <p className="mb-6 text-lg text-gray-600">
          Your trusted digital health gateway providing seamless access to doctor appointments, blood bank services, and AI-powered medical assistance. Experience professional healthcare at your fingertips.
        </p>
      </div>
      <div className="flex justify-center">
        <RotatingMedicalImages />
      </div>
    </motion.section>
  );
}

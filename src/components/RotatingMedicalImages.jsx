import { HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * RotatingMedicalImages component
 * Displays only the heartbeat animation
 */
export default function RotatingMedicalImages() {
  return (
    <div className="flex items-center justify-center h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key="heart"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [1, 0.2, 1],
            scale: [1, 1.2, 1],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.5,
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="flex items-center justify-center"
        >
          <HeartPulse
            size={120}
            color="#ef4444"
            className="drop-shadow-lg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

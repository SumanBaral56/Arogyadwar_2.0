import { HeartPulse } from "lucide-react";
import { useState } from "react";
import Navigation from "./Navigation";

/**
 * Header component for the Arogyadwar application
 * @param {Object} props - Component props
 * @param {string} props.headerColor - CSS class for header text color
 * @param {Function} props.onScrollToSection - Function to handle section scrolling
 * @returns {JSX.Element} Header component
 */
export default function Header({ headerColor, onScrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (sectionId) => {
    onScrollToSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-3 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-green-500 animate-logo-glow animate-logo-pulse">
            <HeartPulse size={28} className="text-white" />
          </div>
          <h1 className={`font-serif text-3xl font-bold tracking-wide ${headerColor} drop-shadow-sm`}>
            Arogyadwar
          </h1>
        </div>

        <Navigation
          onNavClick={handleNavClick}
          menuOpen={menuOpen}
          onMenuToggle={handleMenuToggle}
        />
      </header>
    </>
  );
}

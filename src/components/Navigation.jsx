import { Menu } from "lucide-react";

/**
 * Navigation component for the Arogyadwar application
 * @param {Object} props - Component props
 * @param {Function} props.onNavClick - Function to handle navigation clicks
 * @param {boolean} props.menuOpen - Whether the mobile menu is open
 * @param {Function} props.onMenuToggle - Function to toggle mobile menu
 * @returns {JSX.Element} Navigation component
 */
export default function Navigation({ onNavClick, menuOpen, onMenuToggle }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "login", label: "Login / Signup" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative hidden gap-6 font-medium text-gray-700 md:flex">
        {navItems.map((item) => (
          <span
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className="cursor-pointer hover:text-blue-600"
          >
            {item.label}
          </span>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="text-gray-700 md:hidden hover:text-blue-600"
        onClick={onMenuToggle}
        aria-label="Toggle navigation menu"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="sticky z-40 flex flex-col gap-4 px-6 py-4 font-medium text-gray-700 bg-white shadow-md md:hidden top-16">
          {navItems.map((item) => (
            <span
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="cursor-pointer hover:text-blue-600"
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

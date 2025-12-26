/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'glow-blue': 'glowing 3s ease-in-out infinite',
        'glow-red': 'glowingRed 3s ease-in-out infinite',
        'glow-green': 'glowingGreen 3s ease-in-out infinite',
        'logo-glow': 'logoGlow 3s ease-in-out infinite',
        'logo-pulse': 'logoPulse 4s ease-in-out infinite',
      },
      keyframes: {
        glowing: {
          '0%': { boxShadow: '0 0 5px 2px rgba(59, 130, 246, 0.7)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(59, 130, 246, 1)' },
          '100%': { boxShadow: '0 0 5px 2px rgba(59, 130, 246, 0.7)' },
        },
        glowingRed: {
          '0%': { boxShadow: '0 0 5px 2px rgba(220, 38, 38, 0.7)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(220, 38, 38, 1)' },
          '100%': { boxShadow: '0 0 5px 2px rgba(220, 38, 38, 0.7)' },
        },
        glowingGreen: {
          '0%': { boxShadow: '0 0 5px 2px rgba(22, 163, 74, 0.7)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(22, 163, 74, 1)' },
          '100%': { boxShadow: '0 0 5px 2px rgba(22, 163, 74, 0.7)' },
        },
        logoGlow: {
          '0%': {
            boxShadow: '0 0 5px 2px rgba(220, 38, 38, 0.7), 0 0 10px rgba(59, 130, 246, 0.5), 0 0 15px rgba(147, 51, 234, 0.4), inset 0 0 0 0 rgba(22, 163, 74, 0.1)'
          },
          '25%': {
            boxShadow: '0 0 8px 4px rgba(59, 130, 246, 0.8), 0 0 15px rgba(147, 51, 234, 0.6), 0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 5px 1px rgba(34, 197, 94, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 10px 6px rgba(147, 51, 234, 0.9), 0 0 20px rgba(220, 38, 38, 0.7), 0 0 25px rgba(59, 130, 246, 0.5), inset 0 0 8px 2px rgba(220, 38, 38, 0.3)'
          },
          '75%': {
            boxShadow: '0 0 8px 4px rgba(22, 163, 74, 0.8), 0 0 15px rgba(220, 38, 38, 0.6), 0 0 20px rgba(147, 51, 234, 0.4), inset 0 0 5px 1px rgba(59, 130, 246, 0.2)'
          },
          '100%': {
            boxShadow: '0 0 5px 2px rgba(220, 38, 38, 0.7), 0 0 10px rgba(59, 130, 246, 0.5), 0 0 15px rgba(147, 51, 234, 0.4), inset 0 0 0 0 rgba(22, 163, 74, 0.1)'
          },
        },
        logoPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

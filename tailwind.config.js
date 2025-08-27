/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This enables dark/light mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0D1117',
        'primary': '#FFFFFF',
        'secondary': '#8B949E',
        'accent': '#58E6D9',
        'border': '#30363D',
      },
      keyframes: {
        'pulse-slow': { // Defines the glowing animation
          '50%': { opacity: '.5' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), // This activates the plugin
  ],
}
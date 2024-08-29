/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customGray: '#121212',
        customInput: '#1e1e1e',
        customButton:'#B30013',
        customColor1: '#160b00',
        customColor2: '#c26b00',
        customColor3: '#7a4400',
        customColor4: '#B4B4B40A',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-200': {
          animationDelay: '0.2s',
        },
      });
    },
  ],
}
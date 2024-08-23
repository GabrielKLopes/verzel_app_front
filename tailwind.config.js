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
        customButton:'#B30013'
      }
    },
  },
  plugins: [],
}
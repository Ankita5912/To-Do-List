/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  
    extend: {
      fontFamily: {
        myFont: ['Monomaniac One', 'sans-serif'],
        Manrope: ['Manrope', 'sans-serif'],// 'sans-serif' is a fallback
        PlusJakartaSans :['PlusJakartaSans', 'sans-serif']
      },
    },
  },
  plugins: [],
}


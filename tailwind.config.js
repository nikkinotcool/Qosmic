/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.5em',
        'wide-luxury': '0.25em',
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      }
    },
  },
  plugins: [],
}

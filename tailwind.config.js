/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: {
          50: '#f0f9ff', // White-blue
          100: '#d9e6ff',
          200: '#a6c1ff',
          300: '#598bff',
          400: '#3366ff',
          500: '#0033ff', // Pure blue
          600: '#001f99',
          700: '#001466',
          800: '#000e4d',
          900: '#000933', // Dark blue
        },
      },
    },
  },
  plugins: [],
}

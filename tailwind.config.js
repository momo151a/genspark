/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f3',
          100: '#ffe4e1',
          200: '#ffcdc9',
          300: '#ffb5ba',
          400: '#ff8a95',
          500: '#d4838f',
          600: '#c76b7a',
          700: '#b55565',
          800: '#9a3f50',
          900: '#7f2a3c',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

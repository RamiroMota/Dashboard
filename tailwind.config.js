/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 30s ease-in-out infinite', // Animación definida
      },
      keyframes: {
        float: {
          '0%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-30px)'},
          '100%': {transform: 'translateY(0)'},
        },
      },
    },
  },
  plugins: [],
};


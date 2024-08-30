/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1800px'
    },
    colors: {
      ...defaultTheme.colors,
      'primary': '#5D576B',
      'primary-100': '#a29daf',
      'primary-200': '#888098',
      'secondary': '#D496A7',
      'secondary-100': '#D496A7',
      'secondary-200': '#cb8095',
      'tertiary': '#F1DEDE',
      'tertiary-100': '#e8c9c9',
      'tertiary-200': '#a14444'
    },
    fontFamily: {
      sans: ['Josefin Sans', 'sans-serif'],
    },
    fontSize: {
      'base': '1.2rem'
    },}
   
  },
  plugins: [],
}


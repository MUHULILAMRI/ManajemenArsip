/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#137fec",
          hover: "#0e69c5",
          light: "rgba(19, 127, 236, 0.1)",
        },
        background: {
          light: "#f6f7f8",
          dark: "#101922",
          cardish: "#1a2632",
        },
        sidebar: {
          active: "#233648",
          hover: "rgba(35, 54, 72, 0.5)",
        },
        border: {
          light: "rgba(0,0,0,0.1)",
          dark: "#233648",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

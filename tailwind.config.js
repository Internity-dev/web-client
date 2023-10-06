/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#22272E",
        main: "#1191FF",
        lightOne: "#FFFFFF",
        lightTwo: "#F9F9F9",
        gray: "#5B5B5B",
      },
    },
  },
  plugins: [],
}


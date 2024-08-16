/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ezyBazaar-primary": "#6897bb",
        "ezyBazaar-secondary": "#31404b",
      },
    },
  },
  plugins: [],
};

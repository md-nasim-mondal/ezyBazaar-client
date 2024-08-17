/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "ezyBazaar-primary": "#4285F3",
        "ezyBazaar-secondary": "#31404b",
      },
    },
  },
  plugins: [],
};

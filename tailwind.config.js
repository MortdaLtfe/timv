/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_black: "#141414",
        primaryRed: "#E50000",
        grey: "#999",
        primary_grey: "#1A1A1A"
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "csi-black": "#161616",
        "csi-white": "#f8f8f8",
        "csi-blue": {
          DEFAULT: "#0251c1",
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c1ff",
          300: "#66a2ff",
          400: "#3383ff",
          500: "#0251c1",
          600: "#0241a1",
          700: "#023181",
          800: "#012061",
          900: "#011041",
          spotlight: "#1F3C88",
          accent: "#1F3C88",
          light: "#8DA8E8",
        },
      },
    },
  },
  plugins: [],
};
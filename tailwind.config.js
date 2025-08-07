// tailwind.config.js — updated [2025-08-06]
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        market: ['"Market"', 'monospace'],
        arcade: ['"Silkscreen"', 'monospace'],
        'arcade-bold': ['"SilkscreenBold"', 'monospace'],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        fuchsia: "#e91e63",        // Minnow primary
        neon: "#00bcd4",           // Marlin primary
        surface: "#1e1e1e",
        bg: "#121212",
      },
    },
  },
  plugins: [],
}
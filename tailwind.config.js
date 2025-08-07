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
        background: "#0d1117",       // Midnight/black hybrid for base
        surface: "#1e1e1e",          // Dark surface contrast
        text: "#ffffff",             // Default light text
        profitGreen: "#00ff00",     // Terminal-style green
        lossRed: "#ff3c3c",         // Terminal-style red
        primary: "#ff6700",      // Primary in-game orange
        neonBlue: "#00bfff",        // Neon triadic blue
        neonPink: "#ff00bf",        // Neon triadic pink
        neonLime: "#bfff00",        // Neon triadic lime
      },
    },
  },
  plugins: [],
}
// tailwind.config.js — updated [2025-08-12]
/*
 * File: tailwind.config.js
 * Purpose: Tailwind configuration for Markade. Defines content paths, theme tokens, and font families.
 * Update Log:
 * - 2025-08-12: Unified Silkscreen under one family; kept temporary 'arcade-bold' alias mapped to Silkscreen for safe migration. — Assistant
 */
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
        market: ['"Market"', '"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace'],
        arcade: ['"Silkscreen"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        // TEMP: keep until all `font-arcade-bold` usages are replaced with `font-arcade font-bold`
        'arcade-bold': ['"Silkscreen"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        background: "#0e1b2a",     // Midnight navy base
        surface: "#132235",        // Cooler navy panels
        text: "#ffffff",           // Default light text
        textDim: "#9fb0c0",        // Secondary text
        borderDim: "#2a3543",      // Dim borders / gridlines
        profitGreen: "#00ff00",   // Terminal-style green
        lossRed: "#ff3c3c",       // Terminal-style red
        primary: "#ff6700",    // Primary in-game orange
        neonBlue: "#00bfff",      // Neon triadic blue
        neonPink: "#ff00bf",      // Neon triadic pink
        casinoYellow: "#FFD700", // Gold slot-machine yellow
        casinoRed: "#B22222", // Deep casino red for accents
      },
      backgroundImage: {
        navyGradient: 'linear-gradient(to bottom, #0e1b2a, #0b1522)', // subtle header/panel depth
      },
    },
  },
  plugins: [],
}
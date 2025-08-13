// tailwind.config.js (tidy sketch)
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [],
  theme: {
    extend: {
      fontFamily: {
market: ['"Market"', '"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace'],
arcade: ['"Silkscreen"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      colors: {
        // backgrounds
        app: "rgb(var(--bg-app) / <alpha-value>)",       // -> bg-app
        panel: "rgb(var(--bg-panel) / <alpha-value>)",   // -> bg-panel
        // text
        "fg-default": "rgb(var(--fg-default) / <alpha-value>)",
        "fg-subtle": "rgb(var(--fg-subtle) / <alpha-value>)",
        // accents
        "accent-pink": "rgb(var(--accent-pink) / <alpha-value>)",
        "accent-blue": "rgb(var(--accent-blue) / <alpha-value>)",
        "accent-yellow": "rgb(var(--accent-yellow) / <alpha-value>)",
        // borders
        "divider": "rgb(var(--divider) / <alpha-value>)",
        "border-default": "rgb(var(--border-default) / <alpha-value>)",
        "border-accent": "rgb(var(--border-accent) / <alpha-value>)",
        // states
        "state-success": "rgb(var(--state-success) / <alpha-value>)",
        "state-error": "rgb(var(--state-error) / <alpha-value>)",
        "state-warning": "rgb(var(--state-warning) / <alpha-value>)",
        "state-info": "rgb(var(--state-info) / <alpha-value>)",
        // extras
        "overlay-scrim": "rgb(var(--overlay-scrim) / <alpha-value>)",
        "arcade-purple": "rgb(var(--arcade-purple) / <alpha-value>)",
        "arcade-red": "rgb(var(--arcade-red) / <alpha-value>)",
      },
      ringColor: {
        DEFAULT: "rgb(var(--focus-ring) / <alpha-value>)",
      },
      borderRadius: { xl2: "1rem" },
      boxShadow: { panel: "0 4px 24px rgba(0,0,0,0.3)" },
      backgroundImage: {
        navyGradient: "linear-gradient(to bottom, #0e1b2a, #0b1522)",
      },
    },
  },
  plugins: [], // remove bg-app/panel aliases to avoid confusion
};
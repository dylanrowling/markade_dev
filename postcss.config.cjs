// postcss.config.cjs — Tailwind 4.x compatible config [updated: 2025-08-06]
module.exports = {
  plugins: [
    require('@tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
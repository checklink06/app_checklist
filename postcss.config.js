export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {}, // MUST be BEFORE tailwind!
    tailwindcss: {},
    autoprefixer: {}
  }
}

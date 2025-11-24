/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './error.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fillWidth: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        marquee: "marquee 50s linear infinite",
      },
      fontFamily: {
        primary: ['Nunito', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        primary: colors.amber,
        secondary: colors.lime,
        neutral: colors.gray,
        info: colors.blue,
        warning: colors.yellow,
        error: colors.red,
        success: colors.green
      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem',
        19: '4.75rem'
      },
      //animation: {
      //  fillWidth: 'fillWidth 1s ease-out'
      //},
      //keyframes: {
      //  fillWidth: {
      //    '0%': { width: '0%' },
      //    '100%': { width: '100%' }
      //  }
      //}
    }
  },
  plugins: []
};

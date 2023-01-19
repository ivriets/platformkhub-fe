/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      'node_modules/tv-*/dist/tv-*.umd.min.js',
    ],
    theme: {
      container: {
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem'
        }
      },
      extend: {
        colors: {
          'bc': '#FEF7E4',
          'utama': '#212121',
          'dua': '#00600F',
          'tiga': '#FDCE07',
          'empat': '#222659',
          'lima': '#9E9E9E',
          'enam': '#B5B5B5',
          'tujuh': '#E0E0E0'
        },
      },
    },
    plugins: [require("@tailwindcss/line-clamp")],
  }
  
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
          'tujuh': '#E0E0E0',
          'sembilan': '#3D3D3D',
          '444': '#444444',
          'need-revision': '#C25D00',
          'approved': '#129555',
          'under-review': '#8E7400',
          'draft': '#9E9E9E'

        },
      },
    },
    plugins: [require("@tailwindcss/line-clamp")],
  }
  

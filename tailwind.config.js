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
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1124px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1124px',
        // => @media (min-width: 1536px) { ... }
      },



      extend: {
        colors: {
          'bc': '#FEF7E4',
          'utama': '#212121',
          'dua': '#616161',
          'tiga': '#FDCE07',
          'empat': '#222659',
          'lima': '#9E9E9E',
          'enam': '#B5B5B5',
          'tujuh': '#E0E0E0',
          'delapan': '#757575',
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
  

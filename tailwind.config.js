// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors :{
//         'boldtext': '#054652',
//         'smallertext' : '#6F8B90',
//       },
//     },
    
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boldtext': '#054652',
        'smallertext' : '#6F8B90',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        merriweather: ['Merriweather', 'serif'],
        logofont: ['Protest Revolution', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

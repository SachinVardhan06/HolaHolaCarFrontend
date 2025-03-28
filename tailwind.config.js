// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //   ],
// //   theme: {
// //     extend: {
// //       colors :{
// //         'boldtext': '#054652',
// //         'smallertext' : '#6F8B90',
// //       },
// //     },
    
// //   },
// //   plugins: [],
// // }


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'boldtext': '#054652',
//         'smallertext' : '#6F8B90',
//       },
//       cursor: {
//         blue: '#0066FF',
//         dark: '#111111',
//         light: '#F5F5F5',
//       },
//       fontFamily: {
//         roboto: ['Roboto', 'sans-serif'],
//         poppins: ['Poppins', 'sans-serif'],
//         inter: ['Inter', 'sans-serif'],
//         mono: ['IBM Plex Mono', 'monospace'],
//         merriweather: ['Merriweather', 'serif'],
//         logofont: ['Protest Revolution', 'sans-serif'],
//         'geist': ['Geist', 'sans-serif'],
//       },

//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        boldtext: "#054652",
        smallertext: "#6F8B90",
        // Add default colors that were missing
        black: "#000000",
        white: "#ffffff",
      },
      backgroundColor: {
        dark: {
          primary: "rgba(31, 41, 55, 0.8)", // bg-gray-800/80 equivalent
          secondary: "rgba(31, 41, 55, 0.4)", // bg-gray-800/40 for non-scrolled state
          solid: "#1f2937", // solid bg-gray-800
        },
        light: {
          primary: "rgba(255, 255, 255, 0.8)",
          secondary: "#f3f4f6",
        }
      },
      textColor: {
        dark: {
          primary: "#ffffff",
          secondary: "#a3a3a3",
        },
        light: {
          primary: "#111111",
          secondary: "#6b7280",
        }
      },
      cursor: {
        blue: "#0066FF",
        dark: "#111111",
        light: "#F5F5F5",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        merriweather: ["Merriweather", "serif"],
        logofont: ["Protest Revolution", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },
    },
  },
  plugins: [],
};

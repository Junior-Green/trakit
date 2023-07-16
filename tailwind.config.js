/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      animation: {
        fade: 'fadeIn 500ms ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '100%': {
            opacity: 1,
            transform: "translateY(0px)"
          },
          '0%': {
            opacity: 0,
            transform: "translateY(50px)"
          },
        },
      }),
      colors: {
        trakit: {
          100: "#C6C9F4",
          200: "#8C71F4",
          300: "#7479B1",
          400: "#4C4F7C",
          500: "#2D305B",
          600: "#202344",
        }
      }
    },
  },
  plugins: [],
}


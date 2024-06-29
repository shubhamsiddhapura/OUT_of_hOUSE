/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
export default module
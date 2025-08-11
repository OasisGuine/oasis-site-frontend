/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#529e8a',
        'green-underlay': 'rgba(82, 158, 138, 0.8)',
        'purple': '#65509f',
        'gray': '#7a7a7a',
        'light-pink': '#fef6f5',
        'red': '#dc2626',
      },
      fontFamily: {
        'baloo': ['Baloo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
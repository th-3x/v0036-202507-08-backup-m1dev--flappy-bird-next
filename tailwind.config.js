/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#70c5ce',
        'game-green': '#5ee270',
        'game-yellow': '#f9e25a',
      },
      animation: {
        'bird-fly': 'fly 0.6s infinite alternate',
      },
      keyframes: {
        fly: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

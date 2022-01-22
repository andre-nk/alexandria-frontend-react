module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Inconsolata'],
      'prose': ['Lato']
    },
    extend: {
      colors: {
        "primary-blue": "#1808E8",
        "active-blue": "#1407C6",
        "primary-red": "#DE7973",
        "active-red": "#B14842",
        "disabled-red": "#E69B96",
        "primary-yellow": "#FFC400",
        "primary-green": "#55AC59",
        "primary-black": "#000000",
        "primary-white": "#FFFFFF",
        "primary-bg": "#F7F7F7",
        "primary-border": "#E9E9EF",
        "minor-text": "#B2B1B6",
        "major-text": "#535358",
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'agriculture-gif': "url('../public/background.jpg')"
      },
      backgroundSize: {
        'cover': 'cover',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

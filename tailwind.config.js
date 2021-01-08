module.exports = {
  purge: ["./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    letterSpacing: { widest: ".4em" },
    extend: {
      transitionDuration: {
        1500: "1500ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


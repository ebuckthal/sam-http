module.exports = {
  purge: ["./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    letterSpacing: { widest: ".3em" },
    extend: {
      fontSize: {
        xxs: "0.6rem",
      },
      height: {
        "screen-75": "75vh",
      },
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


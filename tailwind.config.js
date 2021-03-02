module.exports = {
  purge: ["./pages/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      letterSpacing: { widest: "0.3em", widerest: "0.5em" },
      fontSize: {
        xxs: "0.6rem",
        xxxs: "0.55rem",
        xxxxs: "0.45rem",
      },
      maxHeight: {
        video: "500px",
      },
      maxWidth: {
        video: "354px",
      },
      transitionDuration: {
        1500: "1500ms",
      },
      fontFamily: {
        sans: "Inter var",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


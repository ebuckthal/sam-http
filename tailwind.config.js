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
        "video-sm": "700px",
        "video-md": "1026px",
      },
      maxHeight: {
        "3/4": "75vh",
        video: "1026px",
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


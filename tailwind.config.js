module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FF6433",
        mint: "#00D289",
        "near-red": "#FF3333",
        grey: "#939191",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

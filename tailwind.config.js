module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};

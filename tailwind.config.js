export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#c738bd",
      },
    },
  },
  plugins: [require("daisyui")],
};

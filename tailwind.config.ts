import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark1: "#212121",
        dark2: "#303030",
        blue1: "#687EFF",
        blue2: "#a855f7",
        white1: "#FAFAFA",
        pink: "#949CB0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;

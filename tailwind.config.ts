import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      dark1: "#111111",
      dark2: "#262626",
      blue1: "#687EFF",
      white1: "#FFFFFF",
      pink: "#949CB0",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;

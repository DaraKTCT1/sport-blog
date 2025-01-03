import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [nextui(), require("@tailwindcss/typography")],
};
export default config;

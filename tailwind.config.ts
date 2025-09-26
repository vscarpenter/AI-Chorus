import type { Config } from "tailwindcss";
const { theme } = require("./tailwind.theme.extract.cjs");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      // Additional custom extensions if needed
    },
  },
  plugins: [],
};

export default config;
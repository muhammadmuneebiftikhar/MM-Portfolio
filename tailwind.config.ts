import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060606",
        foreground: "#F5ECD7",
        orange: "var(--orange)", // Link to CSS variable for reliability
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        space: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;

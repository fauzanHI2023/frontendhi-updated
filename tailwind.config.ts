import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('../../public/banner.png')",
        "logo-white": "url('../../public/LOGO HI-02 2.png')",
        "logo-blue": "url('../../public/logo (1) (2).png')",
      },
      backgroundColor: {
        "secondary-dashboard": "#f1f4f9",
      }
    },
  },
  plugins: [],
};
export default config;

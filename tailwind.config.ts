import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        // Define your custom color here
        "primary-rgba-50": "rgba(54, 104, 113, 0.5)",
        "primary-rgba-20": "rgba(54, 104, 113, 0.2)",
      },
      animation: {
        slide: "slide 150s linear infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        homebase: {
          primary: "#366871",
          secondary: "#366871",

          accent: "#d8b4fe",

          neutral: "6b7280",

          "base-100": "#ffffff",

          info: "#5b8ce1",

          success: "#17975f",

          warning: "#eab308",

          error: "#f80d18",
        },
      },
    ],
  },
};
export default config;

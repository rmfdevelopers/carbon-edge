import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#1E293B",
        accent: "#00F2FF",
        neutral: {
          dark: "#000000",
          light: "#FFFFFF",
          muted: "#A1A1AA"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
export default config;
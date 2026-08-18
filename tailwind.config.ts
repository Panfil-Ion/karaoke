import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          magenta: "#ff00ff",
          yellow: "#ffff00",
          pink: "#ff1493",
        },
        pitch: "#000000",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "glow-flicker": "glow-flicker 4s ease-in-out infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 20px #ff00ff) drop-shadow(0 0 40px #ff00ff)",
          },
          "50%": {
            opacity: "0.85",
            filter: "drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 25px #ff1493)",
          },
        },
        "glow-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

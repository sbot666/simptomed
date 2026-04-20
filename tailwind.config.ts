import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude brand orange (warm coral/terracotta)
        brand: {
          50:  "#fdf4ef",
          100: "#fbe5d6",
          200: "#f6c6a8",
          300: "#f1a377",
          400: "#ea8657",
          500: "#d97757", // Claude primary orange
          600: "#c96442",
          700: "#a84e33",
          800: "#7a3924",
          900: "#4d2416",
          950: "#2a1309",
        },
        // Claude warm surfaces (near-black with warm undertone)
        ink: {
          50:  "#f5f4ee", // cream text
          100: "#e8e6de",
          200: "#d4d2cc",
          300: "#b0b0ac",
          400: "#8c8a85",
          500: "#6f6d69",
          600: "#52504c",
          700: "#3a3936", // subtle border
          750: "#2f2e2b",
          800: "#262624", // main surface
          850: "#1f1e1c",
          900: "#1a1917", // darker surface
          950: "#141311", // deepest bg
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      boxShadow: {
        "glow-brand": "0 0 40px -8px rgb(217 119 87 / 0.45)",
        "glow-warm":  "0 0 40px -8px rgb(201 100 66 / 0.55)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

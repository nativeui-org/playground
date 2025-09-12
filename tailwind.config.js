/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-background-foreground) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
          muted: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)",
          foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
          foreground: "rgb(var(--color-success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
          foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--color-info) / <alpha-value>)",
          foreground: "rgb(var(--color-info-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--color-card) / <alpha-value>)",
          foreground: "rgb(var(--color-card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover) / <alpha-value>)",
          foreground: "rgb(var(--color-popover-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          foreground: "rgb(var(--border-foreground) / <alpha-value>)",
        },
        input: {
          DEFAULT: "rgb(var(--input) / <alpha-value>)",
          foreground: "rgb(var(--input-foreground) / <alpha-value>)",
        },
        
        toggle: {
          active: "rgb(var(--toggle-active) / <alpha-value>)",
          "active-foreground": "rgb(var(--toggle-active-foreground) / <alpha-value>)",
          border: "rgb(var(--toggle-border) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          // Primary colors
          "--color-primary": "0 0 0",
          "--color-primary-foreground": "255 255 255",
          "--color-foreground": "13 13 13",

          // General context (background) and cards / popovers
          "--color-background": "255 255 255",
          "--color-background-foreground": "13 13 13",
          "--color-card": "255 255 255",
          "--color-card-foreground": "13 13 13",
          "--color-popover": "255 255 255",
          "--color-popover-foreground": "13 13 13",

          // Secondary colors
          "--color-secondary": "45 45 45",
          "--color-secondary-foreground": "255 255 255",
          "--color-foreground-muted": "115 115 115",
          "--color-muted-foreground": "115 115 115",
          "--color-muted": "240 240 240",

          // Accent colors
          "--color-accent": "145 145 145",
          "--color-accent-foreground": "255 255 255",

          // Status colors
          "--color-destructive": "239 68 68",
          "--color-destructive-foreground": "250 250 250",
          "--color-success": "34 197 94",
          "--color-success-foreground": "250 250 250",
          "--color-warning": "234 179 8",
          "--color-warning-foreground": "13 13 13",
          "--color-info": "59 130 246",
          "--color-info-foreground": "250 250 250",

          // Borders, inputs and "rings"
          "--border": "229 231 235",
          "--border-foreground": "13 13 13",
          "--input": "229 231 235",
          "--input-foreground": "13 13 13",
          "--ring": "13 13 13",

          // Toggle specific colors
          "--toggle-active": "45 45 45",
          "--toggle-active-foreground": "255 255 255",
          "--toggle-border": "229 231 235",
        },
        ".dark": {
          // Primary colors
          "--color-primary": "255 255 255",
          "--color-primary-foreground": "13 13 13",
          "--color-foreground": "250 250 250",

          // General context (background) and cards / popovers
          "--color-background": "23 23 28",
          "--color-background-foreground": "250 250 250",
          "--color-card": "32 32 36",
          "--color-card-foreground": "250 250 250",
          "--color-popover": "32 32 36",
          "--color-popover-foreground": "250 250 250",

          // Secondary colors
          "--color-secondary": "58 58 58",
          "--color-muted": "75 85 99",
          "--color-foreground-muted": "209 213 219",
          "--color-muted-foreground": "209 213 219",

          // Accent colors
          "--color-accent": "58 58 58",
          "--color-accent-foreground": "250 250 250",

          // Status colors
          "--color-destructive": "153 27 27",
          "--color-destructive-foreground": "250 250 250",
          "--color-success": "22 163 74",
          "--color-success-foreground": "250 250 250",
          "--color-warning": "161 98 7",
          "--color-warning-foreground": "250 250 250",
          "--color-info": "37 99 235",
          "--color-info-foreground": "250 250 250",

          // Borders, inputs and "rings"
          "--border": "75 85 99",
          "--input": "38 38 38",
          "--ring": "212 212 212",

          // Toggle specific colors
          "--toggle-active": "120 120 120",
          "--toggle-active-foreground": "250 250 250",
          "--toggle-border": "100 100 100",
        },
      });
    },
  ],
};

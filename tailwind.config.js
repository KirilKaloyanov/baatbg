/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');


module.exports = {
    darkMode: ["class"],
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {},
        borderRadius: {
          lg: "var(--radius)",
        },
        fontFamily: {
          oswald: ["var(--font-oswald)", 'Impact', 'Arial Black', 'serif'],
          raleway: ["var(--font-raleway)", 'system-ui', 'sans-serif'],
          cormorant: ["var(--font-cormorant)", 'Georgia', 'Cambria', 'serif'],
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [],
    // "tailwindcss-animate": "^1.0.7",
  }
  
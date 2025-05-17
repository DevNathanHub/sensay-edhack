/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s ease forwards',
      },
      colors: {
        primary: "#0070f3",
        secondary: "#7c3aed",
        background: "#f9fafb",
        foreground: "#111827",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
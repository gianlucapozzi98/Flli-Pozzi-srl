import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E30613',
        'primary-dark': '#B8050F',
        secondary: '#3A3A3A',
        accent: '#0020b2',
        text: '#333333',
        'text-light': '#666666',
        bg: '#FFFFFF',
        'bg-light': '#F8F8F8',
        'bg-dark': '#1A1A1A',
        border: '#E0E0E0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;


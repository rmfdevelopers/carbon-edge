import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        secondary: '#4A5568',
        accent: '#00B4D8',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
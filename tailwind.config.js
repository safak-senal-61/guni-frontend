/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'var(--primary-light)',
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          light: 'var(--secondary-light)',
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
        accent: {
          light: 'var(--accent-light)',
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
        },
        neutral: {
          light: 'var(--neutral-light)',
          DEFAULT: 'var(--neutral)',
          dark: 'var(--neutral-dark)',
        },
        background: {
          light: 'var(--background-light)',
          DEFAULT: 'var(--background)',
          dark: 'var(--background-dark)',
        },
        surface: {
          light: 'var(--surface-light)',
          DEFAULT: 'var(--surface)',
          dark: 'var(--surface-dark)',
        },
        text: {
          light: 'var(--text-light)',
          DEFAULT: 'var(--text)',
          dark: 'var(--text-dark)',
        },
        border: {
          light: 'var(--border-light)',
          DEFAULT: 'var(--border)',
          dark: 'var(--border-dark)',
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'morandi-sand': 'var(--morandi-sand)',
        'morandi-fog': 'var(--morandi-fog)',
        'morandi-stone': 'var(--morandi-stone)',
        'morandi-clay': 'var(--morandi-clay)',
        'morandi-moss': 'var(--morandi-moss)',
        'morandi-sage': 'var(--morandi-sage)',
        'morandi-blush': 'var(--morandi-blush)',
        'morandi-terracotta': 'var(--morandi-terracotta)',
        'morandi-sky': 'var(--morandi-sky)',
        'morandi-lavender': 'var(--morandi-lavender)',
      },
    },
  },
  plugins: [],
}

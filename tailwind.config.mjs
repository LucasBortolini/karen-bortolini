/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F3A5F',
        secondary: '#3D3549',
        gold: '#D4A054',
        surface: '#FAF7F2',
        cta: '#C75B3A',
        'whatsapp-surface': '#ECE5DD',
        'whatsapp-brand': '#075E54',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

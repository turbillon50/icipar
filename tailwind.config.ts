import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F5E6C8',
        amber: { 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
        stone: { 800: '#292524', 900: '#1C1917', 950: '#0C0A09' },
        gold: { DEFAULT: '#C9A84C', light: '#E8C96D', dark: '#8B6914' },
        sacred: { DEFAULT: '#7C3AED', light: '#A78BFA' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.svg')",
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C96D 50%, #B45309 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1C1917 0%, #0C0A09 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        kenBurns: { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.15) translate(-2%,-1%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
export default config

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
        neon: {
          green: '#00FF88',
          purple: '#7B61FF',
          cyan: '#00E3C3',
        },
        dark: {
          bg: '#000000',
          card: '#111111',
          border: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide': 'slide 30s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)' },
        },
        'slide': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config


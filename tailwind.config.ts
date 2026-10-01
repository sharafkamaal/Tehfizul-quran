import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Brand palette taken from the logo
        primary: { DEFAULT: '#009245', 700: '#00753A', 50: '#E8F5EE' },
        deep: { DEFAULT: '#0B5D3B', 900: '#073A25', 800: '#094C31' },
        gold: { DEFAULT: '#C1A062', light: '#E3CC98', dark: '#7A5C24', 50: '#F7F0DF' },
        cream: { DEFAULT: '#FBF6E9', dark: '#F3EAD3' },
        ink: { DEFAULT: '#1F2937', muted: '#4B5563' },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        latin: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        urdu: ['var(--font-nastaliq)', 'serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(11, 93, 59, 0.25)',
        card: '0 4px 20px -6px rgba(31, 41, 55, 0.12)',
        gold: '0 8px 24px -8px rgba(193, 160, 98, 0.6)',
      },
      borderRadius: { arch: '999px 999px 1.5rem 1.5rem' },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'hero-zoom': { from: { transform: 'scale(1.12)' }, to: { transform: 'scale(1)' } },
        'ticker-rtl': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(50%)' } },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'ticker-rtl': 'ticker-rtl 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

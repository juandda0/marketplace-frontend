/** @type {import('tailwindcss').Config} */
// Colores sólidos definidos en src/index.css (sin transparencias ni degradados).
const token = (name) => `var(--${name})`;
const tone = (name) => ({
  DEFAULT: token(name),
  fg: token(`${name}-fg`),
  ink: token(`${name}-ink`),
  soft: token(`${name}-soft`),
  line: token(`${name}-line`),
});

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: {
          DEFAULT: token('surface'),
          2: token('surface-2'),
          3: token('surface-3'),
        },
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        primary: { ...tone('primary'), hover: token('primary-hover') },
        coin: tone('coin'),
        auction: tone('auction'),
        raffle: tone('raffle'),
        success: tone('success'),
        danger: tone('danger'),
        ink: {
          DEFAULT: '#0F172A',
          2: '#1E293B',
        },
      },
      fontFamily: {
        sans: [
          '"Geist Variable"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          from: { transform: 'translateY(6px)' },
          to: { transform: 'translateY(0)' },
        },
        skeleton: {
          '0%, 100%': { backgroundColor: 'var(--surface-2)' },
          '50%': { backgroundColor: 'var(--surface-3)' },
        },
        'toast-in': {
          from: { transform: 'translateY(-8px)' },
          to: { transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)' },
          '60%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        skeleton: 'skeleton 1.4s ease-in-out infinite',
        'toast-in': 'toast-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        pop: 'pop 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};

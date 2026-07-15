/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#E4D8C4',
        saffron: '#C9762C',
        terracotta: '#8A3B24',
        bronze: '#6B4A2E',
        aubergine: '#2E1B24',
        stone: '#D7CBB8',
        'gold-flat': '#B9873B',
        rust: '#C9542F',
      },
      fontFamily: {
        serif: ['"Canela"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'headline': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'subhead': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
    },
  },
  plugins: [],
};

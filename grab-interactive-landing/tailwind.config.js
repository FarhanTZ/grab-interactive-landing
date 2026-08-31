/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Grab Green Standard
        primary: '#00B14F',
        'primary-dark': '#008A3E',
        'primary-light': '#E8F8F0',
        'primary-container': '#00B14F',
        'on-primary': '#0A0D0B',
        'on-primary-container': '#0A0D0B',

        // Dark Surfaces
        'surface-0': '#0A0D0B',
        'surface': '#0A0D0B',
        'surface-dim': '#0A0D0B',
        'surface-bright': '#141A16',
        'surface-container': '#141A16',
        'surface-container-low': '#0A0D0B',
        'surface-container-high': '#141A16',
        'surface-container-lowest': '#0A0D0B',
        'surface-container-highest': '#1a211a',
        'on-surface': '#DDE5D9',
        'on-surface-variant': '#A1A1AA',
        'outline': 'rgba(255,255,255,0.08)',
        'surface-tint': '#00B14F',

        // Road / UI
        'road-asphalt': '#262626',

        // Service Accent Accents
        'grab-food': '#FF8800',
        'grab-mart': '#00A3FF',
        'grab-express': '#8948FC',
        'grab-pay': '#00B14F',
      },
      fontFamily: {
        'headline-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-xl': ['Plus Jakarta Sans', 'sans-serif'],
        'display-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'display-lg-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'body-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['72px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-lg-mobile': ['40px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.08em' }],
        'label-md': ['14px', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.05em' }],
      },
      spacing: {
        base: '8px',
        'bento-gap': '24px',
        'edge-margin-desktop': '64px',
        'edge-margin-mobile': '20px',
        'container-max': '1280px',
        'section-gap': '120px',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-pulse': 'glow 3s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0,177,79,0.2))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(0,177,79,0.6))' },
        },
      },
    },
  },
  plugins: [],
};
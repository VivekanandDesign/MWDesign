import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Moving Walls Primary Color (Energy Blue)
        'mw-primary': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',  // Main primary
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // Moving Walls Secondary Color (Movement Orange)
        'mw-secondary': {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',  // Main secondary
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Moving Walls Flow/Teal (Accent)
        'mw-flow': {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',  // Main flow
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        // Moving Walls Blue (Alias for Primary - for component compatibility)
        'mw-blue': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',  // Main blue
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        // Neutral colors
        'mw-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Semantic colors
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        // 4pt grid system
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '10': '2.5rem', // 40px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
        '20': '5rem',   // 80px
        '24': '6rem',   // 96px
        '32': '8rem',   // 128px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',      // 6px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.375rem',      // 6px
        'lg': '0.375rem',      // 6px
        'xl': '0.375rem',      // 6px
        '2xl': '0.375rem',     // 6px
        'full': '9999px',      // Keep full for circles
      },
      boxShadow: {
        'mw-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'mw-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'mw-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'mw-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'mw-float': '0 8px 32px rgba(37, 99, 235, 0.12)',
        'mw-breakthrough': '0 16px 64px rgba(0, 0, 0, 0.1)',
        'mw-energy': '0 10px 25px rgba(234, 88, 12, 0.3)',
        'mw-flow': '0 10px 25px rgba(20, 184, 166, 0.3)',
      },
      // Removing gradient backgrounds in favor of solid colors
      animation: {
        'mw-float': 'mw-float 3s ease-in-out infinite',
        'mw-breakthrough': 'mw-breakthrough 2s ease-in-out infinite',
        'mw-flow': 'mw-flow 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        // MW Loader Animations
        'mw-wave': 'mw-wave 2s ease-in-out infinite',
        'mw-glow': 'mw-glow 2s ease-in-out infinite alternate',
        'mw-typewriter': 'mw-typewriter 2s steps(2,end) infinite',
        'mw-typing-dots': 'mw-typing-dots 1.5s ease-in-out infinite',
        'mw-scale': 'mw-scale 2s ease-in-out infinite',
        'mw-letter-1': 'mw-letter-1 2s ease-in-out infinite',
        'mw-letter-2': 'mw-letter-2 2s ease-in-out infinite 0.2s',
        'mw-progressive-fill': 'mw-progressive-fill 2s ease-in-out infinite',
        'mw-width-expand': 'mw-width-expand 2s ease-in-out infinite',
        'mw-slide-reveal': 'mw-slide-reveal 2s ease-in-out infinite',
        // New MW Loader Animations
        'mw-glitch-low': 'mw-glitch-low 2s linear infinite',
        'mw-glitch-medium': 'mw-glitch-medium 2s linear infinite',
        'mw-glitch-high': 'mw-glitch-high 2s linear infinite',
        'mw-glitch-red': 'mw-glitch-red 2s linear infinite',
        'mw-glitch-cyan': 'mw-glitch-cyan 2s linear infinite',
        'mw-heartbeat': 'mw-heartbeat 1.5s ease-in-out infinite',
        'mw-matrix-rain': 'mw-matrix-rain 2s linear infinite',
        'mw-matrix-1': 'mw-matrix-1 3s linear infinite',
        'mw-matrix-2': 'mw-matrix-2 3s linear infinite 0.5s',
        'mw-matrix-3': 'mw-matrix-3 3s linear infinite 1s',
        'mw-neon-flicker': 'mw-neon-flicker 2s ease-in-out infinite',
        'mw-bounce-letter': 'mw-bounce-letter 1s ease-in-out infinite',
      },
      keyframes: {
        'mw-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'mw-breakthrough': {
          '0%': { width: '0%', transform: 'translateX(0)' },
          '50%': { width: '70%', transform: 'translateX(0)' },
          '100%': { width: '100%', transform: 'translateX(20px)' },
        },
        'mw-flow': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // MW Loader Keyframes
        'mw-wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'mw-glow': {
          'from': { 
            textShadow: '0 0 5px #2563EB, 0 0 10px #2563EB, 0 0 15px #2563EB',
            transform: 'scale(1)' 
          },
          'to': { 
            textShadow: '0 0 10px #2563EB, 0 0 20px #2563EB, 0 0 30px #2563EB',
            transform: 'scale(1.05)' 
          },
        },
        'mw-typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'mw-typing-dots': {
          '0%, 80%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
        },
        'mw-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'mw-letter-1': {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-5px)' },
        },
        'mw-letter-2': {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-5px)' },
        },
        'mw-progressive-fill': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '50%': { clipPath: 'inset(0 0 0 0)' },
          '100%': { clipPath: 'inset(0 100% 0 0)' },
        },
        'mw-width-expand': {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'mw-slide-reveal': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // New MW Loader Keyframes
        'mw-glitch-low': {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-1px, 1px)' },
          '20%': { transform: 'translate(1px, -1px)' },
        },
        'mw-glitch-medium': {
          '0%, 80%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-1px, 1px)' },
        },
        'mw-glitch-high': {
          '0%, 70%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-3px, 3px)' },
          '20%': { transform: 'translate(3px, -3px)' },
          '30%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
        },
        'mw-glitch-red': {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 0)' },
          '20%': { transform: 'translate(2px, 0)' },
        },
        'mw-glitch-cyan': {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(2px, 0)' },
          '20%': { transform: 'translate(-2px, 0)' },
        },
        'mw-heartbeat': {
          '0%, 50%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        'mw-matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'mw-matrix-1': {
          '0%': { transform: 'translate(-20px, -30px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translate(20px, 30px)', opacity: '0' },
        },
        'mw-matrix-2': {
          '0%': { transform: 'translate(10px, -20px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translate(-10px, 20px)', opacity: '0' },
        },
        'mw-matrix-3': {
          '0%': { transform: 'translate(-10px, -25px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translate(15px, 25px)', opacity: '0' },
        },
        'mw-neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '1' },
          '85%': { opacity: '0.9' },
          '95%': { opacity: '1' },
        },
        'mw-bounce-letter': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

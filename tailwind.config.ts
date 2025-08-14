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
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
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
      },
    },
  },
  plugins: [],
}

export default config

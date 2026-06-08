import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#C1D7FF',
          300: '#A2C3FF',
          400: '#5A8FFF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#2D1065',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Emerald/Green variants
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Dark mode slate colors
        slate: {
          50: '#F9FAFB',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#030712',
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.900'),
            strong: {
              color: theme('colors.slate.900'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.100'),
            strong: {
              color: theme('colors.slate.100'),
            },
          },
        },
      }),
      spacing: {
        // 8px base grid
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.05)',
        sm: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
        '2xl': '0 25px 50px rgba(0,0,0,0.1), 0 25px 30px rgba(0,0,0,0.04)',
        'dark-xs': '0 1px 2px rgba(0,0,0,0.3)',
        'dark-sm': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'dark-md': '0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
        'dark-lg': '0 10px 15px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3)',
        'dark-xl': '0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.3)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s cubic-bezier(0, 0, 0.2, 1)',
        slideUp: 'slideUp 0.3s cubic-bezier(0, 0, 0.2, 1)',
        slideDown: 'slideDown 0.3s cubic-bezier(0, 0, 0.2, 1)',
        slideLeft: 'slideLeft 0.3s cubic-bezier(0, 0, 0.2, 1)',
        slideRight: 'slideRight 0.3s cubic-bezier(0, 0, 0.2, 1)',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.5px' }],
        base: ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '0.5px' }],
        xl: ['20px', { lineHeight: '28px', letterSpacing: '0.5px' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '0em' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        '5xl': ['44px', { lineHeight: '53px', letterSpacing: '-0.01em' }],
        '6xl': ['56px', { lineHeight: '67px', letterSpacing: '-0.02em' }],
      },
      transitionDuration: {
        200: '200ms',
        300: '300ms',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config

/**
 * Design System Configuration
 * Central source of truth for all design tokens
 * Colors, spacing, typography, shadows, and transitions
 */

// Color palette
export const colors = {
  primary: {
    50: '#F0F4FF',
    500: '#4F46E5',
    600: '#4338CA',
    700: '#3730A3',
  },
  accent: {
    500: '#F59E0B',
    600: '#D97706',
  },
  neutral: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    400: '#9CA3AF',
    600: '#4B5563',
    700: '#374151',
    900: '#111827',
  },
  dark: {
    50: '#F9FAFB',
    900: '#0F172A',
    800: '#1E293B',
    700: '#334155',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  success: {
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    900: '#15803D',
  },
  warning: {
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    900: '#92400E',
  },
  error: {
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    900: '#7F1D1D',
  },
  info: {
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    900: '#1E40AF',
  },
};

// Spacing (8px grid system)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

// Typography
export const typography = {
  h1: 'text-5xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl font-bold leading-snug',
  h3: 'text-2xl font-bold',
  h4: 'text-lg font-semibold',
  body: 'text-base font-normal leading-relaxed',
  small: 'text-sm font-medium',
  tiny: 'text-xs font-medium',
};

// Shadows (layered depth)
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  none: 'none',
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  glow: {
    indigo: '0 0 20px rgba(79, 70, 229, 0.3)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
    emerald: '0 0 20px rgba(16, 185, 129, 0.3)',
  },
};

// Border radius
export const radius = {
  none: '0px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
};

// Transitions & animations
export const transitions = {
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Z-index scale
export const zIndex = {
  hide: '-1',
  auto: 'auto',
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  backdrop: '1040',
  offcanvas: '1050',
  modal: '1060',
  popover: '1070',
  tooltip: '1080',
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Glass morphism backdrop blur values
export const blur = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

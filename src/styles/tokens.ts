/**
 * Design Tokens — Single source of truth for GCSC Student Portal UI
 * Aligns with Tailwind 4 + extended theme config
 * Use these in components instead of magic values
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary Brand: Coral
  primary: {
    50: '#FFF5F3',
    100: '#FFE8E3',
    200: '#FFD1C7',
    300: '#FFBAAB',
    400: '#FF8C6B',
    500: '#FF6B6B', // Main brand color
    600: '#FF5555',
    700: '#E63946',
    800: '#CC2E38',
    900: '#992230',
  },
  // Secondary: Orange
  secondary: {
    50: '#FFF9F0',
    100: '#FFEBDA',
    200: '#FFD4A8',
    300: '#FFBD76',
    400: '#FF8C42',
    500: '#FF7B2E',
    600: '#FB6B1D',
    700: '#E85A0D',
    800: '#D64A00',
    900: '#A83800',
  },
  // Semantic
  success: '#06D6A0',
  accent: '#06D6A0',
  warning: '#FF8C42',
  danger: '#FF6B6B',
  info: '#2563EB',
  // Neutral: Slate scale
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
  // Emerald (alternative accent)
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
} as const

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    display: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    serif: 'Instrument Serif, Georgia, serif',
    mono: 'JetBrains Mono, Monaco, Courier New, monospace',
  },
  fontSize: {
    xs: { size: '12px', lineHeight: '16px', letterSpacing: '0.5px' },
    sm: { size: '14px', lineHeight: '20px', letterSpacing: '0.5px' },
    base: { size: '16px', lineHeight: '24px', letterSpacing: '0.5px' },
    lg: { size: '18px', lineHeight: '28px', letterSpacing: '0.5px' },
    xl: { size: '20px', lineHeight: '28px', letterSpacing: '0.5px' },
    '2xl': { size: '24px', lineHeight: '32px', letterSpacing: '0em' },
    '3xl': { size: '30px', lineHeight: '36px', letterSpacing: '-0.01em' },
    '4xl': { size: '36px', lineHeight: '40px', letterSpacing: '-0.01em' },
    '5xl': { size: '44px', lineHeight: '53px', letterSpacing: '-0.01em' },
    '6xl': { size: '56px', lineHeight: '67px', letterSpacing: '-0.02em' },
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const

// ============================================================================
// SPACING TOKENS (4px base grid)
// ============================================================================

export const spacing = {
  xs: '4px',   // 0.25rem
  sm: '8px',   // 0.5rem
  md: '16px',  // 1rem
  lg: '24px',  // 1.5rem
  xl: '32px',  // 2rem
  '2xl': '48px', // 3rem
  '3xl': '64px', // 4rem
  '4xl': '96px', // 6rem
} as const

// Padding presets for common patterns
export const padding = {
  container: '24px', // Standard container padding
  card: '16px',      // Card internal padding
  section: '32px',   // Section padding
  hero: '48px',      // Hero section padding
} as const

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const borderRadius = {
  xs: '4px',    // Smallest interactive elements
  sm: '6px',    // Form inputs
  md: '8px',    // Buttons, small cards
  lg: '12px',   // Cards, modals
  xl: '16px',   // Large cards, containers
  '2xl': '24px', // Extra large containers
  full: '9999px', // Pills, circles
} as const

// ============================================================================
// SHADOW TOKENS (Light & Dark Variants)
// ============================================================================

export const shadows = {
  // Light mode
  xs: '0 1px 2px rgba(0,0,0,0.05)',
  sm: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
  '2xl': '0 25px 50px rgba(0,0,0,0.1), 0 25px 30px rgba(0,0,0,0.04)',
  // Dark mode
  'dark-xs': '0 1px 2px rgba(0,0,0,0.3)',
  'dark-sm': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
  'dark-md': '0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
  'dark-lg': '0 10px 15px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3)',
  'dark-xl': '0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.3)',
  // Floating/elevated
  float: '0 20px 25px rgba(0,0,0,0.15)',
  'dark-float': '0 25px 50px rgba(0,0,0,0.3)',
} as const

// ============================================================================
// MOTION & TRANSITION TOKENS
// ============================================================================

export const motion = {
  // Durations
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

// Common transition combinations
export const transitions = {
  fast: `all ${motion.duration.fast} ${motion.easing.ease}`,
  base: `all ${motion.duration.base} ${motion.easing.ease}`,
  slow: `all ${motion.duration.slow} ${motion.easing.ease}`,
  spring: `all ${motion.duration.base} ${motion.easing.spring}`,
} as const

// ============================================================================
// COMPONENT SIZE TOKENS
// ============================================================================

export const componentSizes = {
  // Button sizes (height)
  button: {
    xs: '28px',
    sm: '32px',
    base: '40px',
    lg: '48px',
    xl: '56px',
  },
  // Input sizes
  input: {
    sm: '32px',
    base: '40px',
    lg: '48px',
  },
  // Avatar sizes
  avatar: {
    xs: '24px',
    sm: '32px',
    base: '40px',
    lg: '48px',
    xl: '64px',
  },
  // Icon sizes
  icon: {
    xs: '12px',
    sm: '16px',
    base: '20px',
    lg: '24px',
    xl: '32px',
  },
} as const

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  backdrop: '1300',
  modal: '1400',
  popover: '1500',
  tooltip: '1600',
  notification: '1700',
} as const

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const layout = {
  // Sidebar widths
  sidebarCollapsed: '80px',
  sidebarExpanded: '256px',
  // Container widths
  containerSm: '640px',
  containerMd: '768px',
  containerLg: '1024px',
  containerXl: '1280px',
  container2xl: '1536px',
  // Top bar height
  headerHeight: '60px',
  // Bottom tab bar (mobile)
  tabBarHeight: '64px',
} as const

// ============================================================================
// GRADIENT PRESETS
// ============================================================================

export const gradients = {
  // Brand gradient: Coral to Orange
  brand: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)',
  // Success gradient
  success: 'linear-gradient(135deg, #06D6A0 0%, #10B981 100%)',
  // Danger gradient
  danger: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
  // Neutral fade
  neutral: 'linear-gradient(135deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.1) 100%)',
} as const

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',   // Mobile
  sm: '640px',   // Small tablet
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
} as const

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Helper to create transition CSS
 * @example createTransition('color', 'slow')
 */
export function createTransition(property: string, duration: keyof typeof motion.duration = 'base') {
  const dur = motion.duration[duration]
  return `${property} ${dur} ${motion.easing.ease}`
}

/**
 * Helper to create box shadow
 * @example shadowForMode('light', 'md')
 */
export function shadowForMode(mode: 'light' | 'dark', level: keyof typeof shadows = 'md') {
  if (mode === 'dark') {
    const darkKey = `dark-${level}` as keyof typeof shadows
    return shadows[darkKey]
  }
  return shadows[level]
}

/**
 * Helper to create focus ring style
 * Compliant with WCAG 2.2 AA (3px outline, proper contrast)
 */
export function focusRing() {
  return {
    outline: `3px solid ${colors.primary[500]}`,
    outlineOffset: '2px',
  }
}

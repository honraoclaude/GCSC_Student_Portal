/**
 * Reusable Tailwind CSS Pattern Functions
 * Centralized styling patterns for consistent design across the application
 */

import { cn as classNames } from '@/lib/utils';

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

/**
 * Safely merge Tailwind CSS classes
 */
export const cn = classNames;

// ============================================================================
// CARD PATTERNS
// ============================================================================

/**
 * Base card styling with subtle border and smooth transitions
 */
export const cardBase = 'rounded-2xl border shadow-sm transition-all duration-300';

/**
 * Elevated card - white background with subtle shadow
 * Best for: content cards, information cards on light backgrounds
 */
export const cardElevated = cn(
  cardBase,
  'border-slate-200 dark:border-slate-700',
  'bg-white dark:bg-slate-900',
  'shadow-md hover:shadow-lg'
);

/**
 * Glass morphism card - frosted glass effect
 * Best for: featured content, premium sections, modern UI
 */
export const cardGlass = cn(
  cardBase,
  'border-white/20 dark:border-white/10',
  'bg-white/5 dark:bg-white/5',
  'backdrop-blur-xl',
  'shadow-lg hover:shadow-xl'
);

/**
 * Gradient card - subtle gradient background
 * Best for: stat cards, progress cards, visual emphasis
 */
export const cardGradient = cn(
  cardBase,
  'border-white/10 dark:border-white/10',
  'bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5',
  'backdrop-blur-xl',
  'shadow-lg hover:shadow-xl'
);

/**
 * Hoverable card - responds to user interaction
 * Best for: clickable cards, interactive elements
 */
export const cardHoverable = cn(
  cardGlass,
  'hover:scale-[1.02]',
  'cursor-pointer'
);

/**
 * Dark card - dark background styling
 * Best for: dark mode emphasis, navigation cards
 */
export const cardDark = cn(
  cardBase,
  'border-slate-700 dark:border-slate-600',
  'bg-slate-800 dark:bg-slate-900',
  'text-slate-100'
);

// ============================================================================
// INPUT PATTERNS
// ============================================================================

/**
 * Base input styling with focus states
 */
export const inputBase = cn(
  'w-full',
  'rounded-lg',
  'border border-slate-300 dark:border-slate-600',
  'bg-white dark:bg-slate-800',
  'px-4 py-3',
  'text-slate-900 dark:text-white',
  'placeholder-slate-500 dark:placeholder-slate-400',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
  'dark:focus:ring-indigo-400'
);

/**
 * Input with error state
 */
export const inputError = cn(
  inputBase,
  'border-rose-500 dark:border-rose-500',
  'focus:ring-rose-500 dark:focus:ring-rose-500'
);

/**
 * Glass morphism input
 */
export const inputGlass = cn(
  'w-full',
  'rounded-lg',
  'border border-white/20 dark:border-white/20',
  'bg-white/5 dark:bg-white/5',
  'backdrop-blur',
  'px-4 py-3',
  'text-white dark:text-white',
  'placeholder-white/50',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-indigo-400',
  'focus:border-white/30'
);

/**
 * Disabled input state
 */
export const inputDisabled = cn(
  inputBase,
  'bg-slate-100 dark:bg-slate-900',
  'text-slate-500 dark:text-slate-400',
  'cursor-not-allowed',
  'opacity-60'
);

// ============================================================================
// BUTTON PATTERNS
// ============================================================================

/**
 * Base button styling
 */
export const buttonBase = cn(
  'inline-flex items-center justify-center',
  'rounded-lg',
  'font-semibold',
  'transition-all duration-200',
  'outline-none',
  'focus-visible:ring-2 focus-visible:ring-offset-2'
);

/**
 * Primary button - main CTA styling
 */
export const buttonPrimary = cn(
  buttonBase,
  'bg-gradient-to-r from-indigo-600 to-purple-600',
  'hover:from-indigo-700 hover:to-purple-700',
  'text-white',
  'shadow-lg shadow-indigo-500/30',
  'hover:shadow-xl hover:shadow-indigo-500/40',
  'hover:-translate-y-0.5',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
);

/**
 * Secondary button - alternative action
 */
export const buttonSecondary = cn(
  buttonBase,
  'border-2 border-slate-300 dark:border-slate-600',
  'bg-white dark:bg-slate-800',
  'text-slate-900 dark:text-white',
  'hover:bg-slate-50 dark:hover:bg-slate-700',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

/**
 * Ghost button - minimal styling
 */
export const buttonGhost = cn(
  buttonBase,
  'text-slate-700 dark:text-slate-300',
  'hover:bg-slate-100 dark:hover:bg-slate-800',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

/**
 * Danger button - destructive actions
 */
export const buttonDanger = cn(
  buttonBase,
  'bg-rose-600 hover:bg-rose-700',
  'text-white',
  'shadow-lg shadow-rose-500/30',
  'hover:shadow-xl hover:shadow-rose-500/40',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

/**
 * Success button - positive actions
 */
export const buttonSuccess = cn(
  buttonBase,
  'bg-emerald-600 hover:bg-emerald-700',
  'text-white',
  'shadow-lg shadow-emerald-500/30',
  'hover:shadow-xl hover:shadow-emerald-500/40',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

/**
 * Icon button - compact button for icons
 */
export const buttonIcon = cn(
  buttonBase,
  'p-2',
  'rounded-full'
);

/**
 * Link button - text-only button style
 */
export const buttonLink = cn(
  buttonBase,
  'text-indigo-600 dark:text-indigo-400',
  'hover:text-indigo-700 dark:hover:text-indigo-300',
  'underline-offset-4 hover:underline',
  'disabled:opacity-50 disabled:cursor-not-allowed'
);

// ============================================================================
// BADGE PATTERNS
// ============================================================================

/**
 * Base badge styling
 */
export const badgeBase = cn(
  'inline-flex items-center gap-1',
  'px-3 py-1.5',
  'rounded-full',
  'text-xs font-semibold',
  'transition-colors duration-200'
);

/**
 * Primary badge
 */
export const badgePrimary = cn(
  badgeBase,
  'bg-indigo-100 dark:bg-indigo-900/30',
  'text-indigo-700 dark:text-indigo-300'
);

/**
 * Success badge
 */
export const badgeSuccess = cn(
  badgeBase,
  'bg-emerald-100 dark:bg-emerald-900/30',
  'text-emerald-700 dark:text-emerald-300'
);

/**
 * Warning badge
 */
export const badgeWarning = cn(
  badgeBase,
  'bg-amber-100 dark:bg-amber-900/30',
  'text-amber-700 dark:text-amber-300'
);

/**
 * Error badge
 */
export const badgeError = cn(
  badgeBase,
  'bg-rose-100 dark:bg-rose-900/30',
  'text-rose-700 dark:text-rose-300'
);

/**
 * Neutral badge
 */
export const badgeNeutral = cn(
  badgeBase,
  'bg-slate-200 dark:bg-slate-700',
  'text-slate-700 dark:text-slate-300'
);

/**
 * Glass badge - transparent with backdrop blur
 */
export const badgeGlass = cn(
  badgeBase,
  'bg-white/20 dark:bg-white/10',
  'backdrop-blur-sm',
  'text-white',
  'border border-white/30'
);

// ============================================================================
// TEXT PATTERNS
// ============================================================================

/**
 * Heading styles
 */
export const headingLarge = 'text-5xl font-black text-slate-900 dark:text-white';
export const headingMedium = 'text-3xl font-bold text-slate-900 dark:text-white';
export const headingSmall = 'text-2xl font-bold text-slate-900 dark:text-white';

/**
 * Muted text - secondary information
 */
export const textMuted = 'text-slate-600 dark:text-slate-400';

/**
 * Subtle text - least prominent
 */
export const textSubtle = 'text-slate-500 dark:text-slate-500';

/**
 * Label text - form labels
 */
export const textLabel = 'text-sm font-semibold text-slate-900 dark:text-white';

/**
 * Helper text - additional information
 */
export const textHelper = 'text-sm text-slate-500 dark:text-slate-400';

/**
 * Error text
 */
export const textError = 'text-sm font-medium text-rose-600 dark:text-rose-400';

/**
 * Success text
 */
export const textSuccess = 'text-sm font-medium text-emerald-600 dark:text-emerald-400';

// ============================================================================
// GRADIENT PATTERNS
// ============================================================================

/**
 * Primary gradient - indigo to purple
 */
export const gradientPrimary = 'from-indigo-500 to-purple-500';

/**
 * Accent gradient - amber to orange
 */
export const gradientAccent = 'from-amber-500 to-orange-500';

/**
 * Success gradient - emerald to teal
 */
export const gradientSuccess = 'from-emerald-500 to-teal-500';

/**
 * Error gradient - rose to pink
 */
export const gradientError = 'from-rose-500 to-pink-500';

/**
 * Cool gradient - blue to indigo
 */
export const gradientCool = 'from-blue-500 to-indigo-500';

/**
 * Warm gradient - orange to red
 */
export const gradientWarm = 'from-orange-500 to-red-500';

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

/**
 * Section spacing - vertical rhythm
 */
export const sectionSpacing = 'space-y-8 md:space-y-12';

/**
 * Container padding
 */
export const containerPadding = 'px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12';

/**
 * Container with max width
 */
export const containerMaxWidth = 'mx-auto max-w-7xl';

/**
 * Responsive grid - 1, 2, 3 columns
 */
export const gridResponsive = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';

/**
 * Responsive grid - 1, 2 columns
 */
export const gridTwoCol = 'grid gap-6 md:grid-cols-2';

/**
 * Responsive grid - 2, 3, 4 columns
 */
export const gridFourCol = 'grid gap-6 md:grid-cols-3 lg:grid-cols-4';

/**
 * Flexible row layout
 */
export const flexRow = 'flex items-center gap-4';

/**
 * Flex column layout with spacing
 */
export const flexCol = 'flex flex-col gap-4';

// ============================================================================
// FORM PATTERNS
// ============================================================================

/**
 * Form group - wrapper for form fields
 */
export const formGroup = 'space-y-2';

/**
 * Form field wrapper - label + input container
 */
export const formField = 'w-full';

/**
 * Form label styling
 */
export const formLabel = cn(
  'block',
  'text-sm font-semibold',
  'text-slate-900 dark:text-white',
  'mb-2'
);

/**
 * Form error message
 */
export const formErrorMessage = cn(
  'mt-2',
  'text-sm font-medium',
  'text-rose-600 dark:text-rose-400'
);

/**
 * Form helper text
 */
export const formHelperText = cn(
  'mt-2',
  'text-sm',
  'text-slate-500 dark:text-slate-400'
);

// ============================================================================
// BACKGROUND PATTERNS
// ============================================================================

/**
 * Dark gradient background - premium feel
 */
export const bgDarkGradient = 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900';

/**
 * Light background
 */
export const bgLight = 'bg-white dark:bg-slate-950';

/**
 * Subtle background - slightly different from default
 */
export const bgSubtle = 'bg-slate-50 dark:bg-slate-900';

/**
 * Glass background
 */
export const bgGlass = 'bg-white/5 dark:bg-white/5 backdrop-blur-xl';

// ============================================================================
// ANIMATION PATTERNS
// ============================================================================

/**
 * Fade in animation
 */
export const animateFadeIn = 'animate-in fade-in duration-300';

/**
 * Slide up animation
 */
export const animateSlideUp = 'animate-in slide-in-from-bottom-4 duration-300';

/**
 * Pulse animation
 */
export const animatePulse = 'animate-pulse';

/**
 * Spin animation
 */
export const animateSpin = 'animate-spin';

// ============================================================================
// FOCUS & INTERACTION PATTERNS
// ============================================================================

/**
 * Focus ring for keyboard navigation
 */
export const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';

/**
 * Active state styling
 */
export const activeState = 'active:scale-95';

/**
 * Disabled state styling
 */
export const disabledState = 'disabled:opacity-50 disabled:cursor-not-allowed';

// ============================================================================
// OVERLAY PATTERNS
// ============================================================================

/**
 * Modal backdrop overlay
 */
export const backdropOverlay = cn(
  'fixed inset-0',
  'bg-black/50 dark:bg-black/70',
  'backdrop-blur-sm'
);

/**
 * Modal panel
 */
export const modalPanel = cn(
  'relative',
  'rounded-2xl',
  'bg-white dark:bg-slate-900',
  'shadow-xl',
  'max-w-lg mx-auto',
  'p-6 md:p-8'
);

// ============================================================================
// COMPOSITION HELPERS
// ============================================================================

/**
 * Complete card with all standard features - glass effect
 */
export const cardComplete = cn(
  cardGlass,
  'p-6 md:p-8'
);

/**
 * Complete input field with label and error states
 */
export const inputComplete = cn(
  'w-full',
  'space-y-2'
);

/**
 * Complete button with standard padding
 */
export const buttonComplete = cn(
  buttonBase,
  'px-6 py-3',
  'text-sm md:text-base'
);

/**
 * Hero section - large banner styling
 */
export const heroSection = cn(
  'min-h-screen',
  'flex flex-col items-center justify-center',
  'bg-gradient-to-br from-slate-900 to-slate-950',
  'px-4',
  'py-12'
);

/**
 * Page container - max width wrapper
 */
export const pageContainer = cn(
  'min-h-screen',
  'bg-white dark:bg-slate-950',
  containerPadding,
  containerMaxWidth
);

/**
 * Section container - content grouping
 */
export const sectionContainer = cn(
  'space-y-6',
  'py-8 md:py-12'
);


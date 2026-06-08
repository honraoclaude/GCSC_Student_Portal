import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] dark:from-blue-500 dark:to-purple-500',
        secondary: 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-slate-700 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors',
        ghost: 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-900/50 transition-colors',
        outline: 'border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors',
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
      },
      size: {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
        icon: 'h-10 w-10 p-0',
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, icon, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
)

Button.displayName = 'Button'

export { Button, buttonVariants }

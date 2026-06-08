import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'glass' | 'outline'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', ...props }, ref) => {
    const variantStyles = {
      elevated: 'bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-200',
      glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-slate-700',
      outline: 'bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-slate-700',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }

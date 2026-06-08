import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'w-full h-12 px-4 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export { Input }

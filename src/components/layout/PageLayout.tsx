import React from 'react'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

/**
 * PageLayout - Main wrapper for authenticated page layouts
 * Provides consistent spacing, structure, and optional header
 * Features design system alignment with blue-to-purple gradient
 */
export function PageLayout({
  children,
  title,
  description,
  actions,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-slate-900 transition-colors', className)}>
      {/* Header Section */}
      {(title || description || actions) && (
        <div className="border-b border-slate-200 dark:border-slate-800 py-8 px-6 animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {title && (
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 font-medium">
                  {description}
                </p>
              )}
            </div>

            {actions && <div className="flex-shrink-0 animate-fade-in-up">{actions}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {children}
      </div>
    </div>
  )
}

import React from 'react';
import { cn, cardGlass, cardElevated } from '@/styles';

interface SectionCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'glass' | 'elevated';
  className?: string;
}

/**
 * SectionCard - Card for grouping page sections
 * Uses glass or elevated card patterns with optional header
 */
export function SectionCard({
  children,
  title,
  description,
  icon,
  actions,
  variant = 'glass',
  className,
}: SectionCardProps) {
  const cardClass = variant === 'glass' ? cardGlass : cardElevated;

  return (
    <div className={cn(cardClass, 'p-6 md:p-8 rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-200', className)}>
      {/* Header Section */}
      {(title || description || icon || actions) && (
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                {icon && <div className="flex-shrink-0 text-2xl">{icon}</div>}
                {title && (
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                    {title}
                  </h2>
                )}
              </div>
              {description && (
                <p className="text-slate-600 dark:text-slate-400 font-medium">{description}</p>
              )}
            </div>

            {actions && <div className="flex-shrink-0">{actions}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}

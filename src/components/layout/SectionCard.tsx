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
    <div className={cn(cardClass, 'p-6 md:p-8', className)}>
      {/* Header Section */}
      {(title || description || icon || actions) && (
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                {icon && <div className="flex-shrink-0">{icon}</div>}
                {title && (
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {title}
                  </h2>
                )}
              </div>
              {description && (
                <p className="text-slate-600 dark:text-slate-400">{description}</p>
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

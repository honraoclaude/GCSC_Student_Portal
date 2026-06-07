import React from 'react';
import { cn, sectionSpacing } from '@/styles';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * PageLayout - Main wrapper for authenticated page layouts
 * Provides consistent spacing, structure, and optional header
 */
export function PageLayout({
  children,
  title,
  description,
  actions,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn(sectionSpacing, className)}>
      {/* Header Section */}
      {(title || description || actions) && (
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {title && (
                <h1 className="text-5xl font-black text-slate-900 dark:text-white">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                  {description}
                </p>
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

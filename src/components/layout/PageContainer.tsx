import React from 'react';
import { cn } from '@/styles';

interface PageContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * PageContainer - Max-width container with padding
 * Ensures consistent page margins and responsive sizing
 */
export function PageContainer({
  children,
  size = 'md',
  className,
}: PageContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
  };

  return (
    <div
      className={cn(
        'mx-auto',
        'px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}

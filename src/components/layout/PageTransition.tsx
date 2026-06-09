'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wraps page content with fade-in-up animation
 * Applied automatically to all pages via layout
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [pathname]);

  return (
    <div
      className={cn(
        'transition-all duration-500',
        isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      )}
      style={{
        animation: isReady ? 'fadeInUp 0.5s ease-out forwards' : 'none'
      }}
    >
      {children}
    </div>
  );
}

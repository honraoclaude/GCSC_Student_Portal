'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant: line, circle, rect, card */
  variant?: 'line' | 'circle' | 'rect' | 'card'
  /** Width (CSS) */
  width?: string | number
  /** Height (CSS) */
  height?: string | number
  /** Number of lines (for 'line' variant) */
  lines?: number
}

/**
 * Skeleton loader component for async content
 * Use during data loading to improve perceived performance
 *
 * @example
 * <Skeleton variant="line" width="100%" height="20px" />
 * <Skeleton variant="circle" width="40px" height="40px" />
 * <Skeleton variant="card" />
 */
export function Skeleton({
  variant = 'rect',
  width,
  height,
  lines = 1,
  className,
  ...props
}: SkeletonProps) {
  const baseClass =
    'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800'

  if (variant === 'line') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, 'rounded-md')}
            style={{
              width: width || '100%',
              height: height || '16px',
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'circle') {
    return (
      <div
        className={cn(baseClass, 'rounded-full')}
        style={{
          width: width || '40px',
          height: height || '40px',
        }}
        {...props}
      />
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn('space-y-3 rounded-lg border border-slate-200 dark:border-slate-700 p-4', className)} {...props}>
        <Skeleton variant="line" width="60%" />
        <Skeleton variant="line" lines={2} />
      </div>
    )
  }

  // Default: rect
  return (
    <div
      className={cn(baseClass, 'rounded-md', className)}
      style={{
        width: width || '100%',
        height: height || '40px',
      }}
      {...props}
    />
  )
}

/**
 * Skeleton grid for loading multiple items
 * @example
 * <SkeletonGrid count={6} variant="card" />
 */
export function SkeletonGrid({
  count = 6,
  variant = 'card',
  columns = 3,
}: {
  count?: number
  variant?: SkeletonProps['variant']
  columns?: number
}) {
  return (
    <div className={`grid gap-4 md:grid-cols-${columns}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant={variant} />
      ))}
    </div>
  )
}

/**
 * Skeleton for a data table row
 */
export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton variant="line" width="80%" />
        </td>
      ))}
    </tr>
  )
}

/**
 * Skeleton for a typical list item
 */
export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
      <Skeleton variant="circle" width="40px" height="40px" />
      <div className="flex-1">
        <Skeleton variant="line" width="60%" height="16px" />
        <Skeleton variant="line" width="40%" height="14px" className="mt-2" />
      </div>
    </div>
  )
}

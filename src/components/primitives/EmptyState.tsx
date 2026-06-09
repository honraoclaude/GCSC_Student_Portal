'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

interface EmptyStateProps {
  /** Icon/emoji (60px) */
  icon?: React.ReactNode
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Primary action button */
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  /** Additional className */
  className?: string
}

/**
 * Empty state component for when there's no data to display
 * Use when a list, table, or section is empty (not loading, not error, just empty)
 *
 * @example
 * <EmptyState
 *   icon="📚"
 *   title="No courses yet"
 *   description="Start exploring courses to add them to your learning path"
 *   action={{ label: 'Browse Courses', href: '/courses' }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon && <div className="text-6xl mb-4">{icon}</div>}

      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>

      {description && <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6">{description}</p>}

      {(action || secondaryAction) && (
        <div className="flex gap-3 flex-wrap justify-center">
          {action && (
            <ActionButton {...action} variant="primary" />
          )}
          {secondaryAction && (
            <ActionButton {...secondaryAction} variant="secondary" />
          )}
        </div>
      )}
    </div>
  )
}

function ActionButton({
  label,
  href,
  onClick,
  variant = 'primary',
}: {
  label: string
  href?: string
  onClick?: () => void
  variant: 'primary' | 'secondary'
}) {
  const buttonClass = cn(
    'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200',
    variant === 'primary'
      ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
      : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
  )

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {label}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {label}
    </button>
  )
}

/**
 * Empty state for search results
 */
export function EmptySearchState({
  query,
  onClear,
}: {
  query: string
  onClear?: () => void
}) {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try a different search.`}
      action={onClear ? { label: 'Clear search', onClick: onClear } : undefined}
    />
  )
}

/**
 * Empty state for permissions/access denied
 */
export function EmptyPermissionState({ action }: { action?: EmptyStateProps['action'] }) {
  return (
    <EmptyState
      icon="🔒"
      title="Access denied"
      description="You don't have permission to access this resource"
      action={action || { label: 'Go back', href: '/' }}
    />
  )
}

/**
 * Empty state for errors
 */
export function EmptyErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error loading this content',
  action,
}: {
  title?: string
  description?: string
  action?: EmptyStateProps['action']
}) {
  return (
    <EmptyState
      icon="⚠️"
      title={title}
      description={description}
      action={action || { label: 'Try again', onClick: () => window.location.reload() }}
    />
  )
}

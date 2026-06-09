'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'AI Tutors', href: '/agents/tutor/maths', icon: '🤖' },
  { label: 'Learning Hub', href: '/learning-hub', icon: '📚' },
  { label: 'Flashcards', href: '/learning-hub/flashcards', icon: '🎴' },
  { label: 'Tutors', href: '/marketplace', icon: '👥' },
  { label: 'Achievements', href: '/achievements', icon: '🏆' },
  { label: 'Leaderboard', href: '/leaderboard', icon: '⭐' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  return (
    <aside className={cn(
      'hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen z-40',
      'border-r border-slate-200/50 dark:border-slate-800/50',
      'bg-gradient-to-b from-white via-slate-50 to-slate-100',
      'dark:from-slate-900 dark:via-slate-950 dark:to-slate-950',
      'backdrop-blur-xl transition-all duration-300',
      isCompact ? 'w-20' : 'w-64'
    )}>
      {/* Logo Section with Collapse Button */}
      <div className="border-b border-slate-200/50 dark:border-slate-800/50 px-4 py-6 flex items-center justify-between">
        {!isCompact && (
          <Link href="/dashboard" className="flex items-center gap-3 flex-1 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
              GC
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm truncate">GCSC Hub</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">Learning Portal</p>
            </div>
          </Link>
        )}
        {isCompact && (
          <Link href="/dashboard" className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 text-white font-bold text-lg shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
            GC
          </Link>
        )}

        <button
          onClick={() => setIsCompact(!isCompact)}
          className={cn(
            'p-1.5 rounded-lg transition-all duration-300',
            'hover:bg-slate-200/50 dark:hover:bg-slate-800/50',
            'text-slate-600 dark:text-slate-400'
          )}
          title={isCompact ? 'Expand' : 'Collapse'}
        >
          <ChevronLeft className={cn('w-5 h-5 transition-transform duration-300', isCompact && 'rotate-180')} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {!isCompact && (
          <p className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Navigation
          </p>
        )}

        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                'flex items-center gap-3 rounded-lg transition-all duration-300 relative group',
                isCompact ? 'px-2 py-3 justify-center' : 'px-3 py-3',
                isActive
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/15 dark:from-primary-600/30 dark:to-secondary-600/25 border border-primary-200/40 dark:border-primary-400/30 shadow-sm'
                  : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/50 border border-transparent'
              )}
              title={isCompact ? item.label : undefined}
            >
              <span className={cn(
                'text-xl transition-all duration-300',
                hoveredItem === item.href && !isCompact && 'scale-125'
              )}>
                {item.icon}
              </span>

              {!isCompact && (
                <span className={cn(
                  'font-semibold text-sm transition-colors duration-300 flex-1 truncate',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                )}>
                  {item.label}
                </span>
              )}

              {isActive && (
                <div className={cn(
                  'absolute rounded-full bg-gradient-to-b from-primary-600 to-secondary-600 shadow-md transition-all duration-300',
                  isCompact ? 'inset-0 -z-10 opacity-20' : 'right-0 w-1.5 h-6'
                )} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className={cn(
        'border-t border-slate-200/50 dark:border-slate-800/50 px-2 py-4',
        !isCompact && 'space-y-3'
      )}>
        {!isCompact && (
          <div className={cn(
            'rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10',
            'dark:from-primary-600/20 dark:to-secondary-600/15',
            'backdrop-blur-sm p-3 text-center',
            'border border-primary-200/30 dark:border-primary-400/20',
            'hover:border-primary-300/50 dark:hover:border-primary-400/40',
            'transition-all duration-300'
          )}>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Level
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
              12
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Keep learning! 🚀</p>
          </div>
        )}
        {isCompact && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-600/30 dark:to-secondary-600/25 border border-primary-200/30 dark:border-primary-400/20 mx-auto">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">12</span>
          </div>
        )}
      </div>
    </aside>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊', color: 'text-red-600 dark:text-red-400' },
  { label: 'AI Tutors', href: '/agents/tutor/maths', icon: '🤖', color: 'text-orange-600 dark:text-orange-400' },
  { label: 'Learning Hub', href: '/learning-hub', icon: '📚', color: 'text-teal-600 dark:text-teal-400' },
  { label: 'Flashcards', href: '/learning-hub/flashcards', icon: '🎴', color: 'text-orange-500 dark:text-orange-400' },
  { label: 'Tutors', href: '/marketplace', icon: '👥', color: 'text-red-500 dark:text-red-400' },
  { label: 'Achievements', href: '/achievements', icon: '🏆', color: 'text-amber-600 dark:text-amber-400' },
  { label: 'Leaderboard', href: '/leaderboard', icon: '⭐', color: 'text-teal-500 dark:text-teal-400' },
  { label: 'Settings', href: '/settings', icon: '⚙️', color: 'text-slate-600 dark:text-slate-400' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="hidden w-64 border-r border-slate-200/50 dark:border-slate-800/50 lg:flex lg:flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-7">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            GC
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-sm">GCSC Hub</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Learning Platform</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Navigation</p>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/25 to-orange-600/20 dark:from-red-600/40 dark:to-orange-600/30 border border-red-300/40 dark:border-red-400/30 shadow-sm'
                  : 'hover:bg-slate-200/40 dark:hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <span className={`text-xl transition-all duration-300 ${hoveredItem === item.href ? 'scale-125' : 'scale-100'}`}>
                {item.icon}
              </span>
              <span
                className={`font-semibold text-sm transition-colors duration-300 ${
                  isActive
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-7 rounded-full bg-gradient-to-b from-red-600 to-orange-500 shadow-md"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-4 py-6 space-y-3">
        <div className="rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-600/20 dark:to-orange-600/15 backdrop-blur-sm p-4 text-center border border-red-200/30 dark:border-red-400/20 hover:border-red-300/50 dark:hover:border-red-400/40 transition-all duration-300">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">Your Level</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Level 12
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Keep learning! 🚀</p>
        </div>
      </div>
    </aside>
  );
}

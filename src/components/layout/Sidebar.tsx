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
    <aside className="hidden w-64 border-r border-slate-200/50 dark:border-slate-800/50 lg:flex lg:flex-col bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 backdrop-blur-sm">
      {/* Logo Section */}
      <div className="border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
            GC
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">GCSC Hub</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Learning Platform</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 dark:from-red-600/30 dark:to-orange-600/30 border border-red-200/30 dark:border-red-400/20'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className={`text-2xl transition-transform duration-200 ${hoveredItem === item.href ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span
                className={`font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1 h-6 rounded-l-full bg-gradient-to-b from-red-600 to-orange-600"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-4 py-4 space-y-2">
        <div className="rounded-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-3 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-400">Your Level</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Level 12
          </p>
        </div>
      </div>
    </aside>
  );
}

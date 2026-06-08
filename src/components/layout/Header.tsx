'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses, tutors..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>

          {/* User Profile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-16 right-6 w-48 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
              <button className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-t-lg text-sm font-medium text-slate-900 dark:text-white">
                👤 Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium text-slate-900 dark:text-white">
                ⚙️ Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium text-slate-900 dark:text-white">
                ❓ Help
              </button>
              <hr className="border-slate-200 dark:border-slate-700" />
              <button className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-lg text-sm font-medium text-red-600 dark:text-red-400">
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

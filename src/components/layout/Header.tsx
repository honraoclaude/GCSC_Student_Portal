'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, LogOut, Settings, HelpCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full',
      'border-b border-slate-200/50 dark:border-slate-800/50',
      'bg-white/80 dark:bg-slate-900/80',
      'backdrop-blur-xl transition-all duration-300'
    )}>
      <div className="flex items-center justify-between px-6 py-3 lg:ml-64">
        {/* Left Side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400 transition-colors" />
            <input
              type="text"
              placeholder="Search courses, tutors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'border border-slate-200 dark:border-slate-700',
                'bg-slate-50 dark:bg-slate-800',
                'text-slate-900 dark:text-white',
                'placeholder-slate-500 dark:placeholder-slate-400',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
                'dark:focus:ring-primary-400/50 dark:focus:border-primary-400',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-1 ml-8">
          {/* Notifications */}
          <button
            className={cn(
              'relative p-2 rounded-lg',
              'hover:bg-slate-100 dark:hover:bg-slate-800',
              'text-slate-600 dark:text-slate-400',
              'transition-all duration-200'
            )}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse shadow-lg shadow-primary-500/50"></span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              className={cn(
                'p-2 rounded-lg',
                'hover:bg-slate-100 dark:hover:bg-slate-800',
                'text-slate-600 dark:text-slate-400',
                'transition-all duration-200'
              )}
              title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'hover:bg-slate-100 dark:hover:bg-slate-800',
                'transition-all duration-200',
                isOpen && 'bg-slate-100 dark:bg-slate-800'
              )}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Student</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className={cn(
                'absolute top-full right-0 mt-2 w-56 rounded-xl',
                'bg-white dark:bg-slate-800',
                'border border-slate-200 dark:border-slate-700',
                'shadow-lg dark:shadow-dark-lg',
                'animate-fadeInUp'
              )}>
                <div className="p-2">
                  {/* Profile Section */}
                  <div className="px-3 py-2 mb-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Student · Level 12</p>
                  </div>

                  {/* Menu Items */}
                  <button className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                    'text-left text-sm text-slate-900 dark:text-white',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    'transition-colors duration-200'
                  )}>
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>

                  <button className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                    'text-left text-sm text-slate-900 dark:text-white',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    'transition-colors duration-200'
                  )}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>

                  <button className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                    'text-left text-sm text-slate-900 dark:text-white',
                    'hover:bg-slate-100 dark:hover:bg-slate-700',
                    'transition-colors duration-200'
                  )}>
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t border-slate-100 dark:border-slate-700"></div>

                  {/* Sign Out */}
                  <button className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                    'text-left text-sm text-primary-600 dark:text-primary-400',
                    'hover:bg-primary-50 dark:hover:bg-primary-900/20',
                    'transition-colors duration-200'
                  )}>
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 border-r border-slate-200 dark:border-slate-800 lg:block bg-white dark:bg-slate-900">
        <nav className="space-y-2 p-4">
          <p className="text-sm font-semibold text-slate-500">Navigation</p>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Portal Navigation
          </p>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Determine current step from pathname
  const getStep = () => {
    if (pathname.includes("/step-1")) return 1;
    if (pathname.includes("/step-2")) return 2;
    if (pathname.includes("/step-3")) return 3;
    return 0;
  };

  const currentStep = getStep();
  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-96 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 -left-96 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Progress bar */}
        {currentStep > 0 && (
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 fixed top-0 z-50">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative py-6 px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ✨ Personalized learning powered by AI
          </p>
        </footer>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// This page redirects to the new multi-step onboarding flow
export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/step-1");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="text-center space-y-4">
        <div className="text-4xl animate-bounce-slow">✨</div>
        <p className="text-slate-600 dark:text-slate-400 font-semibold">
          Loading your onboarding...
        </p>
      </div>
    </div>
  );
}

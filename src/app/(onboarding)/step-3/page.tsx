"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { SUBJECT_METADATA } from "@/constants";
import { cn } from "@/styles";

interface OnboardingData {
  displayName: string;
  yearGroup: string;
  subjects: Array<{
    subject: string;
    targetGrade: string;
  }>;
}

export default function Step3Page() {
  const router = useRouter();
  const { userId } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load and prepare onboarding data
  useEffect(() => {
    const savedSubjects = localStorage.getItem("onboarding_subjects");
    const savedGrades = localStorage.getItem("onboarding_grades");
    const savedName = localStorage.getItem("onboarding_name");
    const savedYear = localStorage.getItem("onboarding_year");

    if (!savedSubjects || !savedName) {
      router.push("/step-1");
      return;
    }

    try {
      const subjects = JSON.parse(savedSubjects);
      const grades = savedGrades ? JSON.parse(savedGrades) : {};

      const data: OnboardingData = {
        displayName: savedName,
        yearGroup: savedYear || "YEAR_11",
        subjects: subjects.map((subject: string) => ({
          subject,
          targetGrade: grades[subject] || "GRADE_7",
        })),
      };

      setOnboardingData(data);
    } catch (e) {
      console.error("Failed to load onboarding data:", e);
      router.push("/step-1");
    }
  }, [router]);

  const handleCompleteOnboarding = async () => {
    if (!onboardingData || !userId) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          displayName: onboardingData.displayName,
          yearGroup: onboardingData.yearGroup,
          subjects: onboardingData.subjects,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Onboarding failed");
      }

      // Clear localStorage
      localStorage.removeItem("onboarding_subjects");
      localStorage.removeItem("onboarding_grades");
      localStorage.removeItem("onboarding_name");
      localStorage.removeItem("onboarding_year");

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete onboarding"
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipForNow = () => {
    // Clear localStorage and go to dashboard
    localStorage.removeItem("onboarding_subjects");
    localStorage.removeItem("onboarding_grades");
    localStorage.removeItem("onboarding_name");
    localStorage.removeItem("onboarding_year");
    router.push("/dashboard");
  };

  const getSubjectName = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.name || subject.replace(/_/g, " ");
  };

  const getGradeDisplay = (grade: string): string => {
    return grade.replace("GRADE_", "");
  };

  if (!onboardingData) {
    return (
      <div className="text-center space-y-4">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 dark:border-emerald-400/40">
          <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            Step 3 of 3
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
          You're all set! ✅
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Your profile is ready. Let's start your learning journey!
        </p>
      </div>

      {/* Celebration Hero */}
      <div className="rounded-2xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-950/40 dark:to-green-950/40 backdrop-blur-xl overflow-hidden h-64 md:h-80 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-8xl animate-bounce-slow">🎉</p>
          <p className="text-slate-600 dark:text-slate-400 font-semibold text-lg">
            Ready to unlock your potential!
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="space-y-6 rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-xl p-8 md:p-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Profile
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Here's what we've set up for you:
          </p>
        </div>

        {/* Selected Subjects */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Enrolled Subjects ({onboardingData.subjects.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {onboardingData.subjects.map((enrollment) => (
              <div
                key={enrollment.subject}
                className="flex items-center justify-between rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur px-4 py-3 border border-indigo-200/30 dark:border-indigo-200/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {SUBJECT_METADATA[enrollment.subject.toLowerCase()]?.emoji ||
                      "📚"}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {getSubjectName(enrollment.subject)}
                  </span>
                </div>
                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Target: {getGradeDisplay(enrollment.targetGrade)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next */}
        <div className="space-y-3 pt-6 border-t border-indigo-200/30 dark:border-indigo-200/20">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            What's next?
          </h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                1
              </span>
              <span>
                Visit the Dashboard to access all study tools and resources
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                2
              </span>
              <span>
                Chat with your AI tutor by selecting any subject card
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                3
              </span>
              <span>
                Create flashcard decks and start learning with spaced
                repetition
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-8">
        <button
          onClick={handleSkipForNow}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          Configure Later
        </button>
        <button
          onClick={handleCompleteOnboarding}
          disabled={isSubmitting}
          className={cn(
            "flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2",
            !isSubmitting
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
              : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⚙️</span> Starting Learning...
            </>
          ) : (
            <>
              Start Learning <span>→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GRADE_OPTIONS, SUBJECT_METADATA } from "@/constants";
import { cn } from "@/styles";

interface GradeTargets {
  [subject: string]: string;
}

export default function Step2Page() {
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [gradeTargets, setGradeTargets] = useState<GradeTargets>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load saved selections from localStorage on mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem("onboarding_subjects");
    const savedGrades = localStorage.getItem("onboarding_grades");
    const savedName = localStorage.getItem("onboarding_name");

    if (!savedSubjects || !savedName) {
      router.push("/step-1");
      return;
    }

    try {
      const subjects = JSON.parse(savedSubjects);
      setSelectedSubjects(subjects);

      // Initialize grade targets
      const grades: GradeTargets = {};
      if (savedGrades) {
        const parsed = JSON.parse(savedGrades);
        subjects.forEach((subject: string) => {
          grades[subject] = parsed[subject] || "GRADE_7";
        });
      } else {
        subjects.forEach((subject: string) => {
          grades[subject] = "GRADE_7";
        });
      }
      setGradeTargets(grades);
    } catch (e) {
      console.error("Failed to load saved data:", e);
      router.push("/step-1");
    }
  }, [router]);

  const handleGradeChange = (subject: string, grade: string) => {
    const updated = { ...gradeTargets, [subject]: grade };
    setGradeTargets(updated);
    localStorage.setItem("onboarding_grades", JSON.stringify(updated));
  };

  const handleContinue = () => {
    setIsLoading(true);
    router.push("/step-3");
  };

  const handleBack = () => {
    router.push("/step-1");
  };

  const getSubjectEmoji = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.emoji || "📚";
  };

  const getSubjectName = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.name || subject.replace(/_/g, " ");
  };

  const getGradeLabel = (grade: string): string => {
    const num = grade.replace("GRADE_", "");
    const gradeDescs: Record<string, string> = {
      "9": "Exceptional",
      "8": "Very Good",
      "7": "Good",
      "6": "Secure Pass",
      "5": "Strong Pass",
      "4": "Standard Pass",
      "3": "Below Standard",
      "2": "Poor",
      "1": "Very Poor",
    };
    return `Grade ${num} - ${gradeDescs[num] || "Unknown"}`;
  };

  if (selectedSubjects.length === 0) {
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
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 dark:border-indigo-400/40">
          <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Step 2 of 3
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
          What are your target grades?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Set ambitious goals for each subject. These will guide your learning plan.
        </p>
      </div>

      {/* Hero placeholder */}
      <div className="rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-xl overflow-hidden h-64 md:h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🎯</p>
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            Set your goals
          </p>
        </div>
      </div>

      {/* Grade Targets Grid */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? "s" : ""} to configure
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedSubjects.map((subject) => (
            <div
              key={subject}
              className="rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-900/50 backdrop-blur-xl p-6 space-y-4"
            >
              {/* Subject Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-xl">
                  {getSubjectEmoji(subject)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {getSubjectName(subject)}
                  </h3>
                </div>
              </div>

              {/* Grade Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Target Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GRADE_OPTIONS.map((grade) => {
                    const gradeNum = grade.replace("GRADE_", "");
                    const isSelected = gradeTargets[subject] === grade;

                    return (
                      <button
                        key={grade}
                        onClick={() => handleGradeChange(subject, grade)}
                        className={cn(
                          "py-3 px-2 rounded-lg font-bold text-sm transition-all duration-200",
                          isSelected
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
                        )}
                      >
                        {gradeNum}
                      </button>
                    );
                  })}
                </div>

                {/* Grade Description */}
                <div className="pt-3 border-t border-indigo-200/30 dark:border-indigo-200/20">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {getGradeLabel(gradeTargets[subject])}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-8">
        <button
          onClick={handleBack}
          disabled={isLoading}
          className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={cn(
            "flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2",
            !isLoading
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5"
              : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⚙️</span> Loading...
            </>
          ) : (
            <>
              Continue <span>→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

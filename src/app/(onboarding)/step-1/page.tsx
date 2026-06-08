"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GCSE_SUBJECTS, SUBJECT_METADATA, YEAR_GROUPS } from "@/constants";
import { cn } from "@/styles";

export default function Step1Page() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [yearGroup, setYearGroup] = useState("YEAR_11");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved selections from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("onboarding_name");
    const savedYear = localStorage.getItem("onboarding_year");
    const savedSubjects = localStorage.getItem("onboarding_subjects");

    if (savedName) setDisplayName(savedName);
    if (savedYear) setYearGroup(savedYear);
    if (savedSubjects) {
      try {
        setSelectedSubjects(JSON.parse(savedSubjects));
      } catch (e) {
        console.error("Failed to load saved subjects:", e);
      }
    }
  }, []);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => {
      const updated = prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject];
      localStorage.setItem("onboarding_subjects", JSON.stringify(updated));
      return updated;
    });
  };

  const handleContinue = () => {
    setError("");

    if (!displayName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject");
      return;
    }

    // Save to localStorage
    localStorage.setItem("onboarding_name", displayName);
    localStorage.setItem("onboarding_year", yearGroup);

    setIsLoading(true);
    router.push("/step-2");
  };

  const getSubjectColor = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.color || "from-blue-500 to-cyan-500";
  };

  const getSubjectEmoji = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.emoji || "📚";
  };

  const getSubjectName = (subject: string): string => {
    const key = subject.toLowerCase();
    return SUBJECT_METADATA[key]?.name || subject.replace(/_/g, " ");
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 dark:border-indigo-400/40">
          <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Step 1 of 3
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
          Let's get started!
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Tell us about yourself and the subjects you're studying.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
          <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form Section */}
      <div className="space-y-6 rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-900/50 dark:to-slate-900/50 backdrop-blur-xl p-8 md:p-10">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
            What's your name?
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., Alex"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        {/* Year Group Select */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
            Which year group are you in?
          </label>
          <select
            value={yearGroup}
            onChange={(e) => setYearGroup(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            {YEAR_GROUPS.map((year) => (
              <option key={year} value={year}>
                {year.replace("YEAR_", "Year ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            What subjects are you studying?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {selectedSubjects.length === 0
              ? "Select at least one subject"
              : `${selectedSubjects.length} subject${selectedSubjects.length !== 1 ? "s" : ""} selected`}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GCSE_SUBJECTS.map((subject) => {
            const isSelected = selectedSubjects.includes(subject);
            const colorClass = getSubjectColor(subject);
            const emoji = getSubjectEmoji(subject);
            const name = getSubjectName(subject);

            return (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={cn(
                  "relative group p-6 rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                  isSelected
                    ? `border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40`
                    : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {/* Background gradient for selected state */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 pointer-events-none" />
                )}

                <div className="relative z-10 space-y-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 group-hover:scale-110",
                      isSelected
                        ? "bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg"
                        : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"
                    )}
                  >
                    {emoji}
                  </div>

                  {/* Name */}
                  <div className="text-left">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {name}
                    </h3>
                  </div>

                  {/* Checkmark for selected */}
                  {isSelected && (
                    <div className="pt-2 border-t border-indigo-300/30 dark:border-indigo-300/20 flex items-center gap-2">
                      <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Selected ✓
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-8">
        <Link href="/sign-up" className="flex-1">
          <Button variant="secondary" className="w-full">
            Back
          </Button>
        </Link>
        <button
          onClick={handleContinue}
          disabled={!displayName.trim() || selectedSubjects.length === 0 || isLoading}
          className={cn(
            "flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2",
            displayName.trim() && selectedSubjects.length > 0 && !isLoading
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

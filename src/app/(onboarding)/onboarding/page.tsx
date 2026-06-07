"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const GCSE_SUBJECTS = [
  "MATHS",
  "ENGLISH_LANGUAGE",
  "ENGLISH_LITERATURE",
  "PHYSICS",
  "CHEMISTRY",
  "BIOLOGY",
  "COMPUTER_SCIENCE",
  "ECONOMICS",
  "BUSINESS",
  "GEOGRAPHY",
  "HISTORY",
];

const YEAR_GROUPS = ["YEAR_9", "YEAR_10", "YEAR_11"];

const GRADE_TARGETS = [
  "GRADE_1",
  "GRADE_2",
  "GRADE_3",
  "GRADE_4",
  "GRADE_5",
  "GRADE_6",
  "GRADE_7",
  "GRADE_8",
  "GRADE_9",
];

export default function OnboardingPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [yearGroup, setYearGroup] = useState("YEAR_11");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [gradeTargets, setGradeTargets] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
      const newTargets = { ...gradeTargets };
      delete newTargets[subject];
      setGradeTargets(newTargets);
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
      setGradeTargets({ ...gradeTargets, [subject]: "GRADE_7" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // Send the current user's ID from Clerk
          displayName,
          yearGroup,
          subjects: selectedSubjects.map((subject) => ({
            subject,
            targetGrade: gradeTargets[subject] || "GRADE_7",
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Onboarding failed");
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Failed to complete onboarding. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 px-4 py-8 md:py-12">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to GCSC Student Hub ✨
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Let&apos;s set up<br />your learning journey
          </h1>
          <p className="text-lg text-slate-300 max-w-lg mx-auto">
            Personalized AI tutoring, spaced repetition, and gamification — all in one place
          </p>
        </div>

        {/* Form Card (Glassmorphism) */}
        <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
          {error && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-rose-300 text-sm font-medium animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {/* Step 1: Name */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Alex"
              className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Step 2: Year Group */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              Which year group are you in?
            </label>
            <select
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {YEAR_GROUPS.map((year) => (
                <option key={year} value={year} className="bg-slate-900">
                  {year.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Subjects */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-white">
                Select your GCSE subjects
              </label>
              <p className="text-xs text-slate-400">
                Choose at least one subject to get personalized tutoring
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GCSE_SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`rounded-lg border-2 px-5 py-3.5 font-medium transition-all duration-200 ${
                    selectedSubjects.includes(subject)
                      ? "border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 shadow-lg shadow-indigo-500/20 scale-105"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-white/20"
                  }`}
                >
                  {selectedSubjects.includes(subject) ? "✓ " : ""}{subject.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Target Grades */}
          {selectedSubjects.length > 0 && (
            <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <label className="block text-sm font-semibold text-white">
                What are your target grades?
              </label>
              <div className="space-y-3">
                {selectedSubjects.map((subject) => (
                  <div key={subject} className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">
                      {subject.replace(/_/g, " ")}
                    </label>
                    <select
                      value={gradeTargets[subject] || "GRADE_7"}
                      onChange={(e) =>
                        setGradeTargets({
                          ...gradeTargets,
                          [subject]: e.target.value,
                        })
                      }
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      {GRADE_TARGETS.map((grade) => (
                        <option key={grade} value={grade} className="bg-slate-900">
                          Grade {grade.replace("GRADE_", "")}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !displayName || selectedSubjects.length === 0}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚙️</span> Setting up your profile...
              </span>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </form>

        {/* Footer info */}
        <div className="text-center text-sm text-slate-400">
          <p>✨ Personalized learning powered by AI</p>
        </div>
      </div>
    </div>
  );
}

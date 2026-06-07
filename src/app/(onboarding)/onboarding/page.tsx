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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to GCSC Student Hub
          </h1>
          <p className="mt-3 text-slate-400">
            Let&apos;s set up your personalized learning profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-lg bg-white dark:bg-slate-900 p-8 shadow-lg">
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 p-4 text-red-900 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Alex"
              className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
              Year Group
            </label>
            <select
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white"
            >
              {YEAR_GROUPS.map((year) => (
                <option key={year} value={year}>
                  {year.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Select Your GCSE Subjects
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GCSE_SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`rounded-lg border-2 px-4 py-3 text-left font-medium transition-all ${
                    selectedSubjects.includes(subject)
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:border-slate-400"
                  }`}
                >
                  {subject.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {selectedSubjects.length > 0 && (
            <div className="space-y-4 rounded-lg bg-slate-50 dark:bg-slate-800 p-4">
              <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                Target Grades
              </label>
              {selectedSubjects.map((subject) => (
                <div key={subject} className="flex items-center justify-between">
                  <label className="text-sm text-slate-700 dark:text-slate-300">
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
                    className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 px-3 py-1 text-sm text-slate-900 dark:text-white"
                  >
                    {GRADE_TARGETS.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade.replace("_", "")}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !displayName || selectedSubjects.length === 0}
            className="w-full"
          >
            {isLoading ? "Setting up..." : "Complete Onboarding"}
          </Button>
        </form>
      </div>
    </div>
  );
}

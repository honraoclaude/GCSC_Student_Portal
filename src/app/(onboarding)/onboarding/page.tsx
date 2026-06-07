"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormError } from "@/components/forms";
import { GCSE_SUBJECTS, YEAR_GROUPS, GRADE_OPTIONS } from "@/constants";
import { replaceUnderscores } from "@/lib/utils";

interface OnboardingFormData {
  displayName: string;
  yearGroup: string;
  selectedSubjects: string[];
  gradeTargets: Record<string, string>;
}

export default function OnboardingPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize form state with required fields
  const initialFormData: OnboardingFormData = {
    displayName: "",
    yearGroup: "YEAR_11",
    selectedSubjects: [],
    gradeTargets: {},
  };

  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  const toggleSubject = (subject: string) => {
    setFormData((prev) => {
      const selectedSubjects = prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter((s) => s !== subject)
        : [...prev.selectedSubjects, subject];

      const gradeTargets = { ...prev.gradeTargets };
      if (!selectedSubjects.includes(subject)) {
        delete gradeTargets[subject];
      } else if (!gradeTargets[subject]) {
        gradeTargets[subject] = "GRADE_7";
      }

      return { ...prev, selectedSubjects, gradeTargets };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.displayName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (formData.selectedSubjects.length === 0) {
      setError("Please select at least one subject");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          displayName: formData.displayName,
          yearGroup: formData.yearGroup,
          subjects: formData.selectedSubjects.map((subject) => ({
            subject,
            targetGrade: formData.gradeTargets[subject] || "GRADE_7",
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
      setIsSubmitting(false);
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
          <FormError error={error} className="bg-rose-500/10 border-rose-500/30 animate-pulse" />

          {/* Step 1: Name */}
          <FormInput
            label="What's your name?"
            type="text"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
            placeholder="e.g., Alex"
            className="dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-400"
            required
          />

          {/* Step 2: Year Group */}
          <FormSelect
            label="Which year group are you in?"
            value={formData.yearGroup}
            onChange={(e) =>
              setFormData({ ...formData, yearGroup: e.target.value })
            }
            options={YEAR_GROUPS.map((year) => ({
              value: year,
              label: replaceUnderscores(year),
            }))}
            className="dark:bg-white/5 dark:border-white/10 dark:text-white"
            required
          />

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
                    formData.selectedSubjects.includes(subject)
                      ? "border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 shadow-lg shadow-indigo-500/20 scale-105"
                      : "border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-white/20"
                  }`}
                >
                  {formData.selectedSubjects.includes(subject) ? "✓ " : ""}{replaceUnderscores(subject)}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Target Grades */}
          {formData.selectedSubjects.length > 0 && (
            <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <label className="block text-sm font-semibold text-white">
                What are your target grades?
              </label>
              <div className="space-y-4">
                {formData.selectedSubjects.map((subject) => (
                  <FormSelect
                    key={subject}
                    label={replaceUnderscores(subject)}
                    value={formData.gradeTargets[subject] || "GRADE_7"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gradeTargets: {
                          ...formData.gradeTargets,
                          [subject]: e.target.value,
                        },
                      })
                    }
                    options={GRADE_OPTIONS.map((grade) => ({
                      value: grade,
                      label: `Grade ${grade.replace("GRADE_", "")}`,
                    }))}
                    className="dark:bg-white/5 dark:border-white/10 dark:text-white"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !formData.displayName || formData.selectedSubjects.length === 0}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            {isSubmitting ? (
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

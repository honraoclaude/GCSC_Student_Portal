"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SUBJECTS = [
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

export default function CreateDeckPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "MATHS",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/flashcards/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create deck");

      const { deck } = await res.json();
      router.push(`/learning-hub/flashcards/${deck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
      alert("Failed to create deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <Link href="/learning-hub/flashcards" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-4 inline-flex items-center gap-1 transition-colors">
          ← Back to Decks
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Create New Deck
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Start your spaced repetition learning journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl p-8 space-y-6 shadow-xl">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Deck Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Physics Revision, French Vocab"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="What is this deck about?"
              rows={4}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Deck"}
          </Button>
          <Link href="/learning-hub/flashcards" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>

      {/* Info */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          💡 After creating your deck, you can add flashcards and start studying with spaced repetition!
        </p>
      </div>
    </div>
  );
}

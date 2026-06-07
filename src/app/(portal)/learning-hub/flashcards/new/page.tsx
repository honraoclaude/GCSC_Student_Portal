"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea } from "@/components/forms";
import { PageHeader, PageCard } from "@/components/layout";
import { GCSE_SUBJECTS } from "@/constants";

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

  const backButton = (
    <Link
      href="/learning-hub/flashcards"
      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
    >
      ← Back to Decks
    </Link>
  );

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        title="Create New Deck"
        description="Start your spaced repetition learning journey"
        backButton={backButton}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <PageCard className="space-y-6">
          <FormInput
            label="Deck Title"
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Physics Revision, French Vocab"
          />

          <FormSelect
            label="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            options={GCSE_SUBJECTS.map((subject) => ({
              value: subject,
              label: subject.replace(/_/g, " "),
            }))}
            required
          />

          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="What is this deck about?"
            rows={4}
            helperText="Optional: Add a description to help you remember what this deck covers"
          />
        </PageCard>

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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@/hooks";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormTextarea, FormError } from "@/components/forms";
import { PageHeader, PageCard } from "@/components/layout";
import { GCSE_SUBJECTS } from "@/constants";
import { replaceUnderscores } from "@/lib/utils";

interface CreateDeckFormData {
  title: string;
  subject: string;
  description: string;
}

export default function CreateDeckPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<CreateDeckFormData>({
    initialValues: {
      title: "",
      subject: "MATHS",
      description: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof CreateDeckFormData, string>> = {};
      if (!values.title.trim()) {
        errors.title = "Title is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/flashcards/decks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to create deck");

        const { deck } = await res.json();
        router.push(`/learning-hub/flashcards/${deck.id}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Failed to create deck";
        setSubmitError(errorMsg);
        throw error;
      }
    },
  });

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
      <form onSubmit={form.handleSubmit} className="space-y-6">
        <PageCard className="space-y-6">
          {submitError && (
            <FormError error={submitError} />
          )}

          <FormInput
            label="Deck Title"
            type="text"
            required
            value={form.values.title}
            onChange={(e) => form.setFieldValue("title", e.target.value)}
            onBlur={() => form.handleBlur("title")}
            placeholder="e.g., Physics Revision, French Vocab"
            error={form.touched.title ? form.errors.title : undefined}
          />

          <FormSelect
            label="Subject"
            value={form.values.subject}
            onChange={(e) => form.setFieldValue("subject", e.target.value)}
            options={GCSE_SUBJECTS.map((subject) => ({
              value: subject,
              label: replaceUnderscores(subject),
            }))}
            required
          />

          <FormTextarea
            label="Description"
            value={form.values.description}
            onChange={(e) => form.setFieldValue("description", e.target.value)}
            placeholder="What is this deck about?"
            rows={4}
            helperText="Optional: Add a description to help you remember what this deck covers"
          />
        </PageCard>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={form.isSubmitting || !form.values.title.trim()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
          >
            {form.isSubmitting ? "Creating..." : "Create Deck"}
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

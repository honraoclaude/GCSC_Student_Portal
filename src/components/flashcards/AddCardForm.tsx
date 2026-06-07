"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@/hooks";
import { Button } from "@/components/ui/button";
import { FormTextarea, FormInput, FormError } from "@/components/forms";
import { useState } from "react";

interface AddCardFormProps {
  deckId: string;
}

interface AddCardFormData {
  front: string;
  back: string;
  hint: string;
}

export function AddCardForm({ deckId }: AddCardFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<AddCardFormData>({
    initialValues: {
      front: "",
      back: "",
      hint: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof AddCardFormData, string>> = {};
      if (!values.front.trim()) {
        errors.front = "Question is required";
      }
      if (!values.back.trim()) {
        errors.back = "Answer is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`/api/flashcards/${deckId}/cards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to add card");

        form.reset();
        setSubmitError("");
        router.refresh();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Failed to add card";
        setSubmitError(errorMsg);
        throw error;
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="space-y-4">
      {submitError && (
        <FormError error={submitError} />
      )}

      <FormTextarea
        label="Question / Front"
        required
        value={form.values.front}
        onChange={(e) => form.setFieldValue("front", e.target.value)}
        onBlur={() => form.handleBlur("front")}
        placeholder="What is photosynthesis?"
        rows={3}
        error={form.touched.front ? form.errors.front : undefined}
      />

      <FormTextarea
        label="Answer / Back"
        required
        value={form.values.back}
        onChange={(e) => form.setFieldValue("back", e.target.value)}
        onBlur={() => form.handleBlur("back")}
        placeholder="The process by which plants convert sunlight into chemical energy..."
        rows={3}
        error={form.touched.back ? form.errors.back : undefined}
      />

      <FormInput
        label="Hint"
        type="text"
        value={form.values.hint}
        onChange={(e) => form.setFieldValue("hint", e.target.value)}
        placeholder="Think about energy from the sun..."
        helperText="Optional: A hint to help you remember this card"
      />

      <Button
        type="submit"
        disabled={form.isSubmitting || !form.values.front.trim() || !form.values.back.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
      >
        {form.isSubmitting ? "Adding..." : "Add Card"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormTextarea, FormInput } from "@/components/forms";

interface AddCardFormProps {
  deckId: string;
}

export function AddCardForm({ deckId }: AddCardFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
    hint: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/flashcards/${deckId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add card");

      setFormData({ front: "", back: "", hint: "" });
      router.refresh();
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to add card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormTextarea
        label="Question / Front"
        required
        value={formData.front}
        onChange={(e) =>
          setFormData({ ...formData, front: e.target.value })
        }
        placeholder="What is photosynthesis?"
        rows={3}
      />

      <FormTextarea
        label="Answer / Back"
        required
        value={formData.back}
        onChange={(e) =>
          setFormData({ ...formData, back: e.target.value })
        }
        placeholder="The process by which plants convert sunlight into chemical energy..."
        rows={3}
      />

      <FormInput
        label="Hint"
        type="text"
        value={formData.hint}
        onChange={(e) =>
          setFormData({ ...formData, hint: e.target.value })
        }
        placeholder="Think about energy from the sun..."
        helperText="Optional: A hint to help you remember this card"
      />

      <Button
        type="submit"
        disabled={loading || !formData.front.trim() || !formData.back.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Card"}
      </Button>
    </form>
  );
}

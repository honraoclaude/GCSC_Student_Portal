"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Question / Front
        </label>
        <textarea
          required
          value={formData.front}
          onChange={(e) =>
            setFormData({ ...formData, front: e.target.value })
          }
          placeholder="What is photosynthesis?"
          rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Answer / Back
        </label>
        <textarea
          required
          value={formData.back}
          onChange={(e) =>
            setFormData({ ...formData, back: e.target.value })
          }
          placeholder="The process by which plants convert sunlight into chemical energy..."
          rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Hint (optional)
        </label>
        <input
          type="text"
          value={formData.hint}
          onChange={(e) =>
            setFormData({ ...formData, hint: e.target.value })
          }
          placeholder="Think about energy from the sun..."
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

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

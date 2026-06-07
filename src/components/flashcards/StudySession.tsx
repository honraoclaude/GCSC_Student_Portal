"use client";

import { useState } from "react";
import { FlashcardCard } from "./FlashcardCard";
import { Button } from "@/components/ui/button";

interface Card {
  id: string;
  front: string;
  back: string;
  hint?: string | null;
}

interface StudySessionProps {
  deckId: string;
  initialCard: Card;
}

const QUALITY_RATINGS = [
  { value: 0, label: "Failed", color: "bg-red-500 hover:bg-red-600", desc: "Don't know" },
  { value: 1, label: "Hard", color: "bg-orange-500 hover:bg-orange-600", desc: "Very hard" },
  { value: 2, label: "Difficult", color: "bg-yellow-500 hover:bg-yellow-600", desc: "Forgot" },
  { value: 3, label: "OK", color: "bg-blue-500 hover:bg-blue-600", desc: "Hard but got it" },
  { value: 4, label: "Good", color: "bg-green-500 hover:bg-green-600", desc: "Easy" },
  { value: 5, label: "Easy", color: "bg-emerald-500 hover:bg-emerald-600", desc: "Very easy" },
];

export function StudySession({ deckId, initialCard }: StudySessionProps) {
  const [currentCard, setCurrentCard] = useState(initialCard);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  const handleRating = async (quality: number) => {
    if (loading || !isFlipped) {
      if (!isFlipped) alert("Please flip the card first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/flashcards/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: currentCard.id, quality }),
      });

      if (!res.ok) throw new Error("Failed to submit rating");

      setReviewCount((prev) => prev + 1);
      setIsFlipped(false);

      // In a real app, fetch next card from /api/flashcards/[deckId]/study
      // For now, just reset
      alert(`Great! Your card is scheduled for review. Keep going! 🎯`);
    } catch (error) {
      console.error("Rating error:", error);
      alert("Failed to save rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Cards reviewed</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {reviewCount}
          </p>
        </div>
        <div className="text-3xl">📚</div>
      </div>

      {/* Card */}
      <div>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Click the card to flip it
        </p>
        <FlashcardCard
          front={currentCard.front}
          back={currentCard.back}
          hint={currentCard.hint}
          onFlip={setIsFlipped}
        />
      </div>

      {/* Rating buttons */}
      <div>
        <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          How well did you know this?
        </p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {QUALITY_RATINGS.map(({ value, label, color, desc }) => (
            <button
              key={value}
              onClick={() => handleRating(value)}
              disabled={loading || !isFlipped}
              className={`rounded-lg px-4 py-3 font-medium text-white transition-all disabled:opacity-50 ${color}`}
              title={desc}
            >
              <div className="text-sm">{label}</div>
              <div className="text-xs opacity-90">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {!isFlipped && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            💡 Flip the card first to see the answer and rate it!
          </p>
        </div>
      )}
    </div>
  );
}

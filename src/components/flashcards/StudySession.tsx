"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  allCards?: Card[];
}

const QUALITY_RATINGS = [
  { value: 0, label: "Failed", color: "bg-red-500 hover:bg-red-600", desc: "Don't know" },
  { value: 1, label: "Hard", color: "bg-orange-500 hover:bg-orange-600", desc: "Very hard" },
  { value: 2, label: "Difficult", color: "bg-yellow-500 hover:bg-yellow-600", desc: "Forgot" },
  { value: 3, label: "OK", color: "bg-blue-500 hover:bg-blue-600", desc: "Hard but got it" },
  { value: 4, label: "Good", color: "bg-green-500 hover:bg-green-600", desc: "Easy" },
  { value: 5, label: "Easy", color: "bg-emerald-500 hover:bg-emerald-600", desc: "Very easy" },
];

export function StudySession({ deckId, initialCard, allCards = [] }: StudySessionProps) {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(initialCard);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [startTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  const cards = allCards.length > 0 ? allCards : [initialCard];
  const totalCards = cards.length;
  const progress = totalCards > 0 ? Math.round((reviewCount / totalCards) * 100) : 0;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setElapsedTime(Math.floor((now.getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Space to flip
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped(!isFlipped);
        return;
      }

      // 0-5 for ratings
      if (!isFlipped || loading) return;
      const key = e.key;
      if (key >= "0" && key <= "5") {
        handleRating(parseInt(key));
      }

      // Arrow keys for navigation
      if (e.key === "ArrowLeft") navigatePrevious();
      if (e.key === "ArrowRight") navigateNext();

      // Escape to exit
      if (e.key === "Escape") {
        router.push(`/learning-hub/flashcards/${deckId}`);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, loading, reviewCount, deckId, router]);

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

      // Auto navigate to next card
      if (currentCardIndex < cards.length - 1) {
        setTimeout(() => {
          setCurrentCardIndex((prev) => prev + 1);
          setCurrentCard(cards[currentCardIndex + 1]);
        }, 300);
      }
    } catch (error) {
      console.error("Rating error:", error);
      alert("Failed to save rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setCurrentCard(cards[currentCardIndex + 1]);
      setIsFlipped(false);
    }
  };

  const navigatePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setCurrentCard(cards[currentCardIndex - 1]);
      setIsFlipped(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Progress
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {reviewCount} / {totalCards}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Time Elapsed
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {formatTime(elapsedTime)}
            </p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card Number */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span>Card {currentCardIndex + 1}</span>
        <span className="text-slate-400 dark:text-slate-600">/</span>
        <span>{totalCards}</span>
      </div>

      {/* Card */}
      <div>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Press SPACE or click to flip • Press 0-5 to rate • Arrow keys to navigate
        </p>
        <div onClick={() => setIsFlipped(!isFlipped)}>
          <FlashcardCard
            front={currentCard.front}
            back={currentCard.back}
            hint={currentCard.hint}
            onFlip={setIsFlipped}
          />
        </div>
      </div>

      {/* Rating buttons */}
      <div className="space-y-4">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          How well did you know this? (or press 0-5)
        </p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {QUALITY_RATINGS.map(({ value, label, color, desc }) => (
            <button
              key={value}
              onClick={() => handleRating(value)}
              disabled={loading || !isFlipped}
              className={`rounded-lg px-4 py-3 font-medium text-white transition-all disabled:opacity-50 ${color} hover:scale-105 active:scale-95`}
              title={`${desc} (press ${value})`}
            >
              <div className="text-sm">{label}</div>
              <div className="text-xs opacity-90">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <Button
          onClick={navigatePrevious}
          disabled={currentCardIndex === 0 || loading}
          variant="outline"
          className="flex-1"
        >
          ← Previous
        </Button>
        <Button
          onClick={navigateNext}
          disabled={currentCardIndex === cards.length - 1 || loading}
          variant="outline"
          className="flex-1"
        >
          Next →
        </Button>
      </div>

      {/* Info messages */}
      {!isFlipped && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            💡 Flip the card (SPACE) to see the answer and rate it!
          </p>
        </div>
      )}

      {reviewCount === totalCards && totalCards > 0 && (
        <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4">
          <p className="text-sm text-green-900 dark:text-green-200 font-semibold mb-3">
            🎉 Great job! You've reviewed all {totalCards} cards in this session!
          </p>
          <Button
            onClick={() => router.push(`/learning-hub/flashcards/${deckId}`)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Return to Deck
          </Button>
        </div>
      )}
    </div>
  );
}

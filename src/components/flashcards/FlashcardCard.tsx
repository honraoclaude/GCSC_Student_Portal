"use client";

import { useState } from "react";

interface FlashcardCardProps {
  front: string;
  back: string;
  hint?: string | null;
  onFlip?: (isFlipped: boolean) => void;
}

export function FlashcardCard({ front, back, hint, onFlip }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="h-80 md:h-96 w-full cursor-pointer perspective hover:scale-105 transition-transform duration-200"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-gpu`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Blue gradient */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-blue-300 dark:border-blue-500 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-950 dark:via-blue-900 dark:to-indigo-900 p-8 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-4 right-4 text-2xl opacity-20">🎴</div>

          <p className="text-center text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Question
          </p>
          <p className="text-center text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {front}
          </p>

          {hint && (
            <div className="mt-6 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-3">
              <p className="text-xs text-yellow-900 dark:text-yellow-200 italic">
                💡 Hint: {hint}
              </p>
            </div>
          )}

          <p className="mt-8 text-xs text-blue-600 dark:text-blue-300 font-semibold animate-pulse">
            Click to reveal answer
          </p>
        </div>

        {/* Back - Purple gradient */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-purple-300 dark:border-purple-500 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-900 dark:to-purple-900 p-8 shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-4 right-4 text-2xl opacity-20">✓</div>

          <p className="text-center text-xl font-bold text-purple-900 dark:text-purple-100 mb-4">
            Answer
          </p>
          <p className="text-center text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {back}
          </p>

          <p className="mt-8 text-xs text-purple-600 dark:text-purple-300 font-semibold animate-pulse">
            Click to hide answer
          </p>
        </div>
      </div>
    </div>
  );
}

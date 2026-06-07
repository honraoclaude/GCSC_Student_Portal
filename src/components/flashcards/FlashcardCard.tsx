"use client";

import { useState } from "react";

interface FlashcardCardProps {
  front: string;
  back: string;
  hint?: string;
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
      className="h-64 w-full cursor-pointer perspective"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 transform-gpu ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-center text-lg font-semibold text-slate-900 dark:text-white">
            {front}
          </p>
          {hint && (
            <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 italic">
              💡 {hint}
            </p>
          )}
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
            Click to reveal answer →
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-green-400 dark:border-green-600 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-center text-lg font-semibold text-slate-900 dark:text-white">
            {back}
          </p>
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
            ← Click to hide answer
          </p>
        </div>
      </div>
    </div>
  );
}

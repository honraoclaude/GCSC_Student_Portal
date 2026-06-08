"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DeckCardProps {
  deckId: string;
  title: string;
  cardCount: number;
  masteryRate: number;
  lastStudied?: Date | null;
  subject: string;
}

export function DeckCard({
  deckId,
  title,
  cardCount,
  masteryRate,
  lastStudied,
  subject,
}: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getMasteryColor = (rate: number) => {
    if (rate >= 80) return "from-green-500 to-emerald-500";
    if (rate >= 60) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-orange-500";
  };

  const formatLastStudied = (date?: Date | null) => {
    if (!date) return "Never studied";
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 backdrop-blur-xl overflow-hidden transition-all hover:border-indigo-400/50 hover:shadow-xl hover:-translate-y-1 duration-200"
    >
      {/* Subject Color Banner */}
      <div
        className={`h-1 bg-gradient-to-r ${getMasteryColor(masteryRate)}`}
      />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subject}
            </p>
          </div>
          <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
            🎴
          </div>
        </div>

        {/* Card Count Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
          {cardCount} {cardCount === 1 ? "card" : "cards"}
        </div>

        {/* Mastery Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Mastery
            </p>
            <p
              className={`text-sm font-bold bg-gradient-to-r ${getMasteryColor(
                masteryRate
              )} bg-clip-text text-transparent`}
            >
              {masteryRate}%
            </p>
          </div>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getMasteryColor(
                masteryRate
              )} transition-all duration-500`}
              style={{ width: `${masteryRate}%` }}
            />
          </div>
        </div>

        {/* Last Studied */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {formatLastStudied(lastStudied)}
          </p>
        </div>

        {/* Study Button */}
        <Link href={`/learning-hub/flashcards/${deckId}/study`} className="block">
          <Button
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform group-hover:scale-105"
            disabled={cardCount === 0}
          >
            {cardCount === 0 ? "Add cards first" : "Study Now"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

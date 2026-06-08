"use client";

import { useEffect, useState } from "react";

interface FlashcardStatsProps {
  totalCards: number;
  masteryRate: number;
  totalStudied: number;
  currentStreak: number;
}

interface AnimatedStat {
  value: number;
  displayValue: number;
}

export function FlashcardStats({
  totalCards,
  masteryRate,
  totalStudied,
  currentStreak,
}: FlashcardStatsProps) {
  const [stats, setStats] = useState<{
    cards: AnimatedStat;
    mastery: AnimatedStat;
    studied: AnimatedStat;
    streak: AnimatedStat;
  }>({
    cards: { value: totalCards, displayValue: 0 },
    mastery: { value: masteryRate, displayValue: 0 },
    studied: { value: totalStudied, displayValue: 0 },
    streak: { value: currentStreak, displayValue: 0 },
  });

  useEffect(() => {
    const animationDuration = 1000;
    const startTime = Date.now();

    const animateStats = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setStats({
        cards: {
          value: totalCards,
          displayValue: Math.floor(totalCards * progress),
        },
        mastery: {
          value: masteryRate,
          displayValue: Math.floor(masteryRate * progress),
        },
        studied: {
          value: totalStudied,
          displayValue: Math.floor(totalStudied * progress),
        },
        streak: {
          value: currentStreak,
          displayValue: Math.floor(currentStreak * progress),
        },
      });

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      }
    };

    animateStats();
  }, [totalCards, masteryRate, totalStudied, currentStreak]);

  const statConfigs = [
    {
      label: "Total Cards",
      icon: "🎴",
      value: stats.cards.displayValue,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
      borderColor: "border-blue-200/30 dark:border-blue-200/20",
    },
    {
      label: "Mastery Rate",
      icon: "🎯",
      value: stats.mastery.displayValue,
      suffix: "%",
      color: "from-purple-500 to-pink-500",
      bgColor:
        "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
      borderColor: "border-purple-200/30 dark:border-purple-200/20",
    },
    {
      label: "Cards Studied",
      icon: "📊",
      value: stats.studied.displayValue,
      color: "from-green-500 to-emerald-500",
      bgColor:
        "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
      borderColor: "border-green-200/30 dark:border-green-200/20",
    },
    {
      label: "Study Streak",
      icon: "🔥",
      value: stats.streak.displayValue,
      suffix: " days",
      color: "from-amber-500 to-orange-500",
      bgColor:
        "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
      borderColor: "border-amber-200/30 dark:border-amber-200/20",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
      {statConfigs.map((stat, index) => (
        <div
          key={stat.label}
          style={{ animationDelay: `${index * 100}ms` }}
          className={`rounded-xl border ${stat.borderColor} bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl p-6 hover:border-opacity-50 transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
              <p
                className={`mt-3 text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
                {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
              </p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

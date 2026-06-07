interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
  const getMotivationalMessage = (streak: number): string => {
    if (streak === 0) return "Start your streak today! 🎯";
    if (streak === 1) return "Off to a great start! 💪";
    if (streak < 7) return "Building momentum! 🚀";
    if (streak < 14) return "That's a solid streak! 🔥";
    if (streak < 30) return "You're unstoppable! ⚡";
    return "You're a study legend! 👑";
  };

  return (
    <div className="rounded-lg border border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Current Streak
          </h3>
          <p className="mt-2 text-5xl font-bold text-orange-600 dark:text-orange-400">
            {currentStreak}
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            days in a row
          </p>
          <p className="mt-3 text-sm font-medium text-orange-700 dark:text-orange-300">
            {getMotivationalMessage(currentStreak)}
          </p>
        </div>
        <div className="text-7xl">🔥</div>
      </div>
      {longestStreak > currentStreak && (
        <div className="mt-4 border-t border-orange-200 dark:border-orange-900 pt-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Personal best: <span className="font-semibold text-orange-700 dark:text-orange-300">{longestStreak} days</span>
          </p>
        </div>
      )}
    </div>
  );
}

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
    <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 dark:from-orange-500/10 dark:to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 mb-6">
            <span className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
              🔥 Streak
            </span>
          </div>

          <div className="mb-8">
            <p className="text-7xl font-black bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">
              {currentStreak}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              days in a row
            </p>
          </div>

          <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">
            {getMotivationalMessage(currentStreak)}
          </p>

          {longestStreak > currentStreak && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Personal best:
                <span className="ml-2 font-bold text-slate-900 dark:text-white">
                  {longestStreak} days
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="text-8xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          🔥
        </div>
      </div>
    </div>
  );
}

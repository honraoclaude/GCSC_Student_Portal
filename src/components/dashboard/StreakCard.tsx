import { cardElevated, badgeWarning, textMuted, cn } from "@/styles";

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
    <div className={cn(
      "group relative p-8 overflow-hidden rounded-2xl border border-amber-200/30 dark:border-amber-200/20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 backdrop-blur-xl hover:border-amber-400/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/15 dark:to-amber-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-400/30 dark:from-amber-500/40 dark:to-orange-500/40 border border-amber-300/40 dark:border-amber-300/20 mb-6">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              🔥 Streak
            </span>
          </div>

          <div className="mb-8">
            <p className="text-7xl font-black bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent">
              {currentStreak}
            </p>
            <p className={cn("mt-2 text-sm font-semibold", textMuted)}>
              days in a row
            </p>
          </div>

          <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">
            {getMotivationalMessage(currentStreak)}
          </p>

          {longestStreak > currentStreak && (
            <div className="pt-6 border-t border-amber-200/30 dark:border-amber-200/20">
              <p className={cn("text-xs", textMuted)}>
                Personal best:
                <span className="ml-2 font-bold text-slate-900 dark:text-white">
                  {longestStreak} days
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="text-8xl opacity-60 group-hover:opacity-100 group-hover:scale-125 group-hover:animate-bounce-slow transition-all duration-300">
          🔥
        </div>
      </div>
    </div>
  );
}

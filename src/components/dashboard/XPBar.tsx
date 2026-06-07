import { cardElevated, badgePrimary, textMuted, cn } from "@/styles";

interface XPBarProps {
  currentXP: number;
  level: number;
}

function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function XPBar({ currentXP, level }: XPBarProps) {
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const progress = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  return (
    <div className={cn(
      "group relative p-8 overflow-hidden rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-xl hover:border-indigo-400/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/15 dark:to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 dark:from-indigo-500/40 dark:to-purple-500/40 border border-indigo-300/40 dark:border-indigo-300/20 mb-4">
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                ⭐ Level {level}
              </span>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Level {level}
            </p>
          </div>
          <div className="text-6xl opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:animate-bounce-slow transition-all duration-300">
            ⭐
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Progress to Level {level + 1}
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                {Math.floor(progress)}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50 border border-indigo-200/30 dark:border-indigo-200/20">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transition-all duration-700 ease-out shadow-lg shadow-indigo-500/50"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={cn("flex items-center justify-between text-xs pt-2", textMuted)}>
            <span className="font-medium">
              {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              {(xpNeededForNext - xpInCurrentLevel).toLocaleString()} to next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

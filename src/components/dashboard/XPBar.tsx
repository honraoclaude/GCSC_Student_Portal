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
    <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                ⭐ Level {level}
              </span>
            </div>
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              Level {level}
            </p>
          </div>
          <div className="text-6xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            ⭐
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Progress
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                {Math.floor(progress)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2">
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

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
    <div className="rounded-lg border border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Level {level}
          </h3>
          <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
            {Math.floor(progress)}%
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
          </p>
        </div>
        <div className="text-5xl">⭐</div>
      </div>

      <div className="mt-4">
        <div className="h-3 overflow-hidden rounded-full bg-purple-200 dark:bg-purple-900">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-600 dark:text-slate-400">
        <span>Level {level}</span>
        <span>Level {level + 1}</span>
      </div>
    </div>
  );
}

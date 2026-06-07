interface AchievementBadgeProps {
  emoji: string;
  name: string;
  description: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  xpReward: number;
  unlocked?: boolean;
}

const rarityColors = {
  common: "from-slate-400 to-slate-500",
  uncommon: "from-green-400 to-emerald-500",
  rare: "from-blue-400 to-indigo-500",
  epic: "from-purple-400 to-pink-500",
  legendary: "from-amber-400 to-orange-500",
};

const rarityBorders = {
  common: "border-slate-400",
  uncommon: "border-green-400",
  rare: "border-blue-400",
  epic: "border-purple-400",
  legendary: "border-amber-400",
};

export function AchievementBadge({
  emoji,
  name,
  description,
  rarity,
  xpReward,
  unlocked = true,
}: AchievementBadgeProps) {
  return (
    <div
      className={`relative rounded-xl p-6 text-center transition-all ${
        unlocked
          ? `bg-gradient-to-br ${rarityColors[rarity]} border-2 ${rarityBorders[rarity]} shadow-lg hover:shadow-xl hover:scale-105`
          : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-2 border-slate-400 dark:border-slate-600 opacity-50"
      }`}
    >
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className={`font-bold text-lg ${unlocked ? "text-white" : "text-slate-600 dark:text-slate-400"}`}>
        {name}
      </h3>
      <p className={`text-sm mt-1 ${unlocked ? "text-white/90" : "text-slate-600 dark:text-slate-500"}`}>
        {description}
      </p>
      {unlocked && (
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-white">
          +{xpReward} XP
        </div>
      )}
      {!unlocked && (
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-400/30 text-xs font-semibold text-slate-700 dark:text-slate-400">
          Locked
        </div>
      )}
    </div>
  );
}

import { cn } from "@/styles";

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
      className={cn(
        "group relative rounded-2xl p-6 text-center transition-all duration-300 backdrop-blur-xl animate-fade-in-up",
        unlocked
          ? cn(
              `bg-gradient-to-br ${rarityColors[rarity]}`,
              `border-2 ${rarityBorders[rarity]}`,
              "shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
            )
          : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-2 border-slate-400 dark:border-slate-600 opacity-50 hover:opacity-60"
      )}
    >
      <div className={cn(
        "text-6xl mb-3 transition-transform duration-300",
        unlocked ? "group-hover:scale-125 group-hover:animate-bounce-slow" : ""
      )}>
        {emoji}
      </div>
      <h3 className={cn(
        "font-bold text-lg transition-all",
        unlocked ? "text-white group-hover:text-white/95" : "text-slate-600 dark:text-slate-400"
      )}>
        {name}
      </h3>
      <p className={cn(
        "text-sm mt-1 transition-all",
        unlocked ? "text-white/90" : "text-slate-600 dark:text-slate-500"
      )}>
        {description}
      </p>
      {unlocked && (
        <div className="mt-3 inline-block px-3 py-1.5 rounded-full bg-white/25 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/35 transition-all">
          +{xpReward} XP
        </div>
      )}
      {!unlocked && (
        <div className="mt-3 inline-block px-3 py-1.5 rounded-full bg-slate-400/40 text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
          Locked
        </div>
      )}
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { ACHIEVEMENTS } from "@/lib/gamification/achievements";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { StatCard } from "@/components/cards";

export default async function AchievementsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: true,
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const unlockedSlugs = user.achievements.map((a) => a.achievement.slug);
  const allAchievements = Object.values(ACHIEVEMENTS);
  const unlockedAchievements = allAchievements.filter((a) =>
    unlockedSlugs.includes(a.slug)
  );
  const lockedAchievements = allAchievements.filter(
    (a) => !unlockedSlugs.includes(a.slug)
  );

  const totalXpFromAchievements = unlockedAchievements.reduce(
    (sum, a) => sum + a.xpReward,
    0
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          🏆 Achievements
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Unlock badges and celebrate your learning milestones
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Unlocked"
          value={unlockedAchievements.length}
          icon="🎯"
          colorClass="from-indigo-500 to-blue-500"
        />
        <StatCard
          label="Total Achievements"
          value={allAchievements.length}
          icon="🏅"
          colorClass="from-amber-500 to-orange-500"
        />
        <StatCard
          label="XP Earned"
          value={totalXpFromAchievements}
          icon="⭐"
          colorClass="from-purple-500 to-pink-500"
        />
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ✨ Unlocked Badges
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {unlockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.slug}
                {...achievement}
                unlocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            🔒 Locked Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Keep studying to unlock these badges!
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.slug}
                {...achievement}
                unlocked={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

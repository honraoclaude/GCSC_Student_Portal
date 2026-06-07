import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { ACHIEVEMENTS } from "@/lib/gamification/achievements";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";

export default async function AchievementsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          achievements: true,
        },
      },
    },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const unlockedSlugs = user.studentProfile.achievements.map((a) => a.achievementSlug);
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
        {[
          {
            label: "Unlocked",
            value: unlockedAchievements.length,
            icon: "🎯",
            color: "from-indigo-500 to-blue-500",
          },
          {
            label: "Total Achievements",
            value: allAchievements.length,
            icon: "🏅",
            color: "from-amber-500 to-orange-500",
          },
          {
            label: "XP Earned",
            value: totalXpFromAchievements,
            icon: "⭐",
            color: "from-purple-500 to-pink-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
                <p className={`mt-2 text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
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

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserWithProfile, getUserAchievements } from "@/lib/db";
import { ACHIEVEMENTS } from "@/lib/gamification/achievements";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { StatCard } from "@/components/cards";

export default async function AchievementsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserWithProfile(userId);

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const userAchievements = await getUserAchievements(userId);
  const unlockedSlugs = userAchievements.map((a) => a.achievement.slug);
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
    <PageLayout
      title="🏆 Achievements"
      description="Unlock badges and celebrate your learning milestones"
    >
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
        <SectionCard
          title="✨ Unlocked Badges"
          description={`You've unlocked ${unlockedAchievements.length} badges! Keep it up!`}
          variant="glass"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {unlockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.slug}
                {...achievement}
                unlocked={true}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <SectionCard
          title="🔒 Locked Achievements"
          description="Keep studying to unlock these badges!"
          variant="glass"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.slug}
                {...achievement}
                unlocked={false}
              />
            ))}
          </div>
        </SectionCard>
      )}
    </PageLayout>
  );
}

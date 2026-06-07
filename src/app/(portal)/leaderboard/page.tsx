import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserWithProfile, getLeaderboard, getUserLeaderboardRank } from "@/lib/db";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";

export default async function LeaderboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserWithProfile(userId);

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const topStudents = await getLeaderboard(50);
  const userRank = await getUserLeaderboardRank(user.studentProfile.id, 50);

  return (
    <PageLayout
      title="🏆 Leaderboard"
      description="Top students by XP earned"
    >
      {/* Your Rank */}
      <SectionCard variant="glass">
        <div className="text-center space-y-2">
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            YOUR RANK
          </p>
          <div className="flex items-baseline justify-center gap-3">
            <p className="text-5xl font-bold text-indigo-900 dark:text-indigo-100">
              {userRank ? `#${userRank}` : "Unranked"}
            </p>
            <p className="text-3xl font-bold text-slate-600 dark:text-slate-400">
              {user.studentProfile.totalXP} XP
            </p>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            Level {user.studentProfile.level}
          </p>
        </div>
      </SectionCard>

      {/* Leaderboard Table */}
      <SectionCard
        title="Top 50 Students"
        variant="glass"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Student
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  Level
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                  XP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 dark:divide-white/10">
              {topStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`hover:bg-white/5 dark:hover:bg-white/5 transition-colors ${
                    student.id === user.studentProfile!.id
                      ? "bg-indigo-50/20 dark:bg-indigo-950/20"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {student.displayName}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {student.user?.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                      Lvl {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {student.totalXP.toLocaleString()} XP
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Info */}
      <div className="rounded-xl border border-slate-200/30 dark:border-slate-200/20 bg-slate-50/50 dark:bg-slate-950/50 p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          💡 The leaderboard updates based on XP earned from studying, completing flashcards, and AI conversations. Keep up your streak to climb the ranks!
        </p>
      </div>
    </PageLayout>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function LeaderboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { studentProfile: true },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  // Get top 50 students this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const topStudents = await prisma.studentProfile.findMany({
    include: {
      user: true,
      _count: {
        select: { xpEvents: true },
      },
    },
    orderBy: {
      totalXP: "desc",
    },
    take: 50,
  });

  const userRank = topStudents.findIndex(
    (s) => s.id === user.studentProfile.id
  ) + 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          🏆 Leaderboard
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Top students by XP earned
        </p>
      </div>

      {/* Your Rank */}
      <div className="rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur p-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            YOUR RANK
          </p>
          <div className="flex items-baseline justify-center gap-3">
            <p className="text-5xl font-bold text-indigo-900 dark:text-indigo-100">
              {userRank <= 50 ? `#${userRank}` : "Unranked"}
            </p>
            <p className="text-3xl font-bold text-slate-600 dark:text-slate-400">
              {user.studentProfile.totalXP} XP
            </p>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            Level {user.studentProfile.level}
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Top 50 Students
        </h2>
        <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur overflow-hidden shadow-xl">
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
                      student.id === user.studentProfile.id
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
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-slate-200/30 dark:border-slate-200/20 bg-slate-50/50 dark:bg-slate-950/50 p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          💡 The leaderboard updates based on XP earned from studying, completing flashcards, and AI conversations. Keep up your streak to climb the ranks!
        </p>
      </div>
    </div>
  );
}

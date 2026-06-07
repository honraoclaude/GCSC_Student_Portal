import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
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

  const profile = user.studentProfile;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome, {profile.displayName}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Your personal academic command center
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            🔥 Streak
          </h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {profile.currentStreak}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            days in a row
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            ⭐ Level
          </h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {profile.level}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {profile.totalXP} XP total
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            📚 Subjects
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            enrolled subjects
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          👋 Welcome to GCSC Student Hub! Start by selecting your subjects to
          unlock personalized AI tutoring and study planning.
        </p>
      </div>
    </div>
  );
}

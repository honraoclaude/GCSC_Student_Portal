import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { XPBar } from "@/components/dashboard/XPBar";
import { SubjectCard } from "@/components/dashboard/SubjectCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          subjectEnrollments: true,
        },
      },
    },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const profile = user.studentProfile;
  const subjects = profile.subjectEnrollments || [];

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

      <div className="grid gap-6 lg:grid-cols-2">
        <StreakCard currentStreak={profile.currentStreak} longestStreak={profile.longestStreak} />
        <XPBar currentXP={profile.totalXP} level={profile.level} />
      </div>

      {subjects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Your Subjects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((enrollment) => (
              <SubjectCard
                key={enrollment.id}
                subject={enrollment.subject}
                targetGrade={enrollment.targetGrade}
              />
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          💡 Tip: Click on any subject to chat with your AI tutor and get personalized help!
        </p>
      </div>
    </div>
  );
}

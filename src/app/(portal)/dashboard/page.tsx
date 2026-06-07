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
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white">
          Welcome back, {profile.displayName.split(" ")[0]}! 👋
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
          Your personal academic command center
        </p>
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          📊 Your Progress
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <StreakCard currentStreak={profile.currentStreak} longestStreak={profile.longestStreak} />
          <XPBar currentXP={profile.totalXP} level={profile.level} />
        </div>
      </div>

      {/* Subjects Section */}
      {subjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              📚 {subjects.length} Enrolled Subject{subjects.length !== 1 ? "s" : ""}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

      {/* CTA Section */}
      <div className="relative rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        <div className="relative z-10">
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </p>
          <p className="text-blue-900 dark:text-blue-200">
            Click on any subject card above to chat with your AI tutor. Get personalized explanations, study plans, and practice questions tailored to your learning style!
          </p>
        </div>
      </div>
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserWithProfile, getStudentEnrolledSubjects } from "@/lib/db";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { XPBar } from "@/components/dashboard/XPBar";
import { SubjectCard } from "@/components/dashboard/SubjectCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserWithProfile(userId);

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const profile = user.studentProfile;
  const subjects = await getStudentEnrolledSubjects(profile.id);
  const firstName = profile.displayName.split(" ")[0];

  return (
    <div className="space-y-12">
      {/* ===== HERO SECTION ===== */}
      <div className="relative rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur p-12 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mt-4">
              Your personal academic command center — track progress, master subjects, and unlock your potential
            </p>
          </div>

          {/* Quick stats in hero */}
          <div className="grid gap-4 md:grid-cols-3 pt-4">
            <div className="rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur px-4 py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Current Level</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Lvl {profile.level}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur px-4 py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total XP</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{profile.totalXP.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-white/10 backdrop-blur px-4 py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Study Streak</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{profile.currentStreak} 🔥</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PROGRESS STATS SECTION ===== */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📊 Your Progress</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <StreakCard
            currentStreak={profile.currentStreak}
            longestStreak={profile.longestStreak}
          />
          <XPBar currentXP={profile.totalXP} level={profile.level} />
        </div>
      </div>

      {/* ===== SUBJECTS SECTION ===== */}
      {subjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            📚 {subjects.length} Enrolled Subject{subjects.length !== 1 ? "s" : ""}
          </h2>
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

      {/* ===== QUICK ACTIONS ===== */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">⚡ Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* AI Tutors */}
          <Link href="/agents/success">
            <div className="group rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6 hover:border-indigo-400/50 dark:hover:border-indigo-400/50 transition-all cursor-pointer hover:shadow-lg">
              <p className="text-3xl mb-3">🤖</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                AI Tutors
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Chat with your personal AI tutors
              </p>
            </div>
          </Link>

          {/* Flashcards */}
          <Link href="/learning-hub/flashcards">
            <div className="group rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6 hover:border-purple-400/50 dark:hover:border-purple-400/50 transition-all cursor-pointer hover:shadow-lg">
              <p className="text-3xl mb-3">🎴</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Flashcards
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Learn with spaced repetition
              </p>
            </div>
          </Link>

          {/* Learning Hub */}
          <Link href="/learning-hub">
            <div className="group rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6 hover:border-green-400/50 dark:hover:border-green-400/50 transition-all cursor-pointer hover:shadow-lg">
              <p className="text-3xl mb-3">📚</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Learning Hub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                All learning resources
              </p>
            </div>
          </Link>

          {/* Achievements */}
          <Link href="/achievements">
            <div className="group rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6 hover:border-amber-400/50 dark:hover:border-amber-400/50 transition-all cursor-pointer hover:shadow-lg">
              <p className="text-3xl mb-3">🏆</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Achievements
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                View your badges & stats
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* ===== PRO TIP ===== */}
      <div className="relative rounded-2xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-950/40 backdrop-blur p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        <div className="relative z-10">
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </p>
          <p className="text-blue-900 dark:text-blue-200 mb-4">
            Start with a subject card to chat with your AI tutor for personalized explanations. Then create flashcard decks to reinforce learning with spaced repetition. Check the leaderboard to see how you rank against other students!
          </p>
          <div className="flex gap-3">
            <Link href="/agents/success">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Tutoring →
              </Button>
            </Link>
            <Link href="/learning-hub/flashcards/new">
              <Button variant="secondary" className="border-blue-300 dark:border-blue-600">
                Create Deck
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

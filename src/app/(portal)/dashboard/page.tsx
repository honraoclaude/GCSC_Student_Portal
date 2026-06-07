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
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">📊 Your Progress</h2>
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
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            📚 {subjects.length} Enrolled Subject{subjects.length !== 1 ? "s" : ""}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((enrollment, idx) => (
              <div key={enrollment.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fade-in-up">
                <SubjectCard
                  subject={enrollment.subject}
                  targetGrade={enrollment.targetGrade}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== QUICK ACTIONS ===== */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">⚡ Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Success Coach */}
          <Link href="/agents/success">
            <div className="group rounded-xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-xl p-4 hover:border-indigo-400/50 dark:hover:border-indigo-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-indigo-500/15 hover:to-purple-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">🎯</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">
                Success Coach
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Study plans
              </p>
            </div>
          </Link>

          {/* Revision Planner */}
          <Link href="/agents/revision">
            <div className="group rounded-xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-xl p-4 hover:border-blue-400/50 dark:hover:border-blue-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-500/15 hover:to-cyan-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">🔄</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                Revision Planner
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Exam prep
              </p>
            </div>
          </Link>

          {/* Exam Coach */}
          <Link href="/agents/exam-prep">
            <div className="group rounded-xl border border-green-200/30 dark:border-green-200/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 backdrop-blur-xl p-4 hover:border-green-400/50 dark:hover:border-green-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-green-500/15 hover:to-emerald-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📝</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-sm">
                Exam Coach
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Mock exams
              </p>
            </div>
          </Link>

          {/* Flashcards */}
          <Link href="/learning-hub/flashcards">
            <div className="group rounded-xl border border-purple-200/30 dark:border-purple-200/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl p-4 hover:border-purple-400/50 dark:hover:border-purple-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-500/15 hover:to-pink-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">🎴</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                Flashcards
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Spaced repetition
              </p>
            </div>
          </Link>

          {/* Practice Papers */}
          <Link href="/learning-hub/practice-papers">
            <div className="group rounded-xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl p-4 hover:border-emerald-400/50 dark:hover:border-emerald-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-emerald-500/15 hover:to-teal-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📋</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm">
                Practice Papers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Mock exams
              </p>
            </div>
          </Link>

          {/* Achievements */}
          <Link href="/achievements">
            <div className="group rounded-xl border border-amber-200/30 dark:border-amber-200/20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 backdrop-blur-xl p-4 hover:border-amber-400/50 dark:hover:border-amber-400/50 transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-amber-500/15 hover:to-orange-500/15">
              <p className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">🏆</p>
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-sm">
                Achievements
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Badges & stats
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

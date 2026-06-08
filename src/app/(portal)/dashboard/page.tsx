import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserWithProfile, getStudentEnrolledSubjects } from "@/lib/db";
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

  const quickActions = [
    { icon: "🤖", label: "AI Tutor", href: "/agents/tutor/maths", color: "from-red-500 to-orange-500" },
    { icon: "🎴", label: "Flashcards", href: "/learning-hub/flashcards", color: "from-orange-500 to-amber-500" },
    { icon: "📊", label: "Progress", href: "/progress", color: "from-amber-500 to-yellow-500" },
    { icon: "👥", label: "Find Tutor", href: "/marketplace", color: "from-teal-500 to-cyan-500" },
    { icon: "🏆", label: "Achievements", href: "/achievements", color: "from-pink-500 to-red-500" },
    { icon: "⭐", label: "Leaderboard", href: "/leaderboard", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <div className="space-y-12">
      {/* ===== PREMIUM HERO SECTION ===== */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-teal-500 dark:from-red-700 dark:via-orange-600 dark:to-teal-600"></div>

        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 md:p-16 text-white">
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                Welcome back, <br className="hidden md:block" /> {firstName}! 👋
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Your AI-powered learning command center. Track progress, master subjects, and achieve your GCSE goals.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3 pt-4">
              {/* Level Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 group-hover:from-white/30 group-hover:to-white/20"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wider">Current Level</p>
                  <p className="text-5xl font-bold text-white">Lvl {profile.level}</p>
                  <p className="text-white/70 text-sm mt-2">{profile.totalXP.toLocaleString()} XP total</p>
                </div>
              </div>

              {/* XP Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 group-hover:from-white/30 group-hover:to-white/20"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wider">Total XP</p>
                  <p className="text-5xl font-bold text-white">{(profile.totalXP).toLocaleString()}</p>
                  <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full"
                      style={{ width: `${Math.min((profile.totalXP % 1000) / 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Streak Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 group-hover:from-white/30 group-hover:to-white/20"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wider">🔥 Streak</p>
                  <p className="text-5xl font-bold text-white">{profile.currentStreak}</p>
                  <p className="text-white/70 text-sm mt-2">Keep it going!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS SECTION ===== */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">⚡ Quick Actions</h2>
          <p className="text-slate-600 dark:text-slate-400">Jump into your favorite features</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div className={`group relative h-full rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color}`}></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center text-white">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <h3 className="font-bold text-lg">{action.label}</h3>
                  <div className="absolute bottom-0 left-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== SUBJECTS SECTION ===== */}
      {subjects.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              📚 Your Subjects ({subjects.length})
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Track your progress in each subject</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((enrollment, idx) => (
              <div
                key={enrollment.id}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="animate-fade-in"
              >
                <SubjectCard
                  subject={enrollment.subject}
                  targetGrade={enrollment.targetGrade}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== STUDY TIPS SECTION ===== */}
      <div className="rounded-3xl border-2 border-orange-200/50 dark:border-orange-700/30 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">💡 Study Tips for Today</h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span>Review one subject daily for better retention</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span>Use flashcards for 20-30 minute sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span>Ask your AI tutor when you get stuck</span>
              </li>
            </ul>
          </div>
          <div className="text-6xl text-center">📖</div>
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to boost your grades? 🚀</h3>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with expert tutors or dive into AI-powered learning. Your success is just a click away.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/marketplace">
            <Button className="bg-white text-teal-600 hover:bg-white/90 font-bold px-8 py-6 text-lg h-auto">
              Find a Tutor
            </Button>
          </Link>
          <Link href="/learning-hub">
            <Button variant="secondary" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg h-auto">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

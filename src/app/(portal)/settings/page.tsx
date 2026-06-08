import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserWithProfile } from "@/lib/db";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await getUserWithProfile(userId);

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const settingsCategories = [
    {
      title: "Profile Settings",
      description: "Manage your profile information and personal details",
      icon: "👤",
      href: "/settings/profile",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Notifications",
      description: "Control email and push notification preferences",
      icon: "🔔",
      href: "/settings/notifications",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Privacy & Data",
      description: "Manage privacy settings and data export options",
      icon: "🔒",
      href: "/settings/privacy",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Appearance",
      description: "Customize theme and UI preferences",
      icon: "🎨",
      href: "/settings/appearance",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <PageLayout
      title="⚙️ Settings"
      description="Manage your account, preferences, and privacy settings"
    >
      {/* Settings Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8 animate-fade-in-up">
        {settingsCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group"
          >
            <SectionCard
              variant="glass"
              className="h-full hover:shadow-xl hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Configure</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </SectionCard>
          </Link>
        ))}
      </div>

      {/* Account Info */}
      <SectionCard
        title="Account Information"
        icon="ℹ️"
        variant="glass"
        className="border-slate-200/30 dark:border-slate-200/20"
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                Display Name
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {user.studentProfile.displayName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                Email
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white break-all">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                Year Group
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {user.studentProfile.yearGroup || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                School
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {user.studentProfile.school || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Help & Support */}
      <SectionCard
        title="Help & Support"
        icon="❓"
        variant="glass"
        className="border-slate-200/30 dark:border-slate-200/20"
      >
        <div className="space-y-3">
          <a
            href="https://github.com/honraoclaude/GCSC_STUDENT_Portal/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Report an Issue</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Help us improve by reporting bugs</p>
            </div>
            <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">→</span>
          </a>
          <a
            href="https://github.com/honraoclaude/GCSC_STUDENT_Portal/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Send Feedback</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Share your suggestions and ideas</p>
            </div>
            <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">→</span>
          </a>
        </div>
      </SectionCard>

      {/* About */}
      <SectionCard
        title="About"
        icon="📱"
        variant="glass"
        className="border-slate-200/30 dark:border-slate-200/20"
      >
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-between">
            <span>Application Version</span>
            <span className="font-semibold text-slate-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Build Date</span>
            <span className="font-semibold text-slate-900 dark:text-white">June 2024</span>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              GCSC Student Portal - Your personal learning companion powered by AI. Built with ❤️ for students everywhere.
            </p>
          </div>
        </div>
      </SectionCard>
    </PageLayout>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";
import { buttonPrimary, cn } from "@/styles";

export default function LearningHubPage() {
  return (
    <PageLayout
      title="Learning Hub"
      description="Master GCSE subjects with AI tutoring, spaced repetition flashcards, and personalized learning paths"
    >
      {/* Hero Badge */}
      <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 mb-4">
        <span className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Your Learning Journey ✨
        </span>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Flashcards - Active */}
        <Link href="/learning-hub/flashcards">
          <SectionCard
            icon="🎴"
            title="Flashcards"
            description="SM-2 spaced repetition algorithm for optimal learning"
            variant="glass"
            className="group relative p-8 cursor-pointer overflow-hidden h-full hover:border-indigo-400/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                <span>Start studying</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </SectionCard>
        </Link>

        {/* Notes - Coming Soon */}
        <div className="relative rounded-2xl border border-slate-400/20 dark:border-slate-400/10 bg-gradient-to-br from-slate-300/10 to-slate-400/10 dark:from-slate-600/10 dark:to-slate-700/10 backdrop-blur p-8 opacity-50 cursor-not-allowed overflow-hidden h-full">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent" />
          <div className="relative z-10 space-y-4">
            <div className="text-6xl opacity-70">📝</div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-300 mb-2">
                Notes
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Rich text notes with formatting and organization
              </p>
            </div>
            <div className="inline-block px-4 py-2 rounded-lg bg-slate-400/30 dark:bg-slate-600/30 text-xs font-bold text-slate-700 dark:text-slate-300">
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <SectionCard
        title="Why use the Learning Hub?"
        variant="glass"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "📊", title: "SM-2 Algorithm", desc: "Scientifically-proven spaced repetition scheduling" },
            { icon: "⚡", title: "Smart Scheduling", desc: "Difficult cards appear more often for better retention" },
            { icon: "📈", title: "Progress Tracking", desc: "See your learning progress and earn XP rewards" },
          ].map((feature, i) => (
            <div key={i} className="space-y-3">
              <p className="text-4xl">{feature.icon}</p>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* CTA Section */}
      <div className="relative rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur p-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-100">
            Ready to ace your GCSEs?
          </h3>
          <p className="text-lg text-indigo-800 dark:text-indigo-200 max-w-2xl mx-auto">
            Create your first flashcard deck and join thousands of students using spaced repetition to master their subjects
          </p>
          <Link href="/learning-hub/flashcards/new">
            <Button className={cn(buttonPrimary, "px-8 py-3")}>
              Create Your First Deck
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LearningHubPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          📚 Learning Hub
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Everything you need to learn and revise
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Flashcards */}
        <Link href="/learning-hub/flashcards">
          <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 dark:from-indigo-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="text-5xl mb-4">🎴</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Flashcards
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Create decks and learn with spaced repetition (SM-2 algorithm)
              </p>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                <span>Start studying</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Notes (Coming Soon) */}
        <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 shadow-sm opacity-60 cursor-not-allowed">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Notes
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Create and organize study notes with formatting
            </p>
            <div className="inline-block px-3 py-1 rounded-lg bg-slate-300 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Features
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-2xl mb-2">📊</p>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              SM-2 Algorithm
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Optimal review scheduling based on how well you know each card
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-2xl mb-2">⏰</p>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Smart Scheduling
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cards you struggle with appear more frequently
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-2xl mb-2">📈</p>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Progress Tracking
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              See your learning progress and earn XP
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 p-8 text-center">
        <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">
          Ready to start learning?
        </h3>
        <p className="text-indigo-800 dark:text-indigo-200 mb-6">
          Create your first flashcard deck and start studying with spaced repetition
        </p>
        <Link href="/learning-hub/flashcards/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
            Create First Deck
          </Button>
        </Link>
      </div>
    </div>
  );
}

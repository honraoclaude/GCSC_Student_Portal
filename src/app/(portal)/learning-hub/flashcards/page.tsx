import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { FlashcardDeck } from "@/components/flashcards/FlashcardDeck";
import { Button } from "@/components/ui/button";

export default async function FlashcardsHubPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          flashcardDecks: {
            include: {
              cards: true,
            },
          },
        },
      },
    },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const decks = user.studentProfile.flashcardDecks || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              📚 Flashcards
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Create decks and master any subject with SM-2 spaced repetition
            </p>
          </div>
          <Link href="/learning-hub/flashcards/new">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              + New Deck
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      {decks.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Total Decks", value: decks.length, icon: "📚", color: "from-indigo-500 to-blue-500" },
            { label: "Total Cards", value: decks.reduce((sum, d) => sum + d.cards.length, 0), icon: "🎴", color: "from-purple-500 to-indigo-500" },
            { label: "Study Ready", value: decks.filter((d) => d.cards.length > 0).length, icon: "✅", color: "from-green-500 to-emerald-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur p-6 hover:border-white/20 dark:hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </p>
                  <p className={`mt-2 text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decks Grid */}
      {decks.length > 0 ? (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-4">
            Your Decks
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <FlashcardDeck
                key={deck.id}
                id={deck.id}
                title={deck.title}
                subject={deck.subject}
                cardCount={deck.cards.length}
                createdAt={deck.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-12 text-center">
          <p className="text-2xl mb-2">🎴</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No decks yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Create your first flashcard deck to start learning with spaced repetition
          </p>
          <Link href="/learning-hub/flashcards/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Create Your First Deck
            </Button>
          </Link>
        </div>
      )}

      {/* Info Section */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
          💡 How Spaced Repetition Works
        </h3>
        <ul className="space-y-2 text-blue-900 dark:text-blue-200 text-sm">
          <li>
            <strong>Easy cards:</strong> Reviewed in 3 days
          </li>
          <li>
            <strong>Medium cards:</strong> Reviewed in 1 day
          </li>
          <li>
            <strong>Difficult cards:</strong> Reviewed tomorrow
          </li>
          <li>
            <strong>SM-2 Algorithm:</strong> Automatically adjusts intervals based on how well you know each card
          </li>
        </ul>
      </div>
    </div>
  );
}

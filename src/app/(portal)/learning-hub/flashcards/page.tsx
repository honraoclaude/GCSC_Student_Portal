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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              📚 Flashcards
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Create decks and study with spaced repetition
            </p>
          </div>
          <Link href="/learning-hub/flashcards/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              + New Deck
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      {decks.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Total Decks
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {decks.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Total Cards
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {decks.reduce((sum, d) => sum + d.cards.length, 0)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Study Ready
            </p>
            <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
              {decks.filter((d) => d.cards.length > 0).length}
            </p>
          </div>
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

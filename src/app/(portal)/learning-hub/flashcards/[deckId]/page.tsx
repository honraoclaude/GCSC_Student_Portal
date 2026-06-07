import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { AddCardForm } from "@/components/flashcards/AddCardForm";

interface PageProps {
  params: Promise<{ deckId: string }>;
}

export default async function DeckDetailPage({ params }: PageProps) {
  const { deckId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { studentProfile: true },
  });

  if (!user?.studentProfile) {
    redirect("/onboarding");
  }

  const deck = await prisma.flashcardDeck.findUnique({
    where: { id: deckId },
    include: { cards: true },
  });

  if (!deck || deck.studentProfileId !== user.studentProfile.id) {
    redirect("/learning-hub/flashcards");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 animate-fade-in">
        <Link
          href="/learning-hub/flashcards"
          className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 inline-flex items-center gap-1 transition-all hover:gap-2"
        >
          ← Back to Decks
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              {deck.title}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">
              {deck.subject.replace(/_/g, " ")}
            </p>
            {deck.description && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {deck.description}
              </p>
            )}
          </div>
          {deck.cards.length > 0 && (
            <Link href={`/learning-hub/flashcards/${deckId}/study`}>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Study Now 🚀
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 animate-fade-in-up">
        <div className="rounded-xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-xl p-6 hover:border-indigo-400/50 transition-all hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Cards in Deck
          </p>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {deck.cards.length}
          </p>
        </div>
        <div className="rounded-xl border border-green-200/30 dark:border-green-200/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 backdrop-blur-xl p-6 hover:border-green-400/50 transition-all hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Ready to Study
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            {deck.cards.length > 0 ? "✓" : "Add cards first"}
          </p>
        </div>
      </div>

      {/* Add Card Form */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Add Card
        </h2>
        <AddCardForm deckId={deckId} />
      </div>

      {/* Cards List */}
      {deck.cards.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Cards ({deck.cards.length})
          </h2>
          <div className="space-y-3">
            {deck.cards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 flex-shrink-0">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white break-words">
                      {card.front}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 break-words">
                      {card.back}
                    </p>
                    {card.hint && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500 italic">
                        💡 {card.hint}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-12 text-center">
          <p className="text-2xl mb-2">🎴</p>
          <p className="text-slate-600 dark:text-slate-400">
            No cards yet. Add one above to get started!
          </p>
        </div>
      )}
    </div>
  );
}

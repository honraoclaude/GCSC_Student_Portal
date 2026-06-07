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
      <div className="space-y-4">
        <Link
          href="/learning-hub/flashcards"
          className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 inline-block"
        >
          ← Back to Decks
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {deck.title}
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
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
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Study Now
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Cards in Deck
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {deck.cards.length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
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

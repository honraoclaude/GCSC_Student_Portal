import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";
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
    <PageLayout
      title={deck.title}
      description={deck.description || `Study ${deck.subject.replace(/_/g, " ")} with ${deck.cards.length} flashcards`}
      actions={
        deck.cards.length > 0 && (
          <Link href={`/learning-hub/flashcards/${deckId}/study`}>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Study Now 🚀
            </Button>
          </Link>
        )
      }
    >
      {/* Back Button */}
      <Link
        href="/learning-hub/flashcards"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors mb-6 inline-flex items-center gap-1"
      >
        ← Back to Decks
      </Link>
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 animate-fade-in mt-6">
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
            Status
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            {deck.cards.length > 0 ? "Ready" : "No cards"}
          </p>
        </div>
      </div>

      {/* Add Card Form */}
      <SectionCard
        title="Add Card"
        description="Create a new flashcard for this deck"
        variant="glass"
      >
        <AddCardForm deckId={deckId} />
      </SectionCard>

      {/* Cards List */}
      {deck.cards.length > 0 ? (
        <SectionCard
          title="Cards"
          description={`${deck.cards.length} ${deck.cards.length === 1 ? "card" : "cards"} in this deck`}
          variant="glass"
        >
          <div className="space-y-3">
            {deck.cards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 hover:border-indigo-400/50 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0">
                    <span className="text-sm font-bold text-white">
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
        </SectionCard>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-12 text-center">
          <p className="text-2xl mb-2">🎴</p>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No cards yet. Add one above to get started!
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Tip: You can add multiple cards to build a complete deck for studying.
          </p>
        </div>
      )}
    </PageLayout>
  );
}

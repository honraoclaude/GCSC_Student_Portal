import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { StudySession } from "@/components/flashcards/StudySession";

interface PageProps {
  params: Promise<{ deckId: string }>;
}

export default async function StudyPage({ params }: PageProps) {
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

  if (deck.cards.length === 0) {
    redirect(`/learning-hub/flashcards/${deckId}`);
  }

  const firstCard = deck.cards[0];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2 animate-fade-in">
        <Link
          href={`/learning-hub/flashcards/${deckId}`}
          className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 inline-flex items-center gap-1 transition-all hover:gap-2"
        >
          ← Back to Deck
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Study: {deck.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          {deck.cards.length} cards • Using spaced repetition 🎴
        </p>
      </div>

      {/* Study Session */}
      <div className="animate-fade-in-up">
        <StudySession deckId={deckId} initialCard={firstCard} />
      </div>

      {/* Info */}
      <div className="rounded-xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 backdrop-blur-xl p-8 hover:border-blue-400/50 transition-all hover:shadow-lg">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
          📚 How to Study Effectively
        </h3>
        <ul className="space-y-2 text-blue-900 dark:text-blue-200 text-sm">
          <li>
            <strong>Flip the card:</strong> Click the card to reveal the answer
          </li>
          <li>
            <strong>Rate honestly:</strong> Choose how well you knew the answer (0-5)
          </li>
          <li>
            <strong>SM-2 Algorithm:</strong> Cards you struggle with come back sooner
          </li>
          <li>
            <strong>Consistency:</strong> Study a little bit daily to build your streak!
          </li>
        </ul>
      </div>
    </div>
  );
}

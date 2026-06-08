import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";
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
    <PageLayout
      title={`Study: ${deck.title}`}
      description={`Practice ${deck.cards.length} flashcards with SM-2 spaced repetition`}
    >
      {/* Back Button */}
      <Link
        href={`/learning-hub/flashcards/${deckId}`}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors mb-6 inline-flex items-center gap-1"
      >
        ← Back to Deck
      </Link>
      {/* Study Session */}
      <div className="animate-fade-in-up mt-6">
        <StudySession
          deckId={deckId}
          initialCard={firstCard}
          allCards={deck.cards}
        />
      </div>

      {/* Tips Section */}
      <SectionCard
        title="📚 How to Study Effectively"
        description="Get the most out of your study sessions with these tips"
        variant="glass"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              ⌨️ Keyboard Shortcuts
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>SPACE:</strong> Flip card
              </li>
              <li>
                <strong>0-5:</strong> Rate the card
              </li>
              <li>
                <strong>← →:</strong> Navigate cards
              </li>
              <li>
                <strong>ESC:</strong> Exit study mode
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              💡 Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <strong>Rate honestly:</strong> Accurate ratings improve scheduling
              </li>
              <li>
                <strong>Consistency:</strong> Study daily to maintain your streak
              </li>
              <li>
                <strong>SM-2 Algorithm:</strong> Difficult cards appear more often
              </li>
              <li>
                <strong>Quality matters:</strong> Focus on understanding, not memorizing
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* SM-2 Info */}
      <SectionCard
        title="🧠 SM-2 Spaced Repetition Algorithm"
        variant="glass"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              rating: "0-1 (Poor)",
              interval: "1 day",
              color: "from-red-500 to-orange-500",
              icon: "❌",
            },
            {
              rating: "2-3 (OK)",
              interval: "3 days",
              color: "from-yellow-500 to-amber-500",
              icon: "⚠️",
            },
            {
              rating: "4-5 (Good)",
              interval: "10+ days",
              color: "from-green-500 to-emerald-500",
              icon: "✓",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-lg border border-slate-200 dark:border-slate-700 bg-gradient-to-br ${item.color}/10 p-4`}
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                {item.rating}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Next review in <strong>{item.interval}</strong>
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageLayout>
  );
}

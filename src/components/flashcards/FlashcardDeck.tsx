import Link from "next/link";

interface FlashcardDeckProps {
  id: string;
  title: string;
  subject: string;
  cardCount: number;
  createdAt: Date;
}

export function FlashcardDeck({
  id,
  title,
  subject,
  cardCount,
  createdAt,
}: FlashcardDeckProps) {
  const daysAgo = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Link href={`/learning-hub/flashcards/${id}/study`}>
      <div className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all hover:border-blue-400 hover:shadow-lg dark:hover:border-blue-600 cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subject}
            </p>
          </div>
          <div className="text-3xl">🎴</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {cardCount}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {cardCount === 1 ? "card" : "cards"}
            </p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500">
            Created {daysAgo === 0 ? "today" : `${daysAgo}d ago`}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
          <span>Study now</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

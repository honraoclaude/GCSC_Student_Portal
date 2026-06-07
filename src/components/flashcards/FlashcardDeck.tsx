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
      <div className="group rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 backdrop-blur-xl p-6 transition-all hover:border-indigo-400/50 hover:shadow-lg hover:-translate-y-1 duration-200 cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subject}
            </p>
          </div>
          <div className="text-3xl group-hover:scale-110 transition-transform duration-200">🎴</div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
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

        <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 group-hover:gap-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-all">
          <span>Study now</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}

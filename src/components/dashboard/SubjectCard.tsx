import Link from "next/link";

interface SubjectCardProps {
  subject: string;
  targetGrade: string;
  currentGrade?: string;
}

const SUBJECT_EMOJIS: Record<string, string> = {
  MATHS: "🔢",
  ENGLISH_LANGUAGE: "📝",
  ENGLISH_LITERATURE: "📖",
  PHYSICS: "⚛️",
  CHEMISTRY: "🧪",
  BIOLOGY: "🧬",
  COMPUTER_SCIENCE: "💻",
  ECONOMICS: "📊",
  BUSINESS: "💼",
  GEOGRAPHY: "🌍",
  HISTORY: "📜",
};

export function SubjectCard({ subject, targetGrade, currentGrade }: SubjectCardProps) {
  const emoji = SUBJECT_EMOJIS[subject] || "📚";
  const displayName = subject.replace(/_/g, " ");

  return (
    <Link href={`/agents/tutor/${subject.toLowerCase()}`}>
      <div className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all hover:border-blue-400 hover:shadow-lg dark:hover:border-blue-600 cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-3xl">{emoji}</div>
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
              {displayName}
            </h3>
          </div>
          <div className="text-right text-sm">
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {currentGrade || "—"}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Target: {targetGrade.replace("GRADE_", "")}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: "45%" }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
          <span>Ask tutor</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

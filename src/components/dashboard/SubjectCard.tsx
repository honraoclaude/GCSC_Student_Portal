import Link from "next/link";
import { cardElevated, textMuted, cn } from "@/styles";

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
      <div className={cn(
        cardElevated,
        "group relative p-6 cursor-pointer overflow-hidden"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40">
                <span className="text-2xl">{emoji}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                  {displayName}
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div>
                  <p className={cn("text-xs font-medium mb-1", textMuted)}>
                    Current
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentGrade || "—"}
                  </p>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                <div>
                  <p className={cn("text-xs font-medium mb-1", textMuted)}>
                    Target
                  </p>
                  <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {targetGrade.replace("GRADE_", "")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>Chat with tutor</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

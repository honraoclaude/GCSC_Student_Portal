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
        "group relative p-6 cursor-pointer overflow-hidden rounded-2xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-xl hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/15 dark:to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 dark:from-blue-500/40 dark:to-cyan-500/40 group-hover:scale-110 transition-transform duration-200">
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

            <div className="pt-3 border-t border-blue-200/30 dark:border-blue-200/20">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:gap-3 transition-all">
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

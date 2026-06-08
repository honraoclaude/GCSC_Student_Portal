import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionCard } from "@/components/layout/SectionCard";
import { buttonPrimary, cn } from "@/styles";

const PRACTICE_PAPERS = [
  {
    id: 1,
    subject: "Mathematics",
    emoji: "🔢",
    board: "Edexcel",
    difficulty: "Intermediate",
    duration: "90 minutes",
    marks: "100",
    topics: ["Algebra", "Geometry", "Statistics"],
  },
  {
    id: 2,
    subject: "Physics",
    emoji: "⚛️",
    board: "AQA",
    difficulty: "Foundation",
    duration: "105 minutes",
    marks: "96",
    topics: ["Forces", "Energy", "Waves"],
  },
  {
    id: 3,
    subject: "Chemistry",
    emoji: "🧪",
    board: "OCR",
    difficulty: "Higher",
    duration: "105 minutes",
    marks: "105",
    topics: ["Bonding", "Reactions", "Thermodynamics"],
  },
  {
    id: 4,
    subject: "Biology",
    emoji: "🧬",
    board: "Edexcel",
    difficulty: "Intermediate",
    duration: "105 minutes",
    marks: "96",
    topics: ["Cells", "Genetics", "Evolution"],
  },
  {
    id: 5,
    subject: "English Language",
    emoji: "📝",
    board: "AQA",
    difficulty: "Intermediate",
    duration: "120 minutes",
    marks: "96",
    topics: ["Reading", "Writing", "Grammar"],
  },
  {
    id: 6,
    subject: "History",
    emoji: "📜",
    board: "Edexcel",
    difficulty: "Foundation",
    duration: "105 minutes",
    marks: "84",
    topics: ["WWII", "Industrial Revolution", "Empires"],
  },
];

export default function PracticePapersPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Foundation":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
      case "Intermediate":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Higher":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800";
    }
  };

  return (
    <PageLayout
      title="Practice Papers"
      description="Master exam technique with realistic GCSE past papers and mock exams"
    >
      {/* Hero Badge */}
      <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 mb-4">
        <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Exam Simulation Mode ✨
        </span>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3 mb-8 animate-fade-in">
        <div className="rounded-xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl p-6 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Papers</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mt-2">{PRACTICE_PAPERS.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Across all subjects</p>
        </div>
        <div className="rounded-xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl p-6 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Average Duration</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mt-2">105 min</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Realistic exam timing</p>
        </div>
        <div className="rounded-xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 backdrop-blur-xl p-6 hover:border-emerald-400/50 transition-all hover:shadow-lg hover:-translate-y-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Exam Boards</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mt-2">4</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Edexcel, AQA, OCR, +1</p>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">Available Papers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {PRACTICE_PAPERS.map((paper, idx) => (
            <div
              key={paper.id}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="rounded-2xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-white/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-xl hover:border-emerald-400/50 dark:hover:border-emerald-400/50 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden animate-fade-in-up"
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{paper.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {paper.subject}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {paper.board}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyColor(
                      paper.difficulty
                    )}`}
                  >
                    {paper.difficulty}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {paper.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Total Marks
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {paper.marks}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Sections
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">2-3</p>
                  </div>
                </div>

                {/* Topics */}
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider">
                    Topics Covered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {paper.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button className={cn(buttonPrimary, "w-full mt-2")}>
                  Start Mock Exam →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <SectionCard
        title="How to use Practice Papers"
        description="Get the most out of your exam preparation"
        variant="glass"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "⏱️",
              title: "Time Yourself",
              desc: "Set a timer to match real exam conditions and build pace and confidence",
              step: "1",
            },
            {
              icon: "✍️",
              title: "Work Independently",
              desc: "Only check answers after completing the paper to simulate real exam pressure",
              step: "2",
            },
            {
              icon: "📊",
              title: "Review & Analyze",
              desc: "Get detailed feedback on weak areas and track improvement over time",
              step: "3",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-3 relative">
              <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {item.step}
              </div>
              <p className="text-4xl">{item.icon}</p>
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Integration CTA */}
      <div className="relative rounded-2xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/40 backdrop-blur p-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-emerald-100">
            Need help preparing?
          </h3>
          <p className="text-lg text-emerald-800 dark:text-emerald-200 max-w-2xl mx-auto">
            Chat with the Exam Prep Coach to get personalized grade predictions and strategy tips after taking a mock paper
          </p>
          <Link href="/agents/exam-prep">
            <Button className={cn(buttonPrimary, "px-8 py-3")}>
              Chat with Exam Coach →
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

"use client";

import { AgentChat } from "@/components/agents/AgentChat";
import Link from "next/link";

const SUBJECT_METADATA: Record<string, { name: string; emoji: string; topics: string[] }> = {
  maths: {
    name: "Maths",
    emoji: "🔢",
    topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"],
  },
  english_language: {
    name: "English Language",
    emoji: "📝",
    topics: ["Essay writing", "Grammar", "Rhetoric", "Comprehension"],
  },
  english_literature: {
    name: "English Literature",
    emoji: "📖",
    topics: ["Novel analysis", "Poetry", "Drama", "Themes"],
  },
  physics: {
    name: "Physics",
    emoji: "⚛️",
    topics: ["Mechanics", "Electricity", "Waves", "Modern Physics"],
  },
  chemistry: {
    name: "Chemistry",
    emoji: "🧪",
    topics: ["Atomic structure", "Bonding", "Reactions", "Thermodynamics"],
  },
  biology: {
    name: "Biology",
    emoji: "🧬",
    topics: ["Cells", "Genetics", "Evolution", "Ecology"],
  },
  computer_science: {
    name: "Computer Science",
    emoji: "💻",
    topics: ["Programming", "Algorithms", "Data structures", "Networks"],
  },
  economics: {
    name: "Economics",
    emoji: "📊",
    topics: ["Supply & Demand", "Markets", "Inflation", "Trade"],
  },
  business: {
    name: "Business",
    emoji: "💼",
    topics: ["Marketing", "Finance", "Operations", "Strategy"],
  },
  geography: {
    name: "Geography",
    emoji: "🌍",
    topics: ["Physical geography", "Human geography", "Climate", "Resources"],
  },
  history: {
    name: "History",
    emoji: "📜",
    topics: ["WWII", "Industrial Revolution", "Political change", "Empires"],
  },
};

interface PageProps {
  params: {
    subject: string;
  };
}

export default function SubjectTutorPage({ params }: PageProps) {
  const subject = params.subject.toUpperCase().replace("-", "_");
  const metadata = SUBJECT_METADATA[params.subject.toLowerCase()];

  if (!metadata) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Subject not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Please select a valid subject from your dashboard.
        </p>
        <Link
          href="/dashboard"
          className="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mb-3 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-5xl">{metadata.emoji}</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              {metadata.name} Tutor
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Expert explanations tailored to your learning style
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
            <AgentChat
              agentType="SUBJECT_TUTOR"
              subject={subject}
              agentName={`${metadata.name} Tutor`}
              agentEmoji={metadata.emoji}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Topics Card */}
          <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Common topics:
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {metadata.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-block text-xs rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 border border-indigo-300/40 dark:border-indigo-300/20 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 font-medium hover:bg-indigo-400/40 transition-all"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* How to Get Help Card */}
          <div className="rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/30 backdrop-blur p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
                  How to get help:
                </h4>
                <ul className="text-sm text-indigo-800 dark:text-indigo-300 space-y-2">
                  {[
                    "Ask about specific concepts",
                    "Request step-by-step explanations",
                    "Ask for worked examples",
                    "Get practice questions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Study Tips */}
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Study strategies
            </p>
            <div className="space-y-2">
              {[
                { icon: "🔍", text: "Deep dive questions" },
                { icon: "✍️", text: "Worked solutions" },
                { icon: "🎯", text: "Exam tips" },
                { icon: "🔄", text: "Quick review" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300 text-sm">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-2 inline-block"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {metadata.emoji} {metadata.name} Tutor
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Ask questions about any topic in {metadata.name}. I'll explain it clearly and help you understand.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AgentChat
            agentType="SUBJECT_TUTOR"
            subject={subject}
            agentName={`${metadata.name} Tutor`}
            agentEmoji={metadata.emoji}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Common topics:
            </h3>
            <div className="flex flex-wrap gap-2">
              {metadata.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-block text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              💡 How to get help:
            </h3>
            <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Ask about specific concepts</li>
              <li>• Request step-by-step explanations</li>
              <li>• Ask for worked examples</li>
              <li>• Get practice questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

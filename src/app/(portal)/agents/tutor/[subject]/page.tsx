"use client";

import { ChatLayout } from "@/components/chat";
import { SUBJECT_TUTORS, getMockResponse } from "@/lib/agents";
import { useParams } from "next/navigation";
import Link from "next/link";

const SUBJECT_METADATA: Record<
  string,
  { name: string; emoji: string; topics: string[] }
> = {
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

export default function SubjectTutorPage() {
  const params = useParams();
  const subjectKey = (params?.subject as string)?.toLowerCase() || "";
  const metadata = SUBJECT_METADATA[subjectKey];

  if (!subjectKey || !metadata) {
    return (
      <div className="text-center space-y-4 py-12">
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

  const handleSendMessage = async (message: string): Promise<string> => {
    return getMockResponse(message);
  };

  // Map subject name to tutor config
  const getTutorConfig = () => {
    const mapping: Record<string, string> = {
      maths: "math",
      english_language: "english",
      english_literature: "english",
      physics: "science",
      chemistry: "science",
      biology: "science",
      geography: "geography",
      history: "history",
      computer_science: "science",
      economics: "science",
      business: "science",
    };

    const configKey = mapping[subjectKey] || "math";
    return SUBJECT_TUTORS[configKey as keyof typeof SUBJECT_TUTORS];
  };

  const tutorConfig = getTutorConfig();

  return (
    <ChatLayout
      agent={{
        ...tutorConfig,
        icon: metadata.emoji,
        name: `${metadata.name} Tutor`,
        greeting: `Hi! I'm your ${metadata.name} Tutor. ${metadata.emoji} I'm here to help you understand complex concepts, solve problems, and excel in ${metadata.name}. What would you like help with?`,
      }}
      onSendMessage={handleSendMessage}
      storageKey={`chat-tutor-${subjectKey}`}
    />
  );
}

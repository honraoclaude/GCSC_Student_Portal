import { GCSESubject, YearGroup } from "@/types";

// Year Groups
export const YEAR_GROUPS: YearGroup[] = ["YEAR_9", "YEAR_10", "YEAR_11"];

// GCSE Subjects
export const GCSE_SUBJECTS: GCSESubject[] = [
  "MATHS",
  "ENGLISH_LANGUAGE",
  "ENGLISH_LITERATURE",
  "PHYSICS",
  "CHEMISTRY",
  "BIOLOGY",
  "COMPUTER_SCIENCE",
  "ECONOMICS",
  "BUSINESS",
  "GEOGRAPHY",
  "HISTORY",
];

// Subject Metadata
export const SUBJECT_METADATA: Record<
  string,
  { name: string; emoji: string; color: string }
> = {
  maths: { name: "Maths", emoji: "🔢", color: "from-blue-500 to-cyan-500" },
  english_language: {
    name: "English Language",
    emoji: "📝",
    color: "from-purple-500 to-pink-500",
  },
  english_literature: {
    name: "English Literature",
    emoji: "📖",
    color: "from-indigo-500 to-purple-500",
  },
  physics: { name: "Physics", emoji: "⚛️", color: "from-green-500 to-emerald-500" },
  chemistry: { name: "Chemistry", emoji: "🧪", color: "from-orange-500 to-red-500" },
  biology: { name: "Biology", emoji: "🧬", color: "from-pink-500 to-red-500" },
  computer_science: {
    name: "Computer Science",
    emoji: "💻",
    color: "from-indigo-500 to-blue-500",
  },
  economics: {
    name: "Economics",
    emoji: "📊",
    color: "from-green-500 to-blue-500",
  },
  business: { name: "Business", emoji: "💼", color: "from-amber-500 to-orange-500" },
  geography: { name: "Geography", emoji: "🌍", color: "from-teal-500 to-cyan-500" },
  history: { name: "History", emoji: "📜", color: "from-yellow-600 to-orange-600" },
};

// Grades
export const GRADE_OPTIONS = [
  "GRADE_1",
  "GRADE_2",
  "GRADE_3",
  "GRADE_4",
  "GRADE_5",
  "GRADE_6",
  "GRADE_7",
  "GRADE_8",
  "GRADE_9",
];

// Timezone
export const APP_TIMEZONE = "Europe/London";

// API
export const API_ENDPOINTS = {
  AGENTS_CHAT: "/api/agents/chat",
  FLASHCARDS_DECKS: "/api/flashcards/decks",
  FLASHCARDS_REVIEW: "/api/flashcards/review",
  GAMIFICATION_XP: "/api/gamification/xp",
  ONBOARDING: "/api/onboarding",
} as const;

// Routes
export const ROUTES = {
  DASHBOARD: "/dashboard",
  AGENTS_SUCCESS: "/agents/success",
  AGENTS_TUTOR: (subject: string) => `/agents/tutor/${subject}`,
  LEARNING_HUB: "/learning-hub",
  FLASHCARDS: "/learning-hub/flashcards",
  FLASHCARDS_NEW: "/learning-hub/flashcards/new",
  FLASHCARDS_DETAIL: (deckId: string) => `/learning-hub/flashcards/${deckId}`,
  FLASHCARDS_STUDY: (deckId: string) => `/learning-hub/flashcards/${deckId}/study`,
  ACHIEVEMENTS: "/achievements",
  LEADERBOARD: "/leaderboard",
  ONBOARDING: "/onboarding",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
} as const;

// UI
export const UI = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

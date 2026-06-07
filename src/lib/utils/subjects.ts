export const GCSE_SUBJECTS = {
  MATHS: { label: "Mathematics", emoji: "🔢" },
  ENGLISH_LANGUAGE: { label: "English Language", emoji: "📝" },
  ENGLISH_LITERATURE: { label: "English Literature", emoji: "📚" },
  PHYSICS: { label: "Physics", emoji: "⚛️" },
  CHEMISTRY: { label: "Chemistry", emoji: "🧪" },
  BIOLOGY: { label: "Biology", emoji: "🧬" },
  COMPUTER_SCIENCE: { label: "Computer Science", emoji: "💻" },
  ECONOMICS: { label: "Economics", emoji: "📊" },
  BUSINESS: { label: "Business Studies", emoji: "💼" },
  GEOGRAPHY: { label: "Geography", emoji: "🌍" },
  HISTORY: { label: "History", emoji: "📜" },
} as const;

export const GRADE_LABELS = {
  GRADE_1: "1 (Very Low)",
  GRADE_2: "2",
  GRADE_3: "3",
  GRADE_4: "4 (Pass)",
  GRADE_5: "5 (Strong Pass)",
  GRADE_6: "6",
  GRADE_7: "7 (Very Strong)",
  GRADE_8: "8",
  GRADE_9: "9 (Highest)",
} as const;

export function getSubjectLabel(subject: string): string {
  return (GCSE_SUBJECTS as any)[subject]?.label || subject;
}

export function getSubjectEmoji(subject: string): string {
  return (GCSE_SUBJECTS as any)[subject]?.emoji || "📖";
}

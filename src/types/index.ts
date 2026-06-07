// Core domain types
export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";
export type YearGroup = "YEAR_9" | "YEAR_10" | "YEAR_11";
export type GradeTarget = "GRADE_1" | "GRADE_2" | "GRADE_3" | "GRADE_4" | "GRADE_5" | "GRADE_6" | "GRADE_7" | "GRADE_8" | "GRADE_9";
export type GCSESubject =
  | "MATHS"
  | "ENGLISH_LANGUAGE"
  | "ENGLISH_LITERATURE"
  | "PHYSICS"
  | "CHEMISTRY"
  | "BIOLOGY"
  | "COMPUTER_SCIENCE"
  | "ECONOMICS"
  | "BUSINESS"
  | "GEOGRAPHY"
  | "HISTORY";

// Gamification types
export type XPEventType =
  | "DAILY_LOGIN"
  | "AGENT_INTERACTION"
  | "FLASHCARD_REVIEW"
  | "DECK_CREATED"
  | "GOAL_COMPLETED"
  | "STREAK_MILESTONE";

export type RarityTier = "common" | "uncommon" | "rare" | "epic" | "legendary";

// Agent types
export type AgentType = "STUDENT_SUCCESS" | "SUBJECT_TUTOR";

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface XPAwardResponse {
  xp: number;
  newLevel: number;
  leveledUp: boolean;
  newTotal: number;
  newAchievements: Achievement[];
}

// Domain model types
export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  xpReward: number;
  rarity: RarityTier;
}

export interface XPEventDef {
  xp: number;
  dailyCap: number;
  description: string;
}

export interface LevelProgress {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  xpInCurrentLevel: number;
  xpNeededForNext: number;
  progress: number;
  xpRemaining: number;
}

export interface StudentStats {
  displayName: string;
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
}

// Form types
export interface OnboardingFormData {
  displayName: string;
  yearGroup: YearGroup;
  subjects: Array<{
    subject: GCSESubject;
    targetGrade: GradeTarget;
  }>;
}

export interface CreateDeckFormData {
  title: string;
  subject: GCSESubject;
  description?: string;
}

export interface AddCardFormData {
  front: string;
  back: string;
  hint?: string;
}

// UI component props (reusable)
export interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

/**
 * Database Module Barrel Export
 * Central export point for all database queries and utilities
 */

export { prisma } from './prisma';

// Include patterns
export {
  studentProfileInclude,
  userInclude,
  userMinimalInclude,
  flashcardDeckInclude,
  flashcardDeckListInclude,
  achievementInclude,
  leaderboardInclude,
} from './includes';

// User queries
export {
  getUserWithProfile,
  getUserWithAllData,
  getUserByClerkId,
} from './queries';

// Student profile queries
export {
  getStudentProfile,
  getStudentProfileMinimal,
  getStudentProfileXP,
} from './queries';

// Gamification queries
export {
  getUserXPStats,
  getLeaderboard,
  getUserLeaderboardRank,
  getUserXPEvents,
} from './queries';

// Flashcard queries
export {
  getFlashcardDeck,
  getFlashcardDeckWithCount,
  getUserFlashcardDecks,
  getFlashcardsForStudy,
  getFlashcardProgress,
} from './queries';

// Achievement queries
export {
  getUserAchievements,
  getUserAchievementSlugs,
  hasUserAchievement,
  unlockAchievement,
} from './queries';

// Goal queries
export {
  getUserGoals,
  getUserIncompleteGoals,
} from './queries';

// Subject queries
export {
  getStudentEnrolledSubjects,
  getStudentSubjectEnrollment,
} from './queries';

// Note queries
export {
  getStudentNotes,
  getStudentNotesBySubject,
} from './queries';

// Conversation queries
export {
  getUserConversations,
  getConversation,
} from './queries';

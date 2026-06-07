/**
 * Centralized Prisma Query Patterns
 * Consolidates database access patterns for consistency and optimization
 */

import { prisma } from './prisma';
import {
  studentProfileInclude,
  userInclude,
  userMinimalInclude,
  flashcardDeckInclude,
  flashcardDeckListInclude,
  achievementInclude,
  leaderboardInclude,
} from './includes';

// ============================================================================
// USER QUERIES
// ============================================================================

/**
 * Get user with basic student profile
 */
export async function getUserWithProfile(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: {
      studentProfile: true,
    },
  });
}

/**
 * Get user with all related data (comprehensive)
 * Includes profile, achievements, XP events, and more
 */
export async function getUserWithAllData(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: userInclude,
  });
}

/**
 * Get user by Clerk ID only (minimal data)
 */
export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
  });
}

// ============================================================================
// STUDENT PROFILE QUERIES
// ============================================================================

/**
 * Get student profile with all related data
 */
export async function getStudentProfile(userId: string) {
  return prisma.studentProfile.findUnique({
    where: { userId },
    include: studentProfileInclude,
  });
}

/**
 * Get student profile by ID with minimal data
 */
export async function getStudentProfileMinimal(studentProfileId: string) {
  return prisma.studentProfile.findUnique({
    where: { id: studentProfileId },
  });
}

/**
 * Get student profile XP and level only
 */
export async function getStudentProfileXP(studentProfileId: string) {
  return prisma.studentProfile.findUnique({
    where: { id: studentProfileId },
    select: {
      totalXP: true,
      level: true,
      currentStreak: true,
      longestStreak: true,
    },
  });
}

// ============================================================================
// GAMIFICATION QUERIES
// ============================================================================

/**
 * Get user XP stats
 */
export async function getUserXPStats(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: userMinimalInclude,
  });
  return user?.studentProfile;
}

/**
 * Get leaderboard - top students by XP
 */
export async function getLeaderboard(limit: number = 50) {
  return prisma.studentProfile.findMany({
    include: leaderboardInclude,
    orderBy: { totalXP: 'desc' },
    take: limit,
  });
}

/**
 * Get user's rank on leaderboard
 */
export async function getUserLeaderboardRank(
  studentProfileId: string,
  limit: number = 50
) {
  const topStudents = await getLeaderboard(limit);
  const rank = topStudents.findIndex((s) => s.id === studentProfileId) + 1;
  return rank > limit ? null : rank;
}

/**
 * Get XP events for a user
 */
export async function getUserXPEvents(
  userId: string,
  limit: number = 10
) {
  return prisma.xPEvent.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// ============================================================================
// FLASHCARD QUERIES
// ============================================================================

/**
 * Get single flashcard deck with all cards
 */
export async function getFlashcardDeck(deckId: string) {
  return prisma.flashcardDeck.findUnique({
    where: { id: deckId },
    include: flashcardDeckInclude,
  });
}

/**
 * Get flashcard deck with card count only
 */
export async function getFlashcardDeckWithCount(deckId: string) {
  return prisma.flashcardDeck.findUnique({
    where: { id: deckId },
    include: {
      _count: { select: { cards: true } },
    },
  });
}

/**
 * Get all flashcard decks for a student
 */
export async function getUserFlashcardDecks(studentProfileId: string) {
  return prisma.flashcardDeck.findMany({
    where: { studentProfileId },
    include: flashcardDeckListInclude,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get flashcards to study (due for review)
 */
export async function getFlashcardsForStudy(
  studentProfileId: string,
  deckId?: string
) {
  return prisma.flashcardProgress.findMany({
    where: {
      studentProfileId,
      nextReviewAt: { lte: new Date() },
      ...(deckId && { flashcard: { deckId } }),
    },
    include: {
      flashcard: {
        include: {
          deck: true,
        },
      },
    },
    orderBy: { nextReviewAt: 'asc' },
  });
}

/**
 * Get a specific flashcard's progress
 */
export async function getFlashcardProgress(
  flashcardId: string,
  studentProfileId: string
) {
  return prisma.flashcardProgress.findUnique({
    where: {
      studentProfileId_flashcardId: {
        studentProfileId,
        flashcardId,
      },
    },
    include: {
      flashcard: true,
    },
  });
}

// ============================================================================
// ACHIEVEMENT QUERIES
// ============================================================================

/**
 * Get all user achievements with details
 */
export async function getUserAchievements(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      achievements: {
        include: achievementInclude,
      },
    },
  });
  return user?.achievements || [];
}

/**
 * Get user achievement slugs (IDs)
 */
export async function getUserAchievementSlugs(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      achievements: {
        select: {
          achievement: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });
  return user?.achievements.map((a) => a.achievement.slug) || [];
}

/**
 * Check if user has specific achievement
 */
export async function hasUserAchievement(
  clerkId: string,
  achievementSlug: string
) {
  const achievement = await prisma.achievement.findUnique({
    where: { slug: achievementSlug },
  });

  if (!achievement) return false;

  const userAchievement = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId: clerkId,
        achievementId: achievement.id,
      },
    },
  });

  return !!userAchievement;
}

/**
 * Unlock achievement for user
 */
export async function unlockAchievement(
  userId: string,
  achievementSlug: string
) {
  const achievement = await prisma.achievement.findUnique({
    where: { slug: achievementSlug },
  });

  if (!achievement) {
    throw new Error(`Achievement not found: ${achievementSlug}`);
  }

  // Check if already unlocked
  const existing = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId: achievement.id,
      },
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id,
    },
  });
}

// ============================================================================
// GOAL QUERIES
// ============================================================================

/**
 * Get all goals for a student
 */
export async function getUserGoals(studentProfileId: string) {
  return prisma.goal.findMany({
    where: { studentProfileId },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get incomplete goals for a student
 */
export async function getUserIncompleteGoals(studentProfileId: string) {
  return prisma.goal.findMany({
    where: {
      studentProfileId,
      completed: false,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================================================
// SUBJECT QUERIES
// ============================================================================

/**
 * Get student's enrolled subjects
 */
export async function getStudentEnrolledSubjects(studentProfileId: string) {
  return prisma.subjectEnrollment.findMany({
    where: { studentProfileId },
    include: {
      progressEntries: {
        orderBy: { recordedAt: 'desc' },
        take: 1,
      },
    },
  });
}

/**
 * Get student enrollment for specific subject
 */
export async function getStudentSubjectEnrollment(
  studentProfileId: string,
  subject: string
) {
  return prisma.subjectEnrollment.findFirst({
    where: {
      studentProfileId,
      subject: subject as any,
    },
  });
}

// ============================================================================
// NOTE QUERIES
// ============================================================================

/**
 * Get all notes for a student
 */
export async function getStudentNotes(studentProfileId: string) {
  return prisma.note.findMany({
    where: { studentProfileId },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get notes for a specific subject
 */
export async function getStudentNotesBySubject(
  studentProfileId: string,
  subject: string
) {
  return prisma.note.findMany({
    where: {
      studentProfileId,
      subject: subject as any,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================================================
// CONVERSATION QUERIES
// ============================================================================

/**
 * Get user's conversations
 */
export async function getUserConversations(userId: string) {
  return prisma.conversation.findMany({
    where: { userId, isActive: true },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get specific conversation with messages
 */
export async function getConversation(conversationId: string) {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}

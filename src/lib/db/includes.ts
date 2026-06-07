/**
 * Standardized Prisma Include Patterns
 * Reusable include objects for consistent data fetching
 */

export const studentProfileInclude = {
  flashcardDecks: {
    include: {
      cards: true,
      _count: { select: { cards: true } },
    },
  },
  goals: { orderBy: { createdAt: 'desc' as const } },
  subjectEnrollments: true,
  user: true,
} as const;

export const userInclude = {
  studentProfile: {
    include: studentProfileInclude,
  },
  achievements: {
    include: {
      achievement: true,
    },
  },
  xpEvents: {
    orderBy: { createdAt: 'desc' as const },
    take: 10,
  },
} as const;

export const userMinimalInclude = {
  studentProfile: {
    select: {
      totalXP: true,
      level: true,
      currentStreak: true,
      displayName: true,
    },
  },
} as const;

export const flashcardDeckInclude = {
  cards: true,
  studentProfile: true,
  _count: { select: { cards: true } },
} as const;

export const flashcardDeckListInclude = {
  cards: true,
  _count: { select: { cards: true } },
} as const;

export const achievementInclude = {
  achievement: true,
} as const;

export const leaderboardInclude = {
  user: {
    select: {
      email: true,
    },
  },
} as const;

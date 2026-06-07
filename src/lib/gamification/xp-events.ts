import { prisma } from "@/lib/db/prisma";

export const XP_EVENTS = {
  DAILY_LOGIN: { xp: 10, dailyCap: 10, description: "Logged in" },
  AGENT_INTERACTION: { xp: 5, dailyCap: 50, description: "Chatted with AI" },
  FLASHCARD_REVIEW: { xp: 2, dailyCap: 40, description: "Reviewed flashcard" },
  DECK_CREATED: { xp: 15, dailyCap: 30, description: "Created flashcard deck" },
  GOAL_COMPLETED: { xp: 50, dailyCap: 100, description: "Completed study goal" },
  STREAK_MILESTONE: { xp: 25, dailyCap: 50, description: "Reached streak milestone" },
};

export type XPEventType = keyof typeof XP_EVENTS;

/**
 * Award XP to a user for an action
 * Respects daily caps per event type
 */
export async function awardXP(
  userId: string,
  eventType: XPEventType,
  metadata?: Record<string, any>
): Promise<{ xp: number; newLevel: number; leveledUp: boolean; newTotal: number }> {
  const event = XP_EVENTS[eventType];
  if (!event) throw new Error(`Unknown XP event type: ${eventType}`);

  // Check daily cap
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEvents = await prisma.xPEvent.aggregate({
    where: {
      userId,
      eventType,
      createdAt: { gte: today },
    },
    _sum: { xpAmount: true },
  });

  const xpEarnedToday = todayEvents._sum.xpAmount || 0;
  const xpToAward = Math.max(0, Math.min(event.xp, event.dailyCap - xpEarnedToday));

  if (xpToAward === 0) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { studentProfile: true },
    });
    return {
      xp: 0,
      newLevel: user?.studentProfile?.level || 1,
      leveledUp: false,
      newTotal: user?.studentProfile?.totalXP || 0,
    };
  }

  // Record XP event
  await prisma.xPEvent.create({
    data: {
      userId,
      eventType,
      xpAmount: xpToAward,
      metadata: metadata || {},
    },
  });

  // Update student profile
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { studentProfile: true },
  });

  if (!user?.studentProfile) {
    throw new Error("Student profile not found");
  }

  const newTotalXP = user.studentProfile.totalXP + xpToAward;
  const newLevel = calculateLevel(newTotalXP);
  const oldLevel = user.studentProfile.level;
  const leveledUp = newLevel > oldLevel;

  await prisma.studentProfile.update({
    where: { id: user.studentProfile.id },
    data: {
      totalXP: newTotalXP,
      level: newLevel,
    },
  });

  return {
    xp: xpToAward,
    newLevel,
    leveledUp,
    newTotal: newTotalXP,
  };
}

/**
 * Calculate level from total XP
 * Formula: Level N requires 100 * N^1.5 cumulative XP
 */
export function calculateLevel(totalXP: number): number {
  let level = 1;
  while (true) {
    const xpNeeded = xpForLevel(level + 1);
    if (totalXP < xpNeeded) break;
    level++;
  }
  return level;
}

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Get XP progress toward next level
 */
export function getLevelProgress(totalXP: number) {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = xpForLevel(currentLevel);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const progress = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    xpInCurrentLevel,
    xpNeededForNext,
    progress,
    xpRemaining: Math.max(0, xpNeededForNext - xpInCurrentLevel),
  };
}

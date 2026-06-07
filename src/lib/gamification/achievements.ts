import { prisma } from "@/lib/db/prisma";

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  xpReward: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_deck: {
    id: "first_deck",
    slug: "first_deck",
    name: "Deck Master",
    description: "Created your first flashcard deck",
    emoji: "🎴",
    xpReward: 50,
    rarity: "common",
  },
  study_streak_7: {
    id: "study_streak_7",
    slug: "study_streak_7",
    name: "On Fire 🔥",
    description: "7-day study streak",
    emoji: "🔥",
    xpReward: 100,
    rarity: "uncommon",
  },
  study_streak_30: {
    id: "study_streak_30",
    slug: "study_streak_30",
    name: "Study Legend",
    description: "30-day study streak",
    emoji: "👑",
    xpReward: 250,
    rarity: "rare",
  },
  level_5: {
    id: "level_5",
    slug: "level_5",
    name: "Rising Star",
    description: "Reached level 5",
    emoji: "⭐",
    xpReward: 50,
    rarity: "uncommon",
  },
  level_10: {
    id: "level_10",
    slug: "level_10",
    name: "Scholar",
    description: "Reached level 10",
    emoji: "📚",
    xpReward: 100,
    rarity: "rare",
  },
  cards_reviewed_50: {
    id: "cards_reviewed_50",
    slug: "cards_reviewed_50",
    name: "Flashcard Fan",
    description: "Reviewed 50 flashcards",
    emoji: "🎯",
    xpReward: 75,
    rarity: "uncommon",
  },
  agent_chat_20: {
    id: "agent_chat_20",
    slug: "agent_chat_20",
    name: "AI Enthusiast",
    description: "20 AI agent conversations",
    emoji: "🤖",
    xpReward: 50,
    rarity: "uncommon",
  },
};

/**
 * Check and award achievements based on user progress
 */
export async function checkAndAwardAchievements(
  userId: string
): Promise<Achievement[]> {
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          achievements: true,
          flashcardDecks: true,
        },
      },
    },
  });

  if (!user?.studentProfile) return [];

  const newAchievements: Achievement[] = [];
  const existingAchievementSlugs = user.studentProfile.achievements.map(
    (a) => a.achievementSlug
  );

  // Check each achievement condition
  const achievementsToCheck: Array<{
    key: string;
    check: () => boolean;
  }> = [
    {
      key: "first_deck",
      check: () => user.studentProfile!.flashcardDecks.length > 0,
    },
    {
      key: "study_streak_7",
      check: () => user.studentProfile!.currentStreak >= 7,
    },
    {
      key: "study_streak_30",
      check: () => user.studentProfile!.currentStreak >= 30,
    },
    {
      key: "level_5",
      check: () => user.studentProfile!.level >= 5,
    },
    {
      key: "level_10",
      check: () => user.studentProfile!.level >= 10,
    },
  ];

  for (const { key, check } of achievementsToCheck) {
    if (!existingAchievementSlugs.includes(key) && check()) {
      const achievement = ACHIEVEMENTS[key];
      if (achievement) {
        await prisma.userAchievement.create({
          data: {
            studentProfileId: user.studentProfile.id,
            achievementSlug: key,
          },
        });
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
}

/**
 * Get all achievements for a user
 */
export async function getUserAchievements(userId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          achievements: true,
        },
      },
    },
  });

  if (!user?.studentProfile) return [];

  return user.studentProfile.achievements
    .map((ua) => ACHIEVEMENTS[ua.achievementSlug])
    .filter(Boolean);
}

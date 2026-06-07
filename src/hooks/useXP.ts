/**
 * XP and gamification hooks
 * Handle awarding XP, tracking level-ups, achievements, and streaks
 */

import { useState, useCallback, useEffect } from 'react';
import type { Achievement } from '@/types';

export interface UseXPOptions {
  onLevelUp?: (newLevel: number) => void;
  onAchievement?: (achievement: Achievement) => void;
}

export interface XPState {
  xpEarned: number;
  newLevel: number;
  leveledUp: boolean;
  newTotal: number;
  newAchievements: Achievement[];
}

export function useXP(options?: UseXPOptions) {
  const [xp, setXp] = useState<XPState>({
    xpEarned: 0,
    newLevel: 1,
    leveledUp: false,
    newTotal: 0,
    newAchievements: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const awardXP = useCallback(
    async (eventType: string, metadata?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/gamification/xp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType, metadata }),
        });

        if (!response.ok) {
          throw new Error(`Failed to award XP: ${response.statusText}`);
        }

        const data = (await response.json()) as XPState;
        setXp(data);

        // Trigger callbacks
        if (data.leveledUp) {
          options?.onLevelUp?.(data.newLevel);
        }

        if (data.newAchievements?.length) {
          data.newAchievements.forEach((achievement) => {
            options?.onAchievement?.(achievement);
          });
        }

        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return {
    awardXP,
    ...xp,
    loading,
    error,
  };
}

/**
 * Hook to fetch and display user's current streak
 */
export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStreak = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/streak');

      if (!response.ok) {
        throw new Error(`Failed to fetch streak: ${response.statusText}`);
      }

      const data = await response.json();
      setStreak(data.currentStreak || 0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return {
    streak,
    loading,
    error,
    refetch: fetchStreak,
  };
}

/**
 * Hook to fetch level progress information
 */
export function useLevelProgress() {
  const [progress, setProgress] = useState({
    currentLevel: 1,
    currentLevelXP: 0,
    nextLevelXP: 1000,
    xpInCurrentLevel: 0,
    xpNeededForNext: 1000,
    progress: 0,
    xpRemaining: 1000,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/level-progress');

      if (!response.ok) {
        throw new Error(`Failed to fetch level progress: ${response.statusText}`);
      }

      const data = await response.json();
      setProgress(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    error,
    refetch: fetchProgress,
  };
}

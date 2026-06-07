/**
 * SM-2 Spaced Repetition Algorithm
 * Based on: https://www.supermemo.com/en/archives1990-2015/english/ol/2how
 *
 * Quality: 0-5 scale where:
 * 0-2: Failed (restart)
 * 3: Difficult (small increase)
 * 4: Good (normal increase)
 * 5: Easy (large increase)
 */

export interface SM2State {
  interval: number; // Days until next review
  repetitions: number; // Total reviews done
  efactor: number; // Easiness factor (2.5 default)
}

export interface SM2Update extends SM2State {
  nextReviewAt: Date;
}

const MIN_EFACTOR = 1.3;
const DEFAULT_EFACTOR = 2.5;

export function calculateSM2(
  current: SM2State,
  quality: number, // 0-5
  today: Date = new Date()
): SM2Update {
  if (quality < 0 || quality > 5) {
    throw new Error("Quality must be between 0 and 5");
  }

  let { interval, repetitions, efactor } = current;

  // Calculate new efactor
  const newEfactor = Math.max(
    MIN_EFACTOR,
    efactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  // Calculate new interval
  let newInterval: number;
  if (quality < 3) {
    // Failed - restart
    newInterval = 1;
    repetitions = 0;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      newInterval = 1;
    } else if (repetitions === 2) {
      newInterval = 3;
    } else {
      newInterval = Math.round(interval * newEfactor);
    }
  }

  // Calculate next review date
  const nextReviewAt = new Date(today);
  nextReviewAt.setDate(nextReviewAt.getDate() + newInterval);
  nextReviewAt.setHours(0, 0, 0, 0); // Set to start of day

  return {
    interval: newInterval,
    repetitions,
    efactor: newEfactor,
    nextReviewAt,
  };
}

export function getXPForReview(quality: number): number {
  // Reward better performance
  return quality >= 3 ? 2 : 1;
}

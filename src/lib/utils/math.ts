/**
 * Math utilities for XP and level calculations
 * Formula: Level N requires 100 * N^1.5 cumulative XP
 */

/**
 * Calculate XP needed for a specific level
 * @param level - The target level (1-100)
 * @returns Total XP required to reach that level
 */
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

/**
 * Calculate current level from total XP
 * @param totalXP - Total XP earned
 * @returns Current level (1+)
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

/**
 * Get comprehensive level progress information
 * @param totalXP - Total XP earned
 * @returns Object with current level, progress details, and XP needed for next level
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

/**
 * Calculate XP difference between two levels
 * @param currentLevel - Current level
 * @param targetLevel - Target level to reach
 * @returns XP needed to go from current to target level
 */
export function xpDifference(currentLevel: number, targetLevel: number): number {
  if (targetLevel <= currentLevel) return 0;
  return xpForLevel(targetLevel) - xpForLevel(currentLevel);
}

/**
 * Clamp a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate percentage progress
 * @param current - Current value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function calculatePercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((current / total) * 100, 100);
}

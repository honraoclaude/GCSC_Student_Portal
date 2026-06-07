/**
 * Input validation utilities
 * All functions return boolean - return false for invalid input, true for valid
 */

import { GCSE_SUBJECTS, GRADE_OPTIONS } from "@/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

/**
 * Check if email is valid
 * @param email - Email to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Check if URL is valid
 * @param url - URL to validate
 * @returns True if valid URL format
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if value is empty (null, undefined, empty string)
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isEmpty(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}

/**
 * Check if string is non-empty
 * @param value - String to check
 * @returns True if string has content
 */
export function isNonEmpty(value: string): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validate XP amount is in reasonable range
 * @param xp - XP amount to validate
 * @returns True if valid XP (0-1000)
 */
export function validateXPAmount(xp: number): boolean {
  return typeof xp === "number" && xp >= 0 && xp <= 1000;
}

/**
 * Validate level is in reasonable range
 * @param level - Level to validate
 * @returns True if valid level (1-100)
 */
export function validateLevelRange(level: number): boolean {
  return typeof level === "number" && level >= 1 && level <= 100;
}

/**
 * Validate streak count
 * @param streak - Streak number to validate
 * @returns True if valid streak (>= 0)
 */
export function validateStreak(streak: number): boolean {
  return typeof streak === "number" && streak >= 0 && Number.isInteger(streak);
}

/**
 * Validate GCSE subject is in allowed list
 * @param subject - Subject to validate
 * @returns True if valid GCSE subject
 */
export function validateSubject(subject: string): boolean {
  if (!subject || typeof subject !== "string") return false;
  return GCSE_SUBJECTS.includes(subject as any);
}

/**
 * Validate grade target is in allowed grades
 * @param grade - Grade to validate
 * @returns True if valid grade target
 */
export function validateGrade(grade: string): boolean {
  if (!grade || typeof grade !== "string") return false;
  return GRADE_OPTIONS.includes(grade);
}

/**
 * Validate display name
 * @param displayName - Name to validate
 * @returns True if name is valid (non-empty, reasonable length)
 */
export function validateDisplayName(displayName: string): boolean {
  if (!displayName || typeof displayName !== "string") return false;
  const trimmed = displayName.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Validate year group is valid
 * @param yearGroup - Year group to validate
 * @returns True if valid year group
 */
export function validateYearGroup(yearGroup: string): boolean {
  if (!yearGroup || typeof yearGroup !== "string") return false;
  return ["YEAR_9", "YEAR_10", "YEAR_11"].includes(yearGroup);
}

/**
 * Validate that a number is within a range
 * @param value - Value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if value is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return typeof value === "number" && value >= min && value <= max;
}

/**
 * Validate string has minimum length
 * @param str - String to check
 * @param minLength - Minimum length required
 * @returns True if string meets minimum length
 */
export function hasMinLength(str: string, minLength: number): boolean {
  return typeof str === "string" && str.length >= minLength;
}

/**
 * Validate string has maximum length
 * @param str - String to check
 * @param maxLength - Maximum length allowed
 * @returns True if string does not exceed max length
 */
export function hasMaxLength(str: string, maxLength: number): boolean {
  return typeof str === "string" && str.length <= maxLength;
}

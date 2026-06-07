/**
 * String manipulation and formatting utilities
 */

import { GCSE_SUBJECTS, GRADE_LABELS } from "@/lib/utils/subjects";

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns String with first letter uppercase
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert a string to title case
 * @param str - String to convert
 * @returns Title Case String
 */
export function toTitleCase(str: string): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Replace underscores with spaces
 * @param str - String with underscores
 * @returns String with underscores replaced by spaces
 */
export function replaceUnderscores(str: string): string {
  if (!str) return "";
  return str.replace(/_/g, " ");
}

/**
 * Convert string to slug format
 * @param str - String to slugify
 * @returns Slugified string (lowercase with hyphens)
 */
export function slugify(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * Sanitize string by removing XSS-risky characters
 * @param str - String to sanitize
 * @returns Sanitized string
 */
export function sanitize(str: string): string {
  if (!str) return "";
  const element = document.createElement("div");
  element.textContent = str;
  return element.innerHTML;
}

/**
 * Truncate string to specified length with ellipsis
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string with "..." if needed
 */
export function truncate(str: string, length: number): string {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

/**
 * Get initials from a name
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials (e.g., "JD")
 */
export function getInitials(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
}

/**
 * Format GCSE subject name for display
 * @param subject - Subject enum value (e.g., "ENGLISH_LANGUAGE")
 * @returns Display name (e.g., "English Language")
 */
export function formatSubjectName(subject: string): string {
  if (!subject) return "";
  const subjectData = (GCSE_SUBJECTS as any)[subject];
  if (subjectData?.label) return subjectData.label;
  return toTitleCase(replaceUnderscores(subject));
}

/**
 * Format grade enum to display name
 * @param grade - Grade enum (e.g., "GRADE_7")
 * @returns Display name (e.g., "Grade 7")
 */
export function formatGradeName(grade: string): string {
  if (!grade) return "";
  const label = (GRADE_LABELS as any)[grade];
  if (label) return label;
  return grade.replace("GRADE_", "Grade ");
}

/**
 * Convert string to readable sentence case
 * @param str - String to convert
 * @returns Sentence Case String
 */
export function toSentenceCase(str: string): string {
  if (!str) return "";
  return capitalize(replaceUnderscores(str.toLowerCase()));
}

/**
 * Remove leading/trailing whitespace and normalize internal spaces
 * @param str - String to normalize
 * @returns Normalized string
 */
export function normalizeString(str: string): string {
  if (!str) return "";
  return str.trim().replace(/\s+/g, " ");
}

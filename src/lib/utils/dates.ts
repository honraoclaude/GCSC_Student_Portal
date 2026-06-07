/**
 * Date and timezone utilities for Europe/London timezone
 * All date operations default to London timezone unless specified
 */

import { getTimezoneOffset } from "date-fns-tz";
import { format, parseISO as fnParseISO, startOfMonth, endOfMonth } from "date-fns";

const TIMEZONE = "Europe/London";

/**
 * Get today's date in Europe/London timezone
 * @returns Today as a Date object in London timezone
 */
export function getToday(): Date {
  const now = new Date();
  const londonTime = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
  londonTime.setHours(0, 0, 0, 0);
  return londonTime;
}

/**
 * Get yesterday's date in Europe/London timezone
 * @returns Yesterday as a Date object in London timezone
 */
export function getYesterdayDate(): Date {
  const today = getToday();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

/**
 * Get today as ISO string in Europe/London timezone
 * @returns Today as ISO date string (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  const today = getToday();
  return today.toISOString().split("T")[0];
}

/**
 * Check if two dates are the same day in Europe/London timezone
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if both dates represent the same calendar day in London
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  const d1 = new Date(date1.toLocaleString("en-US", { timeZone: TIMEZONE }));
  const d2 = new Date(date2.toLocaleString("en-US", { timeZone: TIMEZONE }));

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Check if a date is yesterday in Europe/London timezone
 * @param date - Date to check
 * @returns True if date is yesterday in London timezone
 */
export function isYesterday(date: Date): boolean {
  return isSameDay(date, getYesterdayDate());
}

/**
 * Calculate days elapsed since a date in Europe/London timezone
 * @param date - Date to calculate from
 * @returns Number of days that have passed (integer)
 */
export function daysAgo(date: Date): number {
  const today = getToday();
  const checkDate = new Date(date.toLocaleString("en-US", { timeZone: TIMEZONE }));
  checkDate.setHours(0, 0, 0, 0);

  const timeDiff = today.getTime() - checkDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return Math.max(0, daysDiff);
}

/**
 * Get first day of current month in Europe/London timezone
 * @returns First day of current month
 */
export function getMonthStart(): Date {
  const today = getToday();
  const monthStart = startOfMonth(today);
  return monthStart;
}

/**
 * Get last day of current month in Europe/London timezone
 * @returns Last day of current month
 */
export function getMonthEnd(): Date {
  const today = getToday();
  const monthEnd = endOfMonth(today);
  return monthEnd;
}

/**
 * Format a date for display in UTC
 * @param date - Date to format
 * @returns Formatted date string (e.g., "2024-06-07")
 */
export function formatDateTimeUTC(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * Safely parse an ISO date string
 * @param dateString - ISO date string to parse
 * @returns Parsed Date object or null if invalid
 */
export function parseISO(dateString: string): Date | null {
  try {
    return fnParseISO(dateString);
  } catch {
    return null;
  }
}

/**
 * Get current timestamp for logging
 * @returns Current Unix timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Format a date with custom format string
 * @param date - Date to format
 * @param formatString - date-fns format string
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatString: string = "PPP"): string {
  return format(date, formatString);
}

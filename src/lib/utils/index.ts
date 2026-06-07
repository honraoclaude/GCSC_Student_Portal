/**
 * Central barrel export for all utility functions
 * Import convenience: `import { calculateLevel, getToday } from '@/lib/utils'`
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./math";
export * from "./dates";
export * from "./strings";
export * from "./validation";
export * from "./subjects";

/**
 * Merge Tailwind CSS classes safely
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

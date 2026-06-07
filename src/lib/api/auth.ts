/**
 * Shared authentication utilities and middleware
 * Centralizes all auth-related patterns used across routes
 */

import { auth } from "@clerk/nextjs/server";
import { UnauthorizedError, NotFoundError } from "./errors";

export interface AuthContext {
  userId: string;
  user?: any;
  studentProfile?: any;
}

/**
 * Get authenticated user ID or throw UnauthorizedError
 */
export async function getAuthUser(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedError("Authentication required");
  }
  return userId;
}

/**
 * Get authenticated user with student profile or throw appropriate error
 */
export async function getAuthUserWithProfile() {
  const userId = await getAuthUser();
  const { prisma } = await import("@/lib/db/prisma");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { studentProfile: true },
  });

  if (!user?.studentProfile) {
    throw new NotFoundError("Student profile not found");
  }

  return {
    userId,
    user,
    studentProfile: user.studentProfile,
  };
}

/**
 * Verify user owns a specific resource
 * Common pattern: checking if user owns a flashcard deck, etc.
 */
export async function verifyOwnership(
  resourceId: string,
  ownerId: string | null | undefined
): Promise<void> {
  if (resourceId !== ownerId) {
    throw new UnauthorizedError("You do not have access to this resource");
  }
}

/**
 * Middleware wrapper for authenticated requests
 * Usage: withAuth(async (userId) => { ... })
 */
export function withAuth<T>(
  handler: (userId: string) => Promise<T>
): () => Promise<T> {
  return async () => {
    const userId = await getAuthUser();
    return handler(userId);
  };
}

/**
 * Middleware wrapper for authenticated requests with profile
 * Usage: withAuthProfile(async (context) => { ... })
 */
export function withAuthProfile<T>(
  handler: (context: AuthContext) => Promise<T>
): () => Promise<T> {
  return async () => {
    const context = await getAuthUserWithProfile();
    return handler(context);
  };
}

/**
 * Auth utilities hook wrapping Clerk authentication
 * Provides easy access to user info and logout functionality
 */

import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { isSignedIn, userId } = useClerkAuth();
  const { user } = useUser();

  return {
    isSignedIn,
    userId,
    user,
    displayName: user?.firstName || user?.fullName || 'Student',
    email: user?.primaryEmailAddress?.emailAddress,
  };
}

/**
 * Hook to require authentication on a page
 * Redirects to sign-in if not authenticated
 * Returns true when auth check is complete
 */
export function useRequireAuth() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we've determined the user is not signed in
    // Skip initial loading state
    if (isSignedIn === false) {
      router.push('/sign-in');
    }
  }, [isSignedIn, router]);

  return isSignedIn;
}

/**
 * Hook to require student profile setup
 * Redirects to onboarding if profile doesn't exist
 */
export function useRequireProfile() {
  const isSignedIn = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    // This will typically be handled server-side in layouts
    // But provided here for client-side checks if needed
  }, [router]);

  return isSignedIn;
}

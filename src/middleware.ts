import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
  "/agents(.*)",
  "/learning-hub(.*)",
  "/tutors(.*)",
  "/groups(.*)",
  "/calendar(.*)",
  "/progress(.*)",
  "/achievements(.*)",
  "/settings(.*)",
  "/tutor-dashboard(.*)",
  "/tutor-onboarding(.*)",
  "/tutor-bookings(.*)",
  "/admin(.*)",
  "/api/onboarding(.*)",
  "/api/webhooks(.*)",
  "/api/agents(.*)",
  "/api/flashcards(.*)",
  "/api/tutors(.*)",
  "/api/bookings(.*)",
  "/api/gamification(.*)",
  "/api/progress(.*)",
  "/api/stripe(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

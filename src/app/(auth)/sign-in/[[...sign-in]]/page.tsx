import { SignIn } from "@clerk/nextjs";
import { FadeIn } from "@/components/animations/FadeIn";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-8 py-12 bg-white dark:bg-slate-900">
        <FadeIn duration={300}>
          <div className="max-w-md w-full mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                GC
              </div>
              <span className="font-bold text-slate-900 dark:text-white">GCSC Hub</span>
            </div>

            {/* Headings */}
            <h1 className="text-4xl sm:text-5xl font-bold font-display mb-2 text-slate-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Sign in to continue your learning journey
            </p>

            {/* Clerk SignIn Component */}
            <div className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-slate-700 rounded-lg p-6">
              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    formButtonPrimary:
                      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-200",
                    formFieldInput:
                      "border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-md p-3 focus:border-blue-400 dark:focus:border-blue-400 focus:outline-none transition-colors",
                    footerAction: "text-sm text-slate-600 dark:text-slate-400",
                    footerActionLink: "text-blue-600 dark:text-blue-400 hover:underline",
                  },
                }}
              />
            </div>

            {/* Form Footer */}
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
              New here?{" "}
              <a
                href="/sign-up"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Right Column - Visual */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 items-center justify-center p-8">
        <FadeIn duration={400} delay={200}>
          <div className="text-center">
            <div className="w-48 h-48 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center mb-8 mx-auto">
              <div className="text-7xl">📚</div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-display">
              Your Learning Awaits
            </h2>
            <p className="text-white/80 max-w-sm">
              Sign in to access personalized AI tutoring, smart flashcards, and
              progress tracking.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

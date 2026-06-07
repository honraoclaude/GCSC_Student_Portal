import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 px-4">
      <div className="space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            GCSC Student Hub
          </h1>
          <p className="text-xl text-slate-300">
            Your AI-powered GCSE success platform
          </p>
        </div>

        <p className="max-w-lg text-slate-400">
          Master GCSE with personalized AI tutoring, study planning, and gamified
          learning.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <a
            href="/sign-up"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/sign-in"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-600 px-8 font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

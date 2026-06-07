import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { buttonPrimary, buttonSecondary, heroSection } from "@/styles";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className={heroSection}>
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
            className={`${buttonPrimary} h-12 px-8`}
          >
            Get Started
          </a>
          <a
            href="/sign-in"
            className={`${buttonSecondary} h-12 px-8`}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

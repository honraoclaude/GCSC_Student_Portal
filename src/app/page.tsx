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
      <div className="space-y-8 text-center animate-fade-in">
        <div className="space-y-3 animate-fade-in-up">
          <h1 className="text-5xl font-bold sm:text-7xl bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
            GCSC Student Hub
          </h1>
          <p className="text-xl text-slate-300 font-medium">
            Your AI-powered GCSE success platform
          </p>
        </div>

        <p className="max-w-lg mx-auto text-slate-400 text-lg">
          Master GCSE with personalized AI tutoring, study planning, and gamified
          learning.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <a
            href="/sign-up"
            className={`${buttonPrimary} h-12 px-8 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-semibold`}
          >
            Get Started 🚀
          </a>
          <a
            href="/sign-in"
            className={`${buttonSecondary} h-12 px-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-semibold`}
          >
            Sign In
          </a>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-indigo-400/50 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-white mb-1">AI Tutoring</h3>
            <p className="text-sm text-slate-300">Expert guidance for every subject</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-indigo-400/50 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">🎴</div>
            <h3 className="font-semibold text-white mb-1">Smart Flashcards</h3>
            <p className="text-sm text-slate-300">SM-2 spaced repetition</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-indigo-400/50 hover:bg-white/10 transition-all">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold text-white mb-1">Gamification</h3>
            <p className="text-sm text-slate-300">Earn XP and unlock badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { ImageCard } from '@/components/images/ImageCard';

interface DashboardHeroProps {
  userName?: string;
  level?: number;
  xp?: number;
  streak?: number;
}

export function DashboardHero({
  userName = 'Student',
  level = 12,
  xp = 8450,
  streak = 7,
}: DashboardHeroProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border-2 border-red-200/50 dark:border-red-700/30 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-teal-500 dark:from-red-700 dark:via-orange-600 dark:to-teal-600 relative overflow-hidden p-12">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ready to crush your GCSE goals? Let's keep that streak going!
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm font-semibold mb-2">CURRENT LEVEL</p>
                <p className="text-4xl font-bold text-white">{level}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm font-semibold mb-2">TOTAL XP</p>
                <p className="text-4xl font-bold text-white">{xp.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm font-semibold mb-2">🔥 STREAK</p>
                <p className="text-4xl font-bold text-white">{streak} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Features Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ImageCard
          icon="🤖"
          alt="AI Tutors"
          title="Ask Your AI Tutor"
          description="Get instant help on any subject"
          gradient="from-red-500 to-orange-500"
          height="h-64"
        />
        <ImageCard
          icon="🎴"
          alt="Flashcards"
          title="Study Flashcards"
          description="Smart spaced repetition learning"
          gradient="from-orange-500 to-amber-500"
          height="h-64"
        />
        <ImageCard
          icon="📈"
          alt="Progress"
          title="Track Progress"
          description="See your improvement over time"
          gradient="from-teal-500 to-cyan-500"
          height="h-64"
        />
      </div>
    </div>
  );
}

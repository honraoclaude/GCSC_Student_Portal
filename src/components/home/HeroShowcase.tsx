'use client';

import { ImageCard } from '@/components/images/ImageCard';
import { SlideUp } from '@/components/animations/SlideUp';

export function HeroShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SlideUp duration={300} delay={0}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white font-display">
            See <span className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">Your Learning</span> in Action
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-300 mb-16 max-w-2xl mx-auto">
            Experience a platform designed for modern students. Interactive, engaging, and results-driven.
          </p>
        </SlideUp>

        {/* Image Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Tutors */}
          <SlideUp duration={300} delay={100}>
            <ImageCard
              icon="🤖"
              alt="AI Tutors"
              title="AI Tutors"
              description="Get instant help from 8 specialized AI agents"
              gradient="from-red-500 to-orange-500"
            />
          </SlideUp>

          {/* Smart Flashcards */}
          <SlideUp duration={300} delay={150}>
            <ImageCard
              icon="🎴"
              alt="Smart Flashcards"
              title="Smart Flashcards"
              description="SM-2 algorithm for optimal spaced repetition"
              gradient="from-orange-500 to-amber-500"
            />
          </SlideUp>

          {/* Real Tutors */}
          <SlideUp duration={300} delay={200}>
            <ImageCard
              icon="👥"
              alt="Real Tutors"
              title="Real Tutors"
              description="Connect with verified tutors instantly"
              gradient="from-teal-500 to-cyan-500"
            />
          </SlideUp>

          {/* Dashboard */}
          <SlideUp duration={300} delay={250}>
            <ImageCard
              icon="📊"
              alt="Smart Dashboard"
              title="Smart Dashboard"
              description="Track progress with beautiful analytics"
              gradient="from-pink-500 to-red-500"
            />
          </SlideUp>

          {/* Gamification */}
          <SlideUp duration={300} delay={300}>
            <ImageCard
              icon="🏆"
              alt="Gamification"
              title="Gamification"
              description="Earn achievements and climb the leaderboard"
              gradient="from-yellow-500 to-orange-500"
            />
          </SlideUp>

          {/* Study Groups */}
          <SlideUp duration={300} delay={350}>
            <ImageCard
              icon="📚"
              alt="Study Groups"
              title="Study Groups"
              description="Collaborate with classmates on group projects"
              gradient="from-green-500 to-teal-500"
            />
          </SlideUp>
        </div>
      </div>
    </section>
  );
}

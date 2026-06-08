'use client';

import { SlideUp } from '@/components/animations/SlideUp';

export function FeatureShowcase() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Tutors',
      description: 'Get instant help from 8 specialized AI agents',
      color: 'from-red-500 to-orange-500',
      emoji: '🧠',
    },
    {
      icon: '🎴',
      title: 'Flashcards',
      description: 'Smart spaced repetition learning',
      color: 'from-orange-500 to-amber-500',
      emoji: '📚',
    },
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'Beautiful progress tracking',
      color: 'from-pink-500 to-red-500',
      emoji: '📈',
    },
    {
      icon: '👥',
      title: 'Real Tutors',
      description: 'Connect with verified tutors',
      color: 'from-teal-500 to-cyan-500',
      emoji: '💼',
    },
    {
      icon: '🏆',
      title: 'Gamification',
      description: 'Earn achievements and climb leaderboard',
      color: 'from-yellow-500 to-orange-500',
      emoji: '⭐',
    },
    {
      icon: '📚',
      title: 'Study Groups',
      description: 'Collaborate with classmates',
      color: 'from-green-500 to-teal-500',
      emoji: '🤝',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-orange-50 dark:from-slate-900 dark:to-orange-950">
      <div className="max-w-7xl mx-auto">
        <SlideUp duration={300} delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 font-display">
              Powerful <span className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to ace your GCSEs
            </p>
          </div>
        </SlideUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <SlideUp key={idx} delay={idx * 50} duration={300}>
              <div className={`group relative rounded-2xl overflow-hidden border-2 border-orange-200/50 dark:border-orange-700/30 bg-gradient-to-br ${feature.color} p-1 hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                {/* Inner Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 h-full">
                  {/* Icon */}
                  <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                    {feature.emoji}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-300`}></div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}

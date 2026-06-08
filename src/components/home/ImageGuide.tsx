'use client';

import { ImageCard } from '@/components/images/ImageCard';
import { SlideUp } from '@/components/animations/SlideUp';

const imagePrompts = [
  {
    section: 'Hero Section',
    icon: '🎓',
    title: 'AI Learning Platform',
    description: 'Diverse students studying with AI tutors, glowing tech elements, modern workspace',
    prompt: 'A diverse group of happy UK students (ages 13-18) studying together with floating holographic AI elements around them, modern minimalist study room, neon coral and teal accents, cyberpunk aesthetic, ultra high quality, 8k',
  },
  {
    section: 'Dashboard Hero',
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Beautiful dashboard with charts, progress bars, student achievements displayed',
    prompt: 'Modern digital dashboard interface showing student progress, glowing coral and teal elements, beautiful gradient backgrounds, holographic charts and statistics, premium UI design, 8k quality',
  },
  {
    section: 'Flashcards Feature',
    icon: '🎴',
    title: 'Smart Study Cards',
    description: 'Animated flashcards flipping, showing study progress and mastery',
    prompt: '3D holographic flashcards floating in space, coral and orange gradients, vibrant study environment, dynamic lighting, premium educational aesthetic, high detail, 8k',
  },
  {
    section: 'Tutor Marketplace',
    icon: '👨‍🏫',
    title: 'Expert Tutors',
    description: 'Professional tutors from different backgrounds, warm and approachable',
    prompt: 'Diverse, professional, approachable tutors (multiple ethnicities, male and female) smiling, modern tutoring room, warm lighting, educational setting, coral and teal accents, premium photography style, 8k',
  },
  {
    section: 'Achievement Badges',
    icon: '🏆',
    title: 'Achievements Unlocked',
    description: 'Golden and premium looking achievement badges with celebratory aura',
    prompt: 'Premium achievement badges glowing with golden light, trophy designs, celebratory confetti, coral and gold gradients, luxury feel, 3D rendered, highly detailed, 8k',
  },
  {
    section: 'Leaderboard',
    icon: '⭐',
    title: 'Top Performers',
    description: 'Competitive leaderboard with winners celebrated, medals and rankings',
    prompt: 'Leaderboard interface showing top students with medals, celebratory fireworks, coral teal gold colors, competitive gaming aesthetic, premium design, 8k quality',
  },
];

export function ImageGuide() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-red-50/30 to-white dark:from-slate-900 dark:via-red-900/20 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <SlideUp duration={300} delay={0}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white font-display">
            Image <span className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">Generation Guide</span>
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-300 mb-16 max-w-3xl mx-auto">
            Ready to generate professional images? Here are the AI prompts optimized for Midjourney or DALL-E 3. Copy and customize these prompts to create stunning visuals.
          </p>
        </SlideUp>

        {/* Image Prompts Grid */}
        <div className="space-y-8">
          {imagePrompts.map((item, idx) => (
            <SlideUp key={idx} delay={idx * 50} duration={300}>
              <div className="rounded-2xl border-2 border-orange-200/50 dark:border-orange-700/30 bg-white dark:bg-slate-800/50 p-8 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  {/* Icon & Title */}
                  <div className="flex-shrink-0">
                    <div className="text-5xl mb-2">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.section}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{item.description}</p>

                    {/* Prompt Box */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-orange-200/50 dark:border-orange-700/30">
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2 uppercase tracking-wider">Midjourney / DALL-E Prompt:</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                        {item.prompt}
                      </p>
                      <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-200">
                        📋 Copy Prompt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>

        {/* Generation Instructions */}
        <SlideUp duration={300} delay={300}>
          <div className="mt-16 rounded-2xl border-2 border-teal-200/50 dark:border-teal-700/30 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">✨ How to Generate Images</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🎨 Using Midjourney:</h4>
                <ol className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>1. Open Midjourney Discord</li>
                  <li>2. Type: /imagine</li>
                  <li>3. Paste the prompt above</li>
                  <li>4. Add: --ar 16:9 --quality 2</li>
                  <li>5. Generate & upscale!</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🖼️ Using DALL-E 3:</h4>
                <ol className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>1. Visit OpenAI DALL-E</li>
                  <li>2. Paste the prompt</li>
                  <li>3. Select quality: HD</li>
                  <li>4. Style: Vivid</li>
                  <li>5. Generate & download!</li>
                </ol>
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}

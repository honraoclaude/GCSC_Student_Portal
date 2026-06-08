'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';

export function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 via-orange-500 to-teal-500 dark:from-red-700 dark:via-orange-600 dark:to-teal-600">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display text-white">
            Ready to Transform Your Grades?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join 50,000+ students improving with AI
          </p>

          <form
            className="flex flex-col gap-4 max-w-sm mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/sign-up');
            }}
          >
            <input
              type="email"
              placeholder="your.email@example.com"
              required
              className="px-6 py-3 rounded-lg text-slate-900 placeholder-slate-500 border-2 border-transparent focus:border-orange-300 focus:outline-none transition-all"
            />
            <Button
              variant="secondary"
              size="md"
              className="h-12 w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              Start Free Trial
            </Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

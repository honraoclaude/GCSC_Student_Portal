'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function HeroButtons() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Button
        variant="primary"
        size="md"
        className="h-12 px-8 text-base"
        onClick={() => router.push('/sign-up')}
      >
        Start Free Trial
      </Button>
      <Button
        variant="outline"
        size="md"
        className="h-12 px-8 text-base border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/50"
        onClick={() => {
          const element = document.getElementById('features');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        See Demo
      </Button>
    </div>
  );
}

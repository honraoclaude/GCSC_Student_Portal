"use client";

import { useEffect, useState } from "react";

interface CounterStatProps {
  target: number;
  suffix?: string;
  delay?: number;
}

export default function CounterStat({
  target,
  suffix = "",
  delay = 0,
}: CounterStatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const incrementCount = target / (duration / 16);
      let current = 0;

      const interval = setInterval(() => {
        current += incrementCount;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

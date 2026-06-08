import React from "react";
import { Card } from "@/components/cards/Card";

interface TestimonialProps {
  name: string;
  achievement: string;
  quote: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialProps;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card
      variant="default"
      className="p-6 border-2 border-blue-200 dark:border-slate-700 hover:shadow-lg hover:scale-105 transition-all duration-200 h-full flex flex-col bg-blue-50/95 dark:bg-slate-800"
    >
      {/* Avatar & Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-3 border-blue-500 dark:border-blue-400 flex items-center justify-center text-2xl">
          {testimonial.avatar}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
          {testimonial.name}
        </h3>
      </div>

      {/* Achievement Badge */}
      <div className="inline-flex items-center gap-1 mb-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
        <span className="text-xs font-semibold">{testimonial.achievement}</span>
      </div>

      {/* Quote */}
      <p className="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
        "{testimonial.quote}"
      </p>

      {/* Rating */}
      <div className="flex flex-col items-start">
        <div className="flex gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg text-yellow-400">
              ⭐
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">4.8/5</p>
      </div>
    </Card>
  );
}

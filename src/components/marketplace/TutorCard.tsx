"use client";

import React from "react";
import Link from "next/link";
import { cardElevated, cn } from "@/styles";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface TutorCardProps {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
}

export function TutorCard({
  id,
  name,
  avatar,
  subjects,
  hourlyRate,
  rating,
  reviewCount,
}: TutorCardProps) {
  const subjectColors: Record<string, string> = {
    Mathematics: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    Physics: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700",
    Chemistry: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
    Biology: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
    "English Language": "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
    "English Literature": "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700",
    "Computer Science": "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
    Economics: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
    Business: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
    Geography: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700",
    History: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700",
  };

  return (
    <div
      className={cn(
        cardElevated,
        "p-6 hover:scale-105 hover:shadow-2xl cursor-pointer transition-transform duration-300 h-full flex flex-col"
      )}
    >
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-3xl overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{name.charAt(0)}</span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-2">
        {name}
      </h3>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300 dark:text-slate-600"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {rating}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({reviewCount})
        </span>
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {subjects.slice(0, 2).map((subject) => (
          <span
            key={subject}
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full border",
              subjectColors[subject] ||
                "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            )}
          >
            {subject}
          </span>
        ))}
        {subjects.length > 2 && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            +{subjects.length - 2}
          </span>
        )}
      </div>

      {/* Rate */}
      <div className="text-center mb-4 flex-1">
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          £{hourlyRate}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">/hour</p>
      </div>

      {/* Book Button */}
      <Link href={`/marketplace/tutors/${id}`} className="w-full">
        <Button variant="primary" size="md" className="w-full">
          View Profile →
        </Button>
      </Link>
    </div>
  );
}

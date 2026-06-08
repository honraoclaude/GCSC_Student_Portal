"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTutorById } from "@/lib/mockTutors";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, BookOpen } from "lucide-react";
import { cn } from "@/styles";

export default function TutorProfilePage() {
  const params = useParams();
  const tutorId = params.tutorId as string;
  const tutor = getTutorById(tutorId);

  if (!tutor) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Tutor not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The tutor you're looking for doesn't exist.
        </p>
        <Link href="/marketplace">
          <Button variant="primary">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
    <div className="space-y-8">
      {/* ===== BACK BUTTON ===== */}
      <Link href="/marketplace">
        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          ← Back to Marketplace
        </button>
      </Link>

      {/* ===== HEADER SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-6xl overflow-hidden flex-shrink-0">
              {tutor.avatar}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {tutor.name}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {tutor.yearsExperience} years of teaching experience
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={cn(
                        i < Math.floor(tutor.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-600"
                      )}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {tutor.rating}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tutor.reviewCount} reviews
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                £{tutor.hourlyRate}/hour
              </div>

              {/* CTA Button */}
              <Link href={`/marketplace/booking/${tutor.id}`} className="inline-block">
                <Button variant="primary" size="lg" className="gap-2">
                  <BookOpen size={20} />
                  Book a Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BIO SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          About
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {tutor.bio}
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <Clock size={20} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Teaching Experience:</span> {tutor.yearsExperience} years
            </p>
          </div>
        </div>
      </div>

      {/* ===== QUALIFICATIONS SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Qualifications
        </h2>
        <ul className="space-y-3">
          {tutor.qualifications.map((qual, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              {qual}
            </li>
          ))}
        </ul>
      </div>

      {/* ===== SUBJECTS SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Subjects Taught
        </h2>
        <div className="flex flex-wrap gap-3">
          {tutor.subjects.map((subject) => (
            <span
              key={subject}
              className={cn(
                "text-sm font-semibold px-4 py-2 rounded-full border",
                subjectColors[subject] ||
                  "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              )}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* ===== AVAILABILITY SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Availability
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {days.map((day, idx) => (
            <div
              key={day}
              className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {dayLabels[idx]}
              </h3>
              {tutor.availability[day] && tutor.availability[day].length > 0 ? (
                <ul className="space-y-1">
                  {tutor.availability[day].map((time, timeIdx) => (
                    <li
                      key={timeIdx}
                      className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                      <Clock size={14} />
                      {time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Not available
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== REVIEWS SECTION ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Student Reviews
        </h2>
        <div className="space-y-6">
          {tutor.reviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {review.studentName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {review.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-600"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="relative rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur p-8 overflow-hidden">
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">
            Ready to start learning?
          </h3>
          <p className="text-indigo-900 dark:text-indigo-200 mb-6">
            Book your first session with {tutor.name} today. Cancel anytime if
            you're not satisfied.
          </p>
          <Link href={`/marketplace/booking/${tutor.id}`}>
            <Button
              variant="primary"
              size="lg"
              className="gap-2"
            >
              <BookOpen size={20} />
              Book a Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

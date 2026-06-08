"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  LayoutDashboard,
  BookOpen,
  Copy,
} from "lucide-react";
import { getTutorById } from "@/lib/mockTutors";

interface BookingData {
  tutorId: string;
  tutorName: string;
  date: string;
  time: string;
  duration: number;
  subject: string;
  topic?: string;
  price: number;
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [tutor, setTutor] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const bookingData = sessionStorage.getItem("pendingBooking");
    if (bookingData) {
      const data = JSON.parse(bookingData) as BookingData;
      setBooking(data);
      const tutorData = getTutorById(data.tutorId);
      setTutor(tutorData);
      // Clear the session data
      sessionStorage.removeItem("pendingBooking");
    }
  }, []);

  const copyConfirmationCode = () => {
    const code = `GCSC${Date.now().toString().slice(-8)}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!booking || !tutor) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Loading...
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          If this page doesn't load, please go back and try booking again.
        </p>
        <div className="mt-6">
          <Link href="/marketplace">
            <Button variant="primary">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const confirmationCode = `GCSC${Date.now().toString().slice(-8)}`;

  return (
    <div className="space-y-8">
      {/* ===== SUCCESS HEADER ===== */}
      <div className="relative rounded-2xl border border-emerald-200/30 dark:border-emerald-200/20 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/40 backdrop-blur p-12 overflow-hidden text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 dark:bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex justify-center mb-4">
            <CheckCircle
              size={64}
              className="text-emerald-600 dark:text-emerald-400 animate-bounce"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-emerald-100">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-emerald-900 dark:text-emerald-200 max-w-2xl mx-auto">
            Your session with {tutor.name} has been successfully booked. You'll
            receive a confirmation email shortly.
          </p>
        </div>
      </div>

      {/* ===== CONFIRMATION CODE ===== */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Confirmation Code
        </p>
        <div className="flex items-center justify-center gap-3 mb-3">
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {confirmationCode}
          </p>
          <button
            onClick={copyConfirmationCode}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Copy
              size={20}
              className="text-slate-600 dark:text-slate-400"
            />
          </button>
        </div>
        {copied && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Copied to clipboard!
          </p>
        )}
      </div>

      {/* ===== BOOKING DETAILS ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Booking Details
        </h2>

        <div className="space-y-6">
          {/* Tutor Info */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-2xl flex-shrink-0">
              {tutor.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {tutor.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {tutor.yearsExperience} years experience
              </p>
            </div>
          </div>

          {/* Session Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Date */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-indigo-600 dark:text-indigo-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Date
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {new Date(booking.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Time */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Time
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {booking.time}
              </p>
            </div>

            {/* Duration */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Duration
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {booking.duration} minutes
              </p>
            </div>

            {/* Subject */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={18} className="text-indigo-600 dark:text-indigo-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Subject
                </p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {booking.subject}
              </p>
            </div>
          </div>

          {/* Topic if provided */}
          {booking.topic && (
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">
                Topic
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {booking.topic}
              </p>
            </div>
          )}

          {/* Price Summary */}
          <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={18} className="text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Price
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-700 dark:text-slate-300">
                £{tutor.hourlyRate} × {booking.duration} min
              </p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                £{booking.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          What Happens Next
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Confirmation Email
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                You'll receive a confirmation email with session details and a video
                call link.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Join the Session
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Click the video link 5 minutes before your scheduled time to join
                the session.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Start Learning
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Your tutor will help you achieve your learning goals with
                personalized instruction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/marketplace" className="flex-1">
          <Button variant="secondary" size="lg" className="w-full">
            Browse More Tutors
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button variant="primary" size="lg" className="w-full gap-2">
            <LayoutDashboard size={20} />
            Go to Dashboard
          </Button>
        </Link>
      </div>

      {/* ===== CANCELLATION POLICY ===== */}
      <div className="relative rounded-2xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-950/40 backdrop-blur p-8 overflow-hidden">
        <div className="relative z-10">
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
            📋 Cancellation Policy
          </p>
          <ul className="space-y-2 text-blue-900 dark:text-blue-200 text-sm">
            <li>
              • <span className="font-semibold">24+ hours before:</span> Full refund
            </li>
            <li>
              • <span className="font-semibold">12-24 hours before:</span> 50% refund
            </li>
            <li>
              • <span className="font-semibold">Less than 12 hours:</span> No refund
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

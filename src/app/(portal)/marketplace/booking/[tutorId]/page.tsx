"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getTutorById } from "@/lib/mockTutors";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  BookOpen,
  CreditCard,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/styles";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const tutorId = params.tutorId as string;
  const tutor = getTutorById(tutorId);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  if (!tutor) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Tutor not found
        </h1>
        <Link href="/marketplace">
          <Button variant="primary">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = parseInt(duration) * tutor.hourlyRate;

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmBooking = () => {
    // Store booking data in session/state
    const bookingData = {
      tutorId: tutor.id,
      tutorName: tutor.name,
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(duration),
      subject,
      topic,
      price: totalPrice,
    };
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    router.push("/marketplace/booking/confirmation");
  };

  // Generate dates for next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Get available times based on selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    const dayOfWeek = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
    }).toLowerCase();
    return tutor.availability[dayOfWeek] || [];
  };

  const availableTimes = getAvailableTimes();

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Select Date & Time
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Pick a Date
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {availableDates.map((date) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={cn(
                          "p-3 rounded-lg border-2 transition-all text-left",
                          isSelected
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30"
                            : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                        )}
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Pick a Time
                </label>
                {selectedDate ? (
                  <div className="space-y-2">
                    {availableTimes.length > 0 ? (
                      availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "w-full p-3 rounded-lg border-2 transition-all text-left",
                            selectedTime === time
                              ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30"
                              : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                          )}
                        >
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {time}
                          </p>
                        </button>
                      ))
                    ) : (
                      <p className="text-slate-600 dark:text-slate-400 p-4 text-center">
                        No available times for this date
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 p-4 text-center">
                    Select a date first
                  </p>
                )}
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Session Duration
              </label>
              <div className="flex gap-2">
                {["30", "60", "90", "120"].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDuration(dur)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 font-medium transition-all",
                      duration === dur
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300"
                    )}
                  >
                    {dur} min
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Select Subject & Topic
            </h3>
            <div className="space-y-4">
              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600"
                >
                  <option value="">Choose a subject...</option>
                  {tutor.subjects.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Topic (Optional)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Quadratic Equations, Photosynthesis..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Review Your Booking
            </h3>
            <div className="space-y-4">
              {/* Tutor Info */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Tutor
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {tutor.name}
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Date
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Time
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedTime}
                  </p>
                </div>
              </div>

              {/* Duration & Subject */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Duration
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {duration} minutes
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                    <BookOpen size={16} />
                    Subject
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {subject || "Not selected"}
                  </p>
                </div>
              </div>

              {topic && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Topic
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {topic}
                  </p>
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t-2 border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    £{tutor.hourlyRate} × {duration} min
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    £{(totalPrice / 60).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    £{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Payment
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-6">
                <div className="flex items-center justify-center mb-4">
                  <CreditCard
                    size={48}
                    className="text-slate-400 dark:text-slate-600"
                  />
                </div>
                <p className="text-center text-slate-900 dark:text-white font-semibold mb-2">
                  Payment Method
                </p>
                <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
                  This is a demo. In production, this would integrate with Stripe.
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-slate-600 dark:text-slate-400">
                    Session price
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    £{totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center text-lg border-t border-slate-200 dark:border-slate-700 pt-3">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    £{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                By booking, you agree to our terms and conditions. You can cancel up
                to 24 hours before the session for a full refund.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* ===== BACK BUTTON ===== */}
      <Link href={`/marketplace/tutors/${tutorId}`}>
        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          ← Back to Profile
        </button>
      </Link>

      {/* ===== PROGRESS STEPS ===== */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                s <= step
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              )}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 transition-all",
                  s < step
                    ? "bg-indigo-600"
                    : "bg-slate-200 dark:bg-slate-700"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== STEP LABELS ===== */}
      <div className="grid grid-cols-4 gap-2 text-center mb-8">
        <p
          className={cn(
            "text-xs font-medium",
            step === 1
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-600 dark:text-slate-400"
          )}
        >
          Date & Time
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            step === 2
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-600 dark:text-slate-400"
          )}
        >
          Subject
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            step === 3
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-600 dark:text-slate-400"
          )}
        >
          Review
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            step === 4
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-600 dark:text-slate-400"
          )}
        >
          Payment
        </p>
      </div>

      {/* ===== STEP CONTENT ===== */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8">
        {renderStepContent()}
      </div>

      {/* ===== NAVIGATION BUTTONS ===== */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={handlePrevStep}
          disabled={step === 1}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
            step === 1
              ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {step < 4 ? (
          <button
            onClick={handleNextStep}
            disabled={
              (step === 1 && (!selectedDate || !selectedTime)) ||
              (step === 2 && !subject)
            }
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
              step === 1 && (!selectedDate || !selectedTime)
                ? "opacity-50 cursor-not-allowed"
                : step === 2 && !subject
                  ? "opacity-50 cursor-not-allowed"
                  : "",
              "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            Next
            <ChevronRight size={20} />
          </button>
        ) : (
          <button
            onClick={handleConfirmBooking}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
          >
            <BookOpen size={20} />
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cardElevated, cn } from "@/styles";
import { X } from "lucide-react";

interface FilterOptions {
  subjects: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
  availability: string;
}

interface TutorFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const allSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Language",
  "English Literature",
  "Computer Science",
  "Economics",
  "Business",
  "Geography",
  "History",
];

export function TutorFilter({
  onFilterChange,
  isOpen = true,
  onClose,
}: TutorFilterProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([25, 100]);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState("");

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({
      subjects: selectedSubjects,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating: minRating,
      availability,
    });
  };

  const handleReset = () => {
    setSelectedSubjects([]);
    setPriceRange([25, 100]);
    setMinRating(0);
    setAvailability("");
    onFilterChange({
      subjects: [],
      minPrice: 25,
      maxPrice: 100,
      rating: 0,
      availability: "",
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Subjects */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
          Subjects
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allSubjects.map((subject) => (
            <label key={subject} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {subject}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
          Hourly Rate (£)
        </h3>
        <div className="space-y-3">
          <input
            type="range"
            min="20"
            max="150"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full accent-indigo-600"
          />
          <input
            type="range"
            min="20"
            max="150"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full accent-indigo-600"
          />
          <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>£{priceRange[0]}</span>
            <span>-</span>
            <span>£{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
          Minimum Rating
        </h3>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                minRating === rating
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              )}
            >
              {rating === 0 ? "Any" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
          Availability
        </h3>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
        >
          <option value="">Any time</option>
          <option value="morning">Morning (6AM - 12PM)</option>
          <option value="afternoon">Afternoon (12PM - 6PM)</option>
          <option value="evening">Evening (6PM - 10PM)</option>
          <option value="weekends">Weekends only</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );

  // Desktop sidebar
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          cardElevated,
          "hidden lg:block p-6 h-fit sticky top-6 rounded-2xl"
        )}
      >
        {filterContent}
      </div>

      {/* Mobile Bottom Sheet */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <div
            className={cn(
              cardElevated,
              "fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Filter Tutors
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            {filterContent}
          </div>
        </>
      )}
    </>
  );
}

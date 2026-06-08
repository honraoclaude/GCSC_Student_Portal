"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TutorCard, TutorFilter, TutorSearch } from "@/components/marketplace";
import { mockTutors, filterTutors } from "@/lib/mockTutors";
import { Button } from "@/components/ui/button";
import { Filter, BookOpen } from "lucide-react";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    minPrice: 25,
    maxPrice: 100,
    rating: 0,
    availability: "",
  });

  const filteredTutors = useMemo(
    () => filterTutors(searchQuery, filters),
    [searchQuery, filters]
  );

  return (
    <div className="space-y-8">
      {/* ===== HERO SECTION ===== */}
      <div className="relative rounded-2xl border border-indigo-200/30 dark:border-indigo-200/20 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur p-12 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 space-y-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Find Your Perfect Tutor
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connect with experienced GCSE tutors. Browse profiles, check ratings, and book sessions that fit your schedule.
          </p>
        </div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            10,000+
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Expert Tutors
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            98%
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Satisfaction Rate
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            £25-100
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            per hour
          </p>
        </div>
      </div>

      {/* ===== SEARCH & FILTER SECTION ===== */}
      <div className="space-y-4">
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex-1">
            <TutorSearch onSearch={setSearchQuery} />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filter - Desktop Only */}
        <div className="hidden lg:block">
          <TutorFilter onFilterChange={setFilters} isOpen={true} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mobile Filter */}
          <TutorFilter
            onFilterChange={setFilters}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />

          {/* Results Section */}
          {filteredTutors.length > 0 ? (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Showing {filteredTutors.length} tutor
                {filteredTutors.length !== 1 ? "s" : ""}
              </p>
              <div className="grid gap-6 md:grid-cols-2 auto-rows-max">
                {filteredTutors.map((tutor, idx) => (
                  <div
                    key={tutor.id}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    className="animate-fade-in-up"
                  >
                    <TutorCard
                      id={tutor.id}
                      name={tutor.name}
                      avatar={tutor.avatar}
                      subjects={tutor.subjects}
                      hourlyRate={tutor.hourlyRate}
                      rating={tutor.rating}
                      reviewCount={tutor.reviewCount}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
              <BookOpen
                size={48}
                className="mx-auto text-slate-400 dark:text-slate-600 mb-4 opacity-50"
              />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No tutors found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Try adjusting your search or filters to find the perfect tutor
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery("");
                  setFilters({
                    subjects: [],
                    minPrice: 25,
                    maxPrice: 100,
                    rating: 0,
                    availability: "",
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div className="relative rounded-2xl border border-blue-200/30 dark:border-blue-200/20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-950/40 backdrop-blur p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </p>
          <p className="text-blue-900 dark:text-blue-200 mb-4">
            Check tutor reviews and ratings to find the perfect match for your learning style. Many tutors offer a free 15-minute consultation first!
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/styles";

interface TutorSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function TutorSearch({
  onSearch,
  placeholder = "Search tutors by name, subject...",
}: TutorSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className={cn(
          "w-full pl-12 pr-4 py-3 rounded-lg",
          "border-2 border-slate-200 dark:border-slate-700",
          "bg-white dark:bg-slate-800",
          "text-slate-900 dark:text-white",
          "placeholder-slate-500 dark:placeholder-slate-400",
          "focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
          "dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20",
          "transition-all duration-200"
        )}
      />
    </div>
  );
}

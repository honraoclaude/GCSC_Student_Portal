import React from "react";
import { Card } from "./Card";
import { textMuted, textSubtle, cn } from "@/styles";

interface StatCardProps {
  icon?: string;
  label: string;
  value: string | number;
  description?: string;
  colorClass?: string; // e.g., "from-indigo-500 to-purple-500"
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  description,
  colorClass = "from-indigo-500 to-purple-500",
  className = "",
}: StatCardProps) {
  return (
    <Card variant="default" className={cn("p-6 group rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 dark:from-white/5 dark:to-white/5 backdrop-blur-xl hover:border-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-200", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn("text-sm font-medium mb-2 uppercase tracking-wider", textMuted)}>
            {label}
          </p>
          <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
            {value}
          </p>
          {description && (
            <p className={cn("mt-3 text-xs", textSubtle)}>
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="ml-4 text-4xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

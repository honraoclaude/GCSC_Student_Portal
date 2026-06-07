import React from "react";
import { Card } from "./Card";

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
    <Card variant="default" className={`p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            {label}
          </p>
          <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
            {value}
          </p>
          {description && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="ml-4 text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

import React from "react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  action,
  className = "",
  hoverable = true,
}: FeatureCardProps) {
  return (
    <Card variant="default" hoverable={hoverable} className={`p-6 ${className}`}>
      <div className="space-y-3">
        {icon && <div className="text-3xl">{icon}</div>}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        {action && <div className="pt-2">{action}</div>}
      </div>
    </Card>
  );
}

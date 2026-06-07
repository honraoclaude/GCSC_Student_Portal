import React from "react";
import { Card } from "./Card";
import { textMuted, cn } from "@/styles";

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
    <Card variant="default" hoverable={hoverable} className={cn("p-6", className)}>
      <div className="space-y-3">
        {icon && <div className="text-3xl">{icon}</div>}

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className={cn("mt-2 text-sm", textMuted)}>
            {description}
          </p>
        </div>

        {action && <div className="pt-2">{action}</div>}
      </div>
    </Card>
  );
}

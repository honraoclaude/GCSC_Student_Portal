import React from "react";
import { textMuted, cn } from "@/styles";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  backButton?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
  backButton,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backButton && <div className="mb-4">{backButton}</div>}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className={cn("mt-2", textMuted)}>
              {description}
            </p>
          )}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "glass";
  hoverable?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = "default",
  hoverable = false,
  className = "",
}: CardProps) {
  const baseStyles =
    "rounded-2xl border shadow-sm transition-all duration-300";

  const variantStyles = {
    default: "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900",
    gradient:
      "border-white/10 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl",
    glass:
      "border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-xl",
  };

  const hoverStyles = hoverable
    ? "hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    : "";

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

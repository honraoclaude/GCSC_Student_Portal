import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonVariantsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm font-medium rounded-lg",
  md: "px-4 py-2.5 text-sm font-semibold rounded-lg",
  lg: "px-6 py-3 text-base font-semibold rounded-lg",
};

export function ButtonVariants({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonVariantsProps) {
  const isDisabled = disabled || loading;

  const iconContent = icon ? (
    <span className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"}>
      {icon}
    </span>
  ) : null;

  return (
    <button
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading && <LoadingSpinner size={size === "lg" ? "sm" : "sm"} />}
      {!loading && iconPosition === "left" && iconContent}
      <span>{children}</span>
      {!loading && iconPosition === "right" && iconContent}
    </button>
  );
}

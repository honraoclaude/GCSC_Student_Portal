import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { buttonPrimary, buttonSecondary, buttonGhost, buttonDanger, cn, focusRing } from "@/styles";

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
  primary: buttonPrimary,
  secondary: buttonSecondary,
  ghost: buttonGhost,
  danger: buttonDanger,
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
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all outline-none",
        focusRing,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading && <LoadingSpinner size={size === "lg" ? "sm" : "sm"} />}
      {!loading && iconPosition === "left" && iconContent}
      <span>{children}</span>
      {!loading && iconPosition === "right" && iconContent}
    </button>
  );
}

import React from "react";
import { cardElevated, cardGradient, cardHoverable, cn } from "@/styles";

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
  const variantStyles = {
    default: cardElevated,
    gradient: cardGradient,
    glass: hoverable ? cardHoverable : cardGradient,
  };

  return (
    <div className={cn(variantStyles[variant], className)}>
      {children}
    </div>
  );
}

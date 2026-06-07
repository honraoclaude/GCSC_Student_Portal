import React from "react";
import { Card } from "@/components/cards/Card";

interface PageCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PageCard({ children, className = "" }: PageCardProps) {
  return (
    <Card variant="default" className={`p-8 ${className}`}>
      {children}
    </Card>
  );
}

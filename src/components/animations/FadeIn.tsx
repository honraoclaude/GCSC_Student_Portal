import React from 'react'

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
}

export function FadeIn({
  children,
  delay = 0,
  duration = 300,
  ...props
}: FadeInProps) {
  return (
    <div
      className="animate-fadeIn"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

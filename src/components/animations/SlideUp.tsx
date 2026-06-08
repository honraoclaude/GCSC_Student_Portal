import React from 'react'

interface SlideUpProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
}

export function SlideUp({
  children,
  delay = 0,
  duration = 300,
  ...props
}: SlideUpProps) {
  return (
    <div
      className="animate-slideUp"
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

"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-md py-sm">
      <div className="flex gap-1.5">
        <div
          className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

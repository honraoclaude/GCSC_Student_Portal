"use client";

import { VisualiseButton } from "@/components/agents/VisualiseButton";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-slideUp`}
    >
      <div
        className={`max-w-[70%] md:max-w-[60%] rounded-lg px-md py-sm md:px-lg md:py-md shadow-sm transition-all duration-200 ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-bl-2xl"
            : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-br-2xl"
        }`}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
          {content}
        </p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser
                ? "text-blue-100 opacity-70"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      {!isUser && content.length > 80 && !content.startsWith("Sorry, I encountered") && (
        <div className="w-full max-w-2xl">
          <VisualiseButton messageContent={content} />
        </div>
      )}
    </div>
  );
}

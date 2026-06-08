"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  disabled = false,
  loading = false,
  placeholder = "Ask me anything...",
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = Math.min(textarea.scrollHeight, 300);
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled && !loading) {
      onSubmit(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      // Shift+Enter: submit
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-md z-10"
    >
      <div className="flex gap-sm items-flex-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          className="flex-1 min-h-[80px] rounded-md border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-400 focus:outline-none focus:ring-0 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-md py-sm resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          rows={3}
        />
        <Button
          type="submit"
          disabled={disabled || loading || !input.trim()}
          className="h-[48px] w-[48px] p-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center flex-shrink-0"
        >
          {loading ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <span className="text-lg">↗</span>
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
        Shift + Enter to send
      </p>
    </form>
  );
}

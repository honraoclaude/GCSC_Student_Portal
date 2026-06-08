"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { ChatInput } from "./ChatInput";
import { AgentSidebar } from "./AgentSidebar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AgentConfig {
  icon: string;
  name: string;
  description: string;
  accentColor: "indigo" | "blue" | "green" | "purple" | "amber";
  quickPrompts: string[];
  greeting: string;
  systemPrompt: string;
}

interface ChatLayoutProps {
  agent: AgentConfig;
  onSendMessage: (message: string) => Promise<string>;
  storageKey?: string;
}

export function ChatLayout({
  agent,
  onSendMessage,
  storageKey = "chat-history",
}: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        );
      } catch {
        console.error("Failed to load chat history");
      }
    } else {
      // Add welcome message
      const welcomeMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: agent.greeting,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [storageKey, agent.greeting]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (input: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await onSendMessage(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
    setSidebarOpen(false);
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear the chat history?")) {
      const welcomeMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: agent.greeting,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <AgentSidebar
        icon={agent.icon}
        name={agent.name}
        description={agent.description}
        accentColor={agent.accentColor}
        quickPrompts={agent.quickPrompts}
        onPromptClick={handleQuickPrompt}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header with Menu Button */}
        <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-md flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="text-xl">☰</span>
          </button>

          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
              {agent.name}
            </h1>
            <button
              onClick={handleClearHistory}
              className="text-xs px-3 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-md space-y-4 scroll-smooth">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}

          {loading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSubmit={handleSendMessage}
          disabled={false}
          loading={loading}
          placeholder="Ask me anything..."
        />
      </div>
    </div>
  );
}

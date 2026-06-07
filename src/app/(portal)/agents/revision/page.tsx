"use client";

import { AgentChat } from "@/components/agents/AgentChat";

export default function RevisionAgentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🔄</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Revision Planner
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Create personalized revision schedules and flashcard content for any exam
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
            <AgentChat
              agentType="REVISION"
              agentName="Revision Planner"
              agentEmoji="🔄"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Example Prompts Card */}
          <div className="rounded-2xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Try asking:
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Create a 2-week Chemistry plan",
                "Generate flashcards for photosynthesis",
                "Break down quadratic equations",
                "What revision techniques work best?",
                "I have 4 weeks until my Maths exam",
              ].map((question, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 group"
                >
                  <span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">
                    →
                  </span>
                  <span>"{question}"</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tip Card */}
          <div className="rounded-2xl border border-amber-200/30 dark:border-amber-200/20 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30 backdrop-blur p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  Pro Tip
                </h4>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Tell me your exam date, subjects, and current grades for a personalized revision plan that actually works.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              What you can get
            </p>
            <div className="space-y-2">
              {[
                { icon: "📅", text: "Revision schedules" },
                { icon: "🎴", text: "Flashcard content" },
                { icon: "🧠", text: "Study techniques" },
                { icon: "📈", text: "Progress tracking" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-all"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

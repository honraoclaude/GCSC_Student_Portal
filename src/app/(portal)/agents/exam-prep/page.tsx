"use client";

import { AgentChat } from "@/components/agents/AgentChat";

export default function ExamPrepAgentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-5xl">📝</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Exam Prep Coach
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Generate mock exams, evaluate answers, predict grades, and master exam strategy
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chat Area */}
        <div className="lg:col-span-2 animate-fade-in-up">
          <div className="rounded-2xl border border-green-200/30 dark:border-green-200/20 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300">
            <AgentChat
              agentType="EXAM_PREP"
              agentName="Exam Prep Coach"
              agentEmoji="📝"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Example Prompts Card */}
          <div className="rounded-2xl border border-green-200/30 dark:border-green-200/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 backdrop-blur-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-400/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Try asking:
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Generate a Chemistry mock exam",
                "Check my Biology answer: [answer]",
                "What grade would I get for 72/100?",
                "Predict my final grade",
                "What topics should I focus on?",
              ].map((question, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 group"
                >
                  <span className="text-green-500 group-hover:text-green-400 transition-colors">
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
                  The more mock exams you take, the better I can predict your final grade. Try taking multiple practice papers.
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
                { icon: "📋", text: "Mock exam questions" },
                { icon: "✅", text: "Answer checking" },
                { icon: "📊", text: "Grade predictions" },
                { icon: "🎯", text: "Strategy tips" },
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

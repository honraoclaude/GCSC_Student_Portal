"use client";

import { AgentChat } from "@/components/agents/AgentChat";

export default function SuccessCoachPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Student Success Coach
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Your personal academic coach — get study plans, motivation, and guidance tailored to your goals.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AgentChat
            agentType="STUDENT_SUCCESS"
            agentName="Success Coach"
            agentEmoji="🎯"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              Try asking about:
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• "I'm struggling with Chemistry. Create a 2-week plan."</li>
              <li>• "How can I improve my Maths grades?"</li>
              <li>• "What should I focus on this week?"</li>
              <li>• "Am I on track for my target grades?"</li>
              <li>• "I'm feeling overwhelmed. Help!"</li>
            </ul>
          </div>

          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
              💡 Tip
            </h3>
            <p className="text-xs text-green-800 dark:text-green-300">
              The more details you share about your subjects and targets, the better personalized advice I can give you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChatLayout } from "@/components/chat";
import { AGENT_CONFIG, getMockResponse } from "@/lib/agents";

export default function RevisionPlannerPage() {
  const handleSendMessage = async (message: string): Promise<string> => {
    return getMockResponse(message);
  };

  return (
    <ChatLayout
      agent={AGENT_CONFIG.revision}
      onSendMessage={handleSendMessage}
      storageKey="chat-revision-planner"
    />
  );
}

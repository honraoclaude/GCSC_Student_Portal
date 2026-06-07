export async function POST(req: Request) {
  try {
    const { agentType, subject, message } = await req.json();

    if (!agentType || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let systemPrompt = "";

    if (agentType === "STUDENT_SUCCESS") {
      const { studentSuccessConfig } = await import("@/lib/ai/agents/student-success");
      systemPrompt = studentSuccessConfig.systemPrompt;
    } else if (agentType === "SUBJECT_TUTOR") {
      const { subjectTutorConfig } = await import("@/lib/ai/agents/subject-tutor");
      systemPrompt = subjectTutorConfig.systemPrompt;
      if (subject) {
        systemPrompt += `\n\nYou are specifically tutoring the student in: ${subject.replace(/_/g, " ")}`;
      }
    } else if (agentType === "REVISION") {
      const { revisionConfig } = await import("@/lib/ai/agents/revision");
      systemPrompt = revisionConfig.systemPrompt;
    } else if (agentType === "EXAM_PREP") {
      const { examPrepConfig } = await import("@/lib/ai/agents/exam-prep");
      systemPrompt = examPrepConfig.systemPrompt;
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Non-streaming version first to verify it works
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "";

    return new Response(
      JSON.stringify({
        text: text,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: String(error),
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

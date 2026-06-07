import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic();

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
    }

    // Stream response using SSE format
    const encoder = new TextEncoder();
    let responseBody = new ReadableStream({
      async start(controller) {
        try {
          const stream = client.messages.stream({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
          });

          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              const data = `data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(responseBody, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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

    const { Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await client.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
            stream: true,
          });

          for await (const event of response as any) {
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Anthropic stream error:", error);
          const errorChunk = `data: ${JSON.stringify({ error: String(error) })}\n\n`;
          controller.enqueue(encoder.encode(errorChunk));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
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

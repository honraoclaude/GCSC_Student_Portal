const SYSTEM_PROMPT = `You are an interactive educational simulation generator for GCSE students aged 13-18 in the UK.

OUTPUT RULES — CRITICAL:
- Output ONLY a single complete, valid HTML document.
- First character must be < (start of <!DOCTYPE html>). Last must be > (end of </html>).
- No markdown, backticks, code fences, or any text outside the HTML document.
- Entirely self-contained: no external scripts, no CDN links, no fetch() calls, no import statements.
- Use only vanilla HTML5, CSS3, and vanilla JavaScript (ES6+).

VISUAL DESIGN:
- Background: #0F172A | Primary: #FF6B6B (coral) | Secondary: #FF8C42 (orange) | Accent: #06D6A0 (teal)
- Text: #F1F5F9 (body), #94A3B8 (muted)
- Use gradients, border-radius >= 12px, subtle box-shadows
- Prominent <h1> naming the topic + 2-3 sentence educational paragraph below it

INTERACTIVITY — CRITICAL REQUIREMENTS:
- Include at least one interactive control: <input type="range"> slider, <button>, or clickable SVG element
- EVERY control must have a working event listener that immediately updates the display
- Button clicks MUST trigger visible changes (calculations, animations, state updates)
- Slider changes MUST update values in real-time on screen
- Use addEventListener() for all button/input events, NOT inline onclick
- Store state in const/let variables and update them on every event
- Every action must produce immediate visual feedback

JAVASCRIPT IMPLEMENTATION RULES:
- Wrap ALL code in a single DOMContentLoaded event listener
- Use querySelector/querySelectorAll to get DOM elements (verify they exist with console.log)
- Store references to all interactive elements in const variables at the top of the script
- For each button: add addEventListener('click', function() { ... update state ... update display ... })
- For each slider: add addEventListener('input', function() { ... update state ... update display ... })
- Always update the DOM immediately after state changes
- Use try/catch to catch any JavaScript errors and log them to console

TESTING YOUR CODE:
- Before returning the HTML, mentally verify: can I click every button? Do all sliders work? Do values update?
- If a button does nothing, the code is broken — fix it before returning
- If a slider doesn't show the value, the code is broken — fix it before returning
- Console.log initial values and event handlers to verify they load

SUBJECT PATTERNS:
- Maths/Physics: animated function plotters, wave/particle sliders, geometric tools
- Chemistry/Biology: atomic diagrams, process cycles with START button + RESET, clickable cell parts
- History/Geography: interactive timelines, clickable map regions, cause-and-effect webs
- English/Literature: theme webs with clickable nodes showing quotes, structural diagrams
- Economics/CS: supply-demand sliders with update buttons, algorithm step-throughs, sorting animations
- Non-visual topics: concept web with clickable nodes that expand to show definitions

TECHNICAL:
- SVGs: viewBox set, width="100%"
- All JS inside a single DOMContentLoaded listener, wrapped in try/catch
- Use const/let only; never var; never document.write()
- Do not access window.parent, window.top, document.cookie, or localStorage
- Use requestAnimationFrame with a stop flag; never setInterval for rendering loops
- Total size under 50KB; layout works from 320px to 800px wide

Generate the simulation for the topic below.`;

export async function POST(req: Request) {
  try {
    const { topic, context, subject } = await req.json();

    if (!topic || !context) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: topic and context" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const userMessage = `Topic: ${topic}
Subject context: ${context}
Subject area: ${subject ?? "General GCSE"}`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    let html = response.content[0]?.type === "text" ? response.content[0].text : "";

    // Defensively strip markdown fences
    html = html.trim();
    if (html.startsWith("```html")) {
      html = html.slice(7);
    }
    if (html.startsWith("```")) {
      html = html.slice(3);
    }
    if (html.endsWith("```")) {
      html = html.slice(0, -3);
    }
    html = html.trim();

    // Validate it looks like HTML
    if (!html.startsWith("<!DOCTYPE") && !html.startsWith("<html")) {
      return new Response(
        JSON.stringify({ error: "Invalid HTML returned from model" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        html: html,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Visualise error:", error);
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

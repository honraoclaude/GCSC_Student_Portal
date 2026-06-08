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

JAVASCRIPT IMPLEMENTATION RULES — MUST FOLLOW EXACTLY:

1. ELEMENT SETUP (inside DOMContentLoaded):
   const slider = document.getElementById('mySlider');
   const valueDisplay = document.getElementById('myValue');
   const button = document.getElementById('myButton');
   if (!slider || !valueDisplay || !button) { console.error('Missing elements'); return; }

2. SLIDER HANDLING (100% REQUIRED — THIS MUST WORK):
   slider.addEventListener('input', function() {
     const value = parseFloat(this.value);
     valueDisplay.textContent = value.toFixed(1); // Shows value immediately
     updateSimulation(); // Call function to update any dependent visuals
   });
   // Also call updateSimulation() on page load to show initial value

3. BUTTON HANDLING (100% REQUIRED — THIS MUST WORK):
   button.addEventListener('click', function() {
     // Do something visible: change color, update text, trigger animation
     // ALWAYS change the DOM so user sees immediate feedback
     updateSimulation();
   });

4. NEVER USE:
   - onclick="..." inline attributes — MUST use addEventListener
   - var — ONLY use const/let
   - Relying on auto-wiring — ALWAYS test querySelector first

5. ALWAYS INCLUDE AN updateSimulation() FUNCTION that:
   - Reads all current state (slider.value, toggle state, etc.)
   - Recalculates any derived values
   - Updates ALL visible DOM elements that depend on state
   - Can be called on every event

CONCRETE EXAMPLE FOR SLIDER (COPY THIS PATTERN):
```html
<div>
  <label>Light Intensity: <span id="lightValue">50</span>%</label>
  <input type="range" id="lightSlider" min="0" max="100" value="50">
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const lightSlider = document.getElementById('lightSlider');
  const lightValue = document.getElementById('lightValue');

  lightSlider.addEventListener('input', function() {
    lightValue.textContent = this.value;  // Update display IMMEDIATELY
    updateSimulation();
  });

  function updateSimulation() {
    const light = parseInt(lightSlider.value);
    // Use light value to update diagram, color, animation, etc.
  }
});
</script>
```

TESTING YOUR CODE (BEFORE YOU RETURN IT):
- Mentally move a slider: does the number change? If NO, fix the addEventListener
- Mentally click a button: does something visible happen? If NO, fix the addEventListener
- Check: is updateSimulation() called on every event? If NO, add it
- If ANY interaction doesn't produce immediate visual change, THE CODE IS BROKEN — FIX IT

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

const SYSTEM_PROMPT = `CRITICAL: You generate interactive HTML simulations. Users will move sliders and click buttons, and EVERYTHING must work immediately.

OUTPUT RULES:
- Output ONLY a single complete, valid HTML document.
- First character must be < (start of <!DOCTYPE html>). Last must be > (end of </html>).
- No markdown, backticks, code fences, or any text outside the HTML document.
- Entirely self-contained: no external scripts, no CDN links, no fetch() calls, no import statements.
- Use only vanilla HTML5, CSS3, and vanilla JavaScript (ES6+).

JAVASCRIPT MUST WORK: If you don't use document.addEventListener('DOMContentLoaded', ...) to wrap your code, SLIDERS WILL NOT WORK. This is non-negotiable.

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

5. REQUIRED: Use THESE EXACT ELEMENT IDs (not variations):
   - Sliders: id="mySlider" or id="slider1", id="slider2", etc.
   - Value displays: id="myValue" or id="value1", id="value2", etc.
   - Buttons: id="myButton" or id="button1", id="button2", etc.
   - SVG diagrams: id="mySvg" or id="diagram"
   MAKE SURE JavaScript getElementById() calls match these exact IDs

6. ALWAYS INCLUDE AN updateSimulation() FUNCTION that:
   - Reads all current state (slider.value, toggle state, etc.)
   - Recalculates any derived values based on the state
   - UPDATES VISUAL ELEMENTS IMMEDIATELY: change SVG colors, update SVG paths, change CSS classes, modify SVG line positions, update animated elements
   - REQUIRED VISUAL CHANGES: if a slider moves, something on screen MUST visually change (colors, sizes, positions, opacities, animations)
   - Can be called on every event
   - Example: if light slider increases, make the sun brighter (change fill color), make the plant greener (change element color), increase a rate number

DO NOT just update text numbers — ALSO change the visual representation!

Examples of what must happen:
- Light slider → SVG sun color changes from dark to bright yellow
- Water slider → SVG water level rises/falls
- Temperature slider → SVG colors shift from blue (cold) to red (hot)
- Growth slider → Plant SVG grows larger
- ANY slider → the diagram colors, sizes, or positions CHANGE VISIBLY

WORKING EXAMPLE - MUST COPY EXACTLY:

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Simulation</title>
<style>
body { background: #0F172A; color: #F1F5F9; font-family: Arial, sans-serif; padding: 20px; margin: 0; }
h1 { color: #FF6B6B; }
.slider-group { margin: 20px 0; padding: 15px; background: #1E293B; border-radius: 8px; }
label { display: block; margin-bottom: 8px; color: #FF8C42; font-weight: bold; }
input[type="range"] { width: 100%; cursor: pointer; }
.value-display { color: #06D6A0; font-weight: bold; font-size: 16px; margin-top: 5px; }
button { padding: 10px 20px; margin: 10px 0; background: #FF6B6B; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
button:hover { background: #FF8C42; }
</style>
</head>
<body>

<h1>Interactive Simulation</h1>
<p>Move sliders to see changes.</p>

<div class="slider-group">
  <label for="slider1">Light Intensity</label>
  <input type="range" id="slider1" min="0" max="100" value="50">
  <div class="value-display">Value: <span id="slider1Value">50</span></div>
</div>

<div class="slider-group">
  <label for="slider2">Water Level</label>
  <input type="range" id="slider2" min="0" max="100" value="50">
  <div class="value-display">Value: <span id="slider2Value">50</span></div>
</div>

<button id="button1">Start</button>
<button id="button2">Reset</button>

<script>
document.addEventListener('DOMContentLoaded', function() {
  try {
    console.log('DOMContentLoaded fired - setting up sliders');

    // Slider 1
    const slider1 = document.getElementById('slider1');
    const slider1Value = document.getElementById('slider1Value');
    if (slider1 && slider1Value) {
      slider1.addEventListener('input', function() {
        console.log('slider1 moved:', this.value);
        slider1Value.textContent = this.value;
      });
    }

    // Slider 2
    const slider2 = document.getElementById('slider2');
    const slider2Value = document.getElementById('slider2Value');
    if (slider2 && slider2Value) {
      slider2.addEventListener('input', function() {
        console.log('slider2 moved:', this.value);
        slider2Value.textContent = this.value;
      });
    }

    // Button 1
    const button1 = document.getElementById('button1');
    if (button1) {
      button1.addEventListener('click', function() {
        console.log('Button 1 clicked');
        alert('Button 1 works!');
      });
    }

    console.log('All listeners attached successfully');
  } catch (err) {
    console.error('Setup failed:', err);
    alert('Script error: ' + err.message);
  }
});
</script>

</body>
</html>

RULES - NON-NEGOTIABLE:
1. MUST include the exact text: document.addEventListener('DOMContentLoaded',
2. MUST use getElementById() - IDs slider1, slider2, button1, button2, etc.
3. MUST attach addEventListener('input') to EVERY slider
4. MUST attach addEventListener('click') to EVERY button
5. MUST have console.log for every event
6. MUST have try/catch around setup code
7. ABSOLUTELY FORBIDDEN: onclick attributes, var declarations, or skipping DOMContentLoaded
8. You may change: title, labels, colors, slider ranges, button text
9. YOU MUST NOT CHANGE: DOMContentLoaded pattern, getElementById calls, addEventListener patterns, HTML structure

KEY POINTS:
- addEventListener('input') fires on EVERY slider touch/movement
- updateSimulation() is called INSIDE the event listener
- updateSimulation() reads slider.value, changes display.textContent, AND changes SVG attributes
- setAttribute() changes the visual representation IMMEDIATELY
- console.log() on every step so we can debug if it's not working
- MUST call updateSimulation() once after setting up the listener (shows initial state)

FINAL CHECK BEFORE RETURNING:
1. Does your code include the text "DOMContentLoaded"? (YES = good, NO = YOUR CODE IS BROKEN, FIX IT)
2. Does your code include addEventListener('input') for every slider? (Check: slider1.addEventListener('input', ...))
3. Does your code include addEventListener('click') for every button? (Check: button1.addEventListener('click', ...))
4. Does your code have try/catch and console.log statements?
5. Mentally move a slider: Would the console show a log message? If NO, the code is broken.
6. If your code doesn't have DOMContentLoaded, DELETE everything and copy the template example exactly.

HOW TO CUSTOMIZE THE EXAMPLE:
- Change the <h1> topic name
- Change the <p> description
- Change the label text
- Change the slider min/max/value ranges
- Change colors in <style> (use the palette colors)
- ADD more sliders by copying the control div with slider2, slider3, etc.
- ADD more buttons with button2, button3, etc.
- Change the button action inside addEventListener('click')
- Change the updateSimulation() logic to update visual elements

DO NOT CHANGE:
- The id attribute names (must be slider1, slider2, button1, button2, etc.)
- The getElementById() calls (must match the id attributes)
- The event listener pattern
- The script placement (end of body)

SUBJECT PATTERNS:
- Maths/Physics: animated function plotters, wave/particle sliders, geometric tools
- Chemistry/Biology: atomic diagrams, process cycles with START button + RESET, clickable cell parts
- History/Geography: interactive timelines, clickable map regions, cause-and-effect webs
- English/Literature: theme webs with clickable nodes showing quotes, structural diagrams
- Economics/CS: supply-demand sliders with update buttons, algorithm step-throughs, sorting animations
- Non-visual topics: concept web with clickable nodes that expand to show definitions

TECHNICAL:
- SVGs: viewBox set, width="100%"
- CRITICAL: PUT ALL JAVASCRIPT IN A <script> TAG AT THE END OF </body> (NOT in DOMContentLoaded)
  This ensures all HTML elements are loaded BEFORE JavaScript runs
- Add console.log on EVERY major step: element setup, listener attachment, updateSimulation calls
- If elements are missing, show an error message on screen (not just console)
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

    // GUARANTEED FIX: Always inject a universal initialization script at the very end
    // This ensures ALL sliders and buttons work, regardless of what Claude generated
    const universalFixScript = `<script>
// Universal slider and button initializer - runs after everything else
(function() {
  function initializeInteractivity() {
    console.log('Universal init: Checking for sliders and buttons');

    // Initialize ALL sliders with generic handler
    const sliders = document.querySelectorAll('input[type="range"]');
    console.log('Found ' + sliders.length + ' sliders');

    sliders.forEach(slider => {
      // Remove existing listeners by cloning (to reset)
      // Then add our guaranteed listener
      slider.addEventListener('input', function() {
        console.log('SLIDER EVENT: ' + this.id + ' = ' + this.value);

        // Strategy 1: Look for span with id + 'Value'
        let display = document.getElementById(this.id + 'Value');
        if (display) {
          display.textContent = this.value;
          console.log('Updated display: ' + this.id + 'Value');
        }

        // Strategy 2: Look for next span with class 'value-number' or similar
        if (!display) {
          const parent = this.closest('.slider-group') || this.closest('div');
          if (parent) {
            display = parent.querySelector('.value-number, [class*="value"], span[class*="display"]');
            if (display) {
              display.textContent = this.value;
              console.log('Updated display via parent search');
            }
          }
        }
      });

      // Trigger initial display
      slider.dispatchEvent(new Event('input'));
    });

    // Initialize ALL buttons
    const buttons = document.querySelectorAll('button');
    console.log('Found ' + buttons.length + ' buttons');

    buttons.forEach(button => {
      button.addEventListener('click', function() {
        console.log('BUTTON CLICKED: ' + (this.id || this.textContent));
      });
    });

    console.log('✓ Universal initialization complete');
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInteractivity);
  } else {
    // DOM already loaded, run immediately
    initializeInteractivity();
  }
})();
</script>`;

    // Insert AFTER the last </script> but BEFORE </body>
    const bodyEndIndex = html.lastIndexOf('</body>');
    if (bodyEndIndex > -1) {
      html = html.substring(0, bodyEndIndex) + '\n' + universalFixScript + '\n' + html.substring(bodyEndIndex);
    } else {
      // No </body> tag, append at end
      html = html + '\n' + universalFixScript;
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

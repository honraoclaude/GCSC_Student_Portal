# Animations & Interactions Specification Guide

**Complete Animation & Micro-interaction Specifications for GCSC Student Hub**

---

## Motion Design Principles

### Timing Standards
- **Quick interactions:** 150ms (hover, focus states)
- **UI transitions:** 200-300ms (cards, buttons, modals)
- **Page transitions:** 300ms (fade-in, slide-up)
- **Celebrations:** 500-800ms (level-up, achievements)
- **Loading animations:** 800ms - 2s (spinners, progress)

### Easing Functions

```css
/* Ease Out - for entrances */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Ease In - for exits */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Ease In Out - for smooth transitions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom elastic bounce */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## UI Micro-Interactions

### Buttons

**Hover State:**
- Duration: 200ms
- Effects: Scale 1.02, shadow elevation
- Easing: ease-out

```css
.button:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}
```

**Click State:**
- Duration: 100ms
- Effects: Scale 0.98 → 1.0
- Visual feedback: Brief press effect

```css
.button:active {
  transform: scale(0.98);
}
```

**Disabled State:**
- Opacity: 50%
- Cursor: not-allowed
- No interaction effects

**Loading State:**
- Spinner inside button
- Text hidden
- Width maintained
- Disable click events

### Cards

**Hover State:**
- Duration: 200ms
- Effects: translateY -4px, shadow-lg
- Border: Brighten color

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px rgba(0,0,0,0.1);
  border-color: #0099FF;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}
```

### Form Inputs

**Focus State:**
- Duration: 200ms
- Border: 2px blue-400
- Shadow: Blue glow

```css
input:focus {
  border: 2px solid #0099FF;
  box-shadow: 0 0 0 4px rgba(0,102,255,0.2);
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}
```

**Error State:**
- Red border (2px)
- Red text below
- Shake animation

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

input.error {
  border-color: #EF4444;
  animation: shake 300ms cubic-bezier(0.36, 0, 0.66, -0.56);
}
```

---

## Page Transitions

### Page Load

**Fade-In:**
- Duration: 300ms
- From: opacity 0
- To: opacity 1
- Easing: ease-out

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page {
  animation: fadeIn 300ms cubic-bezier(0, 0, 0.2, 1);
}
```

**Slide-Up:**
- Duration: 300ms
- From: translateY 20px, opacity 0
- To: translateY 0, opacity 1

```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.content {
  animation: slideUp 300ms cubic-bezier(0, 0, 0.2, 1);
}
```

### Staggered Elements

Delay each element by 50ms:

```css
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
/* Continue pattern */
```

---

## Gamification Animations

### XP Gain

**Floating XP Text:**
- Text: "+5 XP" or "+10 XP"
- Duration: 1s total
- Movement: Fade up and out
- Multiple simultaneous allowed

```css
@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

.xp-float {
  animation: floatUp 1s cubic-bezier(0, 0.9, 0.58, 1);
  position: absolute;
  color: #10B981;
  font-weight: bold;
  pointer-events: none;
}
```

### Level Up Celebration

**Full Experience:**
- Duration: 1.5s main animation
- Effects: Scale, glow, particle burst
- Sound effect: Optional
- Confetti: 3s duration

```css
@keyframes levelUp {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.level-up-badge {
  animation: levelUp 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
}
```

### Achievement Unlock

**Badge Animation:**
- Duration: 600ms
- Effects: Scale from 0 to 1 with glow
- Confetti burst from center

```css
@keyframes achievementUnlock {
  0% {
    transform: scale(0);
    filter: brightness(0%);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    filter: brightness(100%);
  }
}

.achievement {
  animation: achievementUnlock 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Progress Bar Fill

**Smooth Width Increase:**
- Duration: 800ms - 1.5s
- Use transform for GPU acceleration
- Optional animated gradient

```css
@keyframes fillProgress {
  from { width: 0%; }
  to { width: 100%; }
}

.progress-fill {
  animation: fillProgress 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: linear-gradient(
    90deg,
    #0066FF,
    #7C3AED,
    #10B981
  );
  background-size: 200% 100%;
}
```

---

## Chat Interactions

### Message Appear

**Fade-In + Slide:**
- Duration: 300ms
- User message: From right
- Agent message: From left
- Stagger: 50ms between multiple

```css
@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.message {
  animation: messageIn 300ms cubic-bezier(0, 0, 0.2, 1);
}

.message.user {
  animation-name: messageInRight;
}

@keyframes messageInRight {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Typing Indicator

**Bouncing Dots:**
- Duration: 1.5s infinite
- Each dot: Scale up/down
- Stagger: 150ms between dots

```css
@keyframes typingDot {
  0%, 60%, 100% {
    opacity: 0.5;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

.typing-dot {
  animation: typingDot 1.5s infinite;
}

.typing-dot:nth-child(1) { animation-delay: 0ms; }
.typing-dot:nth-child(2) { animation-delay: 150ms; }
.typing-dot:nth-child(3) { animation-delay: 300ms; }
```

---

## Form Animations

### Step Transition

**Exit Current:**
- Duration: 300ms
- Effects: Fade out, slide left

**Enter Next:**
- Duration: 300ms
- Effects: Fade in, slide in from right
- Simultaneous with exit

```css
.form-step.exit {
  animation: slideOutLeft 300ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.form-step.enter {
  animation: slideInRight 300ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-20px); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

## Data Visualization

### Progress Bar Animation

```css
.progress-bar {
  height: 6px;
  background: #E5E7EB;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0066FF, #7C3AED);
  width: 0%;
  animation: fillProgress 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes fillProgress {
  from { width: 0%; }
  to { width: var(--progress-value); }
}
```

### Counter Animation

```css
.counter {
  font-size: 32px;
  font-weight: bold;
}

@keyframes countUp {
  from { opacity: 0; }
  to { opacity: 1; }
}

.counter {
  animation: countUp 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Navigation Animations

### Sidebar Toggle (Mobile)

**Slide In:**
- Duration: 300ms
- Effect: translateX -300px → 0
- Overlay: Fade in simultaneously

```css
.sidebar {
  transform: translateX(-300px);
  transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
}

.sidebar.open {
  transform: translateX(0);
}

.overlay {
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1);
}

.overlay.open {
  opacity: 1;
}
```

### Menu Item Hover

**Border Animation:**
- Duration: 200ms
- Left border grows
- Background color change

```css
.menu-item {
  border-left: 3px solid transparent;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
}

.menu-item:hover {
  border-left-color: #0066FF;
  background-color: #EBF8FF;
}
```

---

## Performance Optimization

### GPU Acceleration
Use transform and opacity only:

```css
/* Good - GPU accelerated */
.element {
  transform: translateY(-4px);
  opacity: 0.8;
}

/* Avoid - CPU intensive */
.element {
  top: -4px; /* Use transform instead */
  margin-bottom: 4px; /* Use transform instead */
}
```

### will-change Usage

```css
/* Use sparingly - only for elements that will actually animate */
.animated-element {
  will-change: transform, opacity;
}

/* Remove after animation */
.animated-element.done {
  will-change: auto;
}
```

---

## Testing Animations

1. **Visual Testing:**
   - Check timing (should feel snappy, not sluggish)
   - Verify easing (should feel natural)
   - Test on low-end devices

2. **Accessibility Testing:**
   - Verify prefers-reduced-motion is respected
   - Test keyboard navigation
   - Check focus indicators are visible

3. **Performance Testing:**
   - Target 60fps (no jank)
   - Test on mobile devices
   - Monitor CPU/GPU usage

---

**Reference:** Use this guide in conjunction with PAGE_REDESIGNS.md for exact animation specifications per page.
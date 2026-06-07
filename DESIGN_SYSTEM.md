# GCSC Student Hub — Design System

Premium SaaS design inspired by Notion, Stripe, Linear, Duolingo, and Apple Education.

---

## 🎨 Color Palette

### Primary Colors
- **Indigo-600**: `#4F46E5` — Primary actions, highlights
- **Indigo-500**: `#6366F1` — Hover states
- **Indigo-400**: `#818CF8` — Disabled, secondary

### Accent Colors
- **Amber-500**: `#F59E0B` — Streaks, warnings, energy
- **Green-600**: `#16A34A` — Success, achievements
- **Rose-500**: `#F43F5E` — Error, critical
- **Blue-600**: `#2563EB` — Information, secondary

### Neutral Colors (Dark Mode)
- **Slate-900**: `#0F172A` — Background
- **Slate-800**: `#1E293B` — Elevated background
- **Slate-700**: `#334155` — Borders
- **Slate-400**: `#94A3B8` — Secondary text
- **Slate-300**: `#CBD5E1` — Tertiary text

### Gradients
```css
/* Premium gradient for headers */
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);

/* Soft gradient for cards (hover) */
background: linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05));

/* Streak gradient */
background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);

/* Success gradient */
background: linear-gradient(135deg, #16A34A 0%, #22C55E 100%);
```

---

## 📝 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif;
```

### Type Scale
| Usage | Size | Weight | Line Height |
|---|---|---|---|
| **H1** (Page title) | 48px | 700 (bold) | 56px |
| **H2** (Section title) | 32px | 700 (bold) | 40px |
| **H3** (Card title) | 20px | 700 (bold) | 28px |
| **H4** (Subsection) | 16px | 600 (semibold) | 24px |
| **Body** (Regular text) | 14px | 400 (regular) | 21px |
| **Small** (Meta text) | 12px | 500 (medium) | 16px |
| **Micro** (Labels) | 11px | 600 (semibold) | 16px |

### Text Styles
```css
/* H1 */
font-size: 48px;
font-weight: 700;
letter-spacing: -0.02em;
line-height: 1.2;

/* Body */
font-size: 14px;
font-weight: 400;
line-height: 1.5;
color: var(--slate-600);
```

---

## 🎯 Spacing System (8px Grid)

| Size | Value | Usage |
|---|---|---|
| **xs** | 4px | Icon spacing, small gaps |
| **sm** | 8px | Component padding, small margin |
| **md** | 16px | Section spacing, card padding |
| **lg** | 24px | Major sections, large gaps |
| **xl** | 32px | Page sections, large padding |
| **2xl** | 48px | Hero sections, major spacing |
| **3xl** | 64px | Full page spacing |

---

## 🎴 Components

### Cards (Glassmorphism)
```css
/* Base card */
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.1);
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(8px);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 
            0 1px 2px rgba(0, 0, 0, 0.02);

/* On hover */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.04);
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

### Buttons
```css
/* Primary Button */
background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
color: white;
padding: 10px 20px;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
transition: all 0.2s;
box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);

/* Hover: Lift effect */
transform: translateY(-1px);
box-shadow: 0 8px 12px rgba(79, 70, 229, 0.3);

/* Secondary Button */
background: transparent;
border: 1px solid #E2E8F0;
color: #0F172A;
```

### Input Fields
```css
border: 1px solid #E2E8F0;
border-radius: 8px;
padding: 10px 12px;
background: #F8FAFC;
font-size: 14px;
transition: all 0.2s;

/* Focus */
border-color: #4F46E5;
background: white;
box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
```

### Progress Bars
```css
/* Track */
height: 8px;
border-radius: 4px;
background: #E2E8F0;

/* Fill */
background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%);
border-radius: 4px;
transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## ✨ Animations

### Timing Functions
```css
/* Standard easing */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Durations */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
```

### Common Animations
```css
/* Fade in */
animation: fadeIn 0.3s ease-out;

/* Slide up */
animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Scale on hover */
transition: transform 0.2s, box-shadow 0.2s;
&:hover { transform: scale(1.02); }

/* Pulse (for important elements) */
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

## 📱 Responsive Breakpoints

| Size | Width | Usage |
|---|---|---|
| **Mobile** | 320px | iPhone SE |
| **Tablet** | 768px | iPad |
| **Desktop** | 1024px | Laptop |
| **Wide** | 1280px | Desktop |
| **Ultra** | 1536px | Large monitors |

**Mobile-First Approach:**
- Base: Mobile (320px)
- `md:` Tablet (768px)
- `lg:` Desktop (1024px)
- `xl:` Wide (1280px)

---

## 🎮 Gamification Elements

### Achievement Badge
```css
border-radius: 12px;
background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
padding: 12px 16px;
box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
animation: bounce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

### XP Bar Animation
```css
background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%);
transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
box-shadow: 0 0 16px rgba(79, 70, 229, 0.4);
```

### Streak Flame
```css
animation: flicker 2s ease-in-out infinite;
filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
```

---

## 🌙 Dark Mode

### Adjustments for Dark Mode
```css
/* Dark mode backgrounds */
background: #0F172A; /* Slate-900 */

/* Dark mode cards */
background: rgba(15, 23, 42, 0.8);
border: 1px solid rgba(255, 255, 255, 0.05);

/* Dark mode text */
color: #F1F5F9; /* Slate-100 */

/* Dark mode accent */
color: #A5F3FC; /* Cyan-300 */
```

---

## 🎨 Page Layouts

### Dashboard
- Hero section with greeting + stats
- 2-column grid for main widgets (streak + XP)
- 3-column grid for subject cards
- CTA section at bottom

### Learning Hub
- Clean card-based navigation
- Empty states with illustrations
- Progress indicators
- Study mode with minimal distractions

### Agents
- Sidebar-style agent header
- Chat interface centered
- Suggestions on side
- Clean message threading

---

## ✅ Design Checklist

- [ ] All cards use glassmorphism + shadows
- [ ] Buttons have hover lift effects
- [ ] Progress bars have gradient + animation
- [ ] Spacing is consistent (8px grid)
- [ ] Typography hierarchy is clear
- [ ] Dark mode is fully implemented
- [ ] Mobile responsive (320px+)
- [ ] Animations are smooth (150-300ms)
- [ ] Color contrast passes WCAG AA
- [ ] Illustrations match the brand
- [ ] Icons are consistent (Feather or Heroicons)
- [ ] Empty states are delightful

---

## 🚀 Implementation Priority

1. **Phase 1**: Dashboard + Agent pages (high impact)
2. **Phase 2**: Learning Hub pages (student experience)
3. **Phase 3**: Onboarding (first impression)
4. **Phase 4**: Mobile polish (responsive refinement)

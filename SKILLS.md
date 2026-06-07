# Claude Skills for GCSC Student Hub

This document defines the Claude Skills integrated into our project for optimal development, design, and testing.

## 🎯 Active Skills

### 1. **Frontend Design Skill** ✨
**Purpose:** Avoid "AI slop" and maintain premium design aesthetics  
**Repository:** [anthropics/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)

**What it does:**
- Instructs Claude to make bold, high-quality design decisions
- Avoids generic AI-generated aesthetics
- Works excellently with React & Tailwind CSS
- Ensures professional UI/UX consistency

**Usage:**
- Applied automatically when designing React components
- Referenced for all page redesigns
- Ensures gradient use, glassmorphism, and animations are premium-quality

**Status:** ✅ Active (applies to all UI/UX work)

---

### 2. **Shadcn/UI Skill** 🧩
**Purpose:** Provide Claude deep context on shadcn/ui components  
**Repository:** [shadcn/ui Skills](https://ui.shadcn.com/docs/skills)

**What it does:**
- Gives Claude comprehensive knowledge of shadcn component library
- Ensures components are used correctly
- Provides best practices for component composition
- Shows available component variants and props

**Usage:**
- Applied when building UI components
- Referenced in Button, Card, Input component implementations
- Ensures consistency with shadcn/ui patterns

**Current Components Using This:**
- `src/components/forms/*` (FormInput, FormSelect, FormTextarea, FormError)
- `src/components/cards/*` (Card, StatCard, FeatureCard)
- `src/components/ui/*` (ButtonVariants, LoadingSpinner)

**Status:** ✅ Active (component library guidance)

---

### 3. **Web Artifacts Builder Skill** 🏗️
**Purpose:** Build complex interactive HTML artifacts  
**Repository:** [anthropics/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder)

**What it does:**
- Guides Claude on building rich React/HTML artifacts
- Uses Tailwind CSS and shadcn/ui components
- Creates interactive, responsive interfaces
- Best for rapid prototyping of complex UIs

**Usage:**
- Referenced when building interactive features
- Applied to dashboard, agent chat interfaces, learning hub components
- Used for rapid UI iteration

**Potential Use Cases:**
- Advanced dashboard visualizations
- Interactive flashcard study sessions
- Mock exam interfaces
- Leaderboard with filters

**Status:** ✅ Available (use when building complex interactive UIs)

---

### 4. **Web App Testing Skill** 🧪
**Purpose:** Test local web applications with Playwright  
**Repository:** [anthropics/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing)

**What it does:**
- Guides Claude on using Playwright for UI testing
- Performs automated testing of web applications
- Tests user interactions and flows
- Validates UI correctness

**Usage:**
- Run before major releases
- Test critical user flows (onboarding, agent chat, flashcard study)
- Verify responsive design
- Check accessibility

**Potential Tests:**
```
- Onboarding flow completion
- Dashboard page rendering
- AI agent chat functionality
- Flashcard study session
- Quick action card navigation
- Dark mode toggle
```

**Status:** ✅ Available (use for QA before deployment)

---

## 📋 Skill Implementation Status

| Skill | Type | Status | Used For |
|-------|------|--------|----------|
| Frontend Design | Official | ✅ Active | UI/UX consistency |
| Shadcn/UI | Official | ✅ Active | Component best practices |
| Web Artifacts | Official | ✅ Ready | Complex interactive UIs |
| Web Testing | Official | ✅ Ready | QA & validation |

---

## 🚀 How to Use These Skills

### In Claude Code:
These skills are referenced during development. Claude automatically applies them when relevant to the task.

### For Component Development:
```
"Use the frontend-design and shadcn/ui skills to create a premium-looking [component name] with:"
- Smooth animations (200-300ms transitions)
- Glassmorphism effects where appropriate
- Proper dark mode support
- Responsive design (375px, 768px, 1024px+)
- WCAG AA accessibility
```

### For Testing:
```
"Use the web-testing skill to create Playwright tests for:
- Onboarding flow
- Dashboard functionality
- Agent chat interaction
- Flashcard study session
```

---

## 📚 Reference Implementations

### Premium Frontend Design
**Applied in:**
- `/src/app/(portal)/dashboard/page.tsx` — Hero section with gradients
- `/src/app/(onboarding)/onboarding/page.tsx` — Premium welcome flow
- `/src/components/dashboard/*` — StreakCard, XPBar, SubjectCard
- `/src/styles/patterns.ts` — 65+ reusable design patterns

### Shadcn Component Usage
**Applied in:**
- `/src/components/forms/` — All form components
- `/src/components/cards/` — Card patterns
- `/src/components/ui/` — UI utilities

### Web Artifacts (Ready)
**Can be used for:**
- Advanced dashboard analytics
- Interactive mock exam builder
- Leaderboard visualizations
- Study session stats

---

## 🎯 Next Steps

### Phase 3 (Tutor Marketplace):
- Use **Web Artifacts Skill** to build tutor matching interface
- Apply **Frontend Design** for tutor profile cards
- Use **Web Testing** to QA booking flow

### Phase 4 (Social & Collaboration):
- Use **Web Artifacts** for study group interfaces
- Apply **Frontend Design** for group chat UI
- Use **Web Testing** for real-time collaboration

### Phase 5 (Analytics):
- Use **Web Artifacts** for analytics dashboards
- Apply **Frontend Design** for professional charts
- Use **Web Testing** for analytics accuracy

---

## 📖 Learning Resources

- [Claude Skills Documentation](https://platform.claude.com/docs/en/api/beta/skills)
- [Shadcn/UI Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Playwright Testing Guide](https://playwright.dev/)

---

## ✅ Quality Checklist

Before deploying any feature, verify it follows these skill standards:

- [ ] Frontend Design applied (no generic AI aesthetics)
- [ ] Shadcn/UI best practices followed
- [ ] Dark mode fully supported
- [ ] Responsive (375px, 768px, 1024px, 1440px)
- [ ] Smooth animations (150-300ms)
- [ ] WCAG AA accessibility
- [ ] Web Testing validated (critical flows)
- [ ] Performance optimized

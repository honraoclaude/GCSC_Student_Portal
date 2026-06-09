# GCSC Student Portal — UI Modernization Audit & Plan

## Step 0: Audit Summary

### Current Stack ✅
- **Framework:** Next.js 16.2.7 (React 19)
- **Styling:** Tailwind CSS 4 + CVA
- **UI Kit:** shadcn/ui components
- **Icons:** Lucide React
- **Auth:** Clerk
- **Database:** Prisma + Neon (PostgreSQL)
- **Fonts:** Inter (UI), Poppins (display), JetBrains Mono (code)
- **Dark Mode:** Built-in via next-themes

### Existing Design System 🎨
**Colors:**
- Primary: Coral #FF6B6B (50→900 scale)
- Secondary: Orange #FF8C42 (50→900 scale)
- Accent: Teal #06D6A0
- Error: #FF6B6B, Warning: #FF8C42, Success: #06D6A0
- Neutral: Slate 50→950

**Typography:**
- Sans: Inter (UI), Poppins (display)
- Mono: JetBrains Mono
- Scale: 12/14/16/18/20/24/30/36/44/56px with proper line-heights

**Spacing:** 4px base grid (xs/sm/md/lg/xl/2xl/3xl/4xl)

**Radii:** xs(4px) / sm(6px) / md(8px) / lg(12px) / xl(16px) / 2xl(24px)

**Shadows:** Light & dark variants (xs → 2xl) with proper depth

---

## Pages Inventory

### Auth Flow
- `/(auth)/sign-in` — Clerk-managed (no custom UI)
- `/(auth)/sign-up` — Clerk-managed (no custom UI)
- `/(onboarding)/onboarding` — Subject selection
- `/(onboarding)/step-1` — Profile setup
- `/(onboarding)/step-2` — Goals/targets
- `/(onboarding)/step-3` — Confirmation

### Portal (Authenticated)
- `/dashboard` — Main hub with stats, quick actions, subjects
- `/agents/tutor/[subject]` — AI tutor chat interface
- `/agents/exam-prep` — Exam prep agent
- `/agents/revision` — Revision agent
- `/agents/success` — Success tips agent
- `/learning-hub` — Course listing
- `/learning-hub/flashcards` — Deck management
- `/learning-hub/flashcards/[deckId]` — Deck detail
- `/learning-hub/flashcards/[deckId]/study` — Study mode
- `/learning-hub/flashcards/new` — Create deck
- `/learning-hub/practice-papers` — Practice papers
- `/marketplace` — Tutor marketplace
- `/marketplace/tutors/[tutorId]` — Tutor profile
- `/marketplace/booking/[tutorId]` — Booking flow
- `/marketplace/booking/confirmation` — Confirmation
- `/achievements` — Achievement badges
- `/leaderboard` — Leaderboard rankings
- `/settings` — Settings hub
- `/settings/profile` — Profile edit
- `/settings/appearance` — Theme/notifications
- `/settings/notifications` — Notification settings
- `/settings/privacy` — Privacy settings

### Landing Page
- `/` (root) — Public landing page

---

## Major Components Inventory

### Layout & Shell
- `Sidebar.tsx` — Portal navigation
- `Header.tsx` — Top bar with search, theme, profile
- `ChatLayout.tsx` — Agent chat wrapper

### Shared Primitives (to be standardized)
- **Forms:** FormInput, FormSelect, FormTextarea, FormError
- **Cards:** Card, StatCard, FeatureCard, DeckCard, SubjectCard
- **Feedback:** TypingIndicator, Skeleton loaders (none yet)
- **Animations:** FadeIn, SlideUp (custom wrapper components)

### Feature Components
- **Dashboard:** DashboardHero, StreakCard, SubjectCard, XPBar
- **Agents:** AgentChat, ChatMessage, ChatInput, AgentSidebar, VisualSimulation, VisualiseButton
- **Flashcards:** FlashcardDeck, FlashcardCard, StudySession, FlashcardStats, AddCardForm
- **Gamification:** AchievementBadge
- **Home:** CTASection, CounterStat

### Gaps (To Add During Modernization)
- Loading skeletons for all async surfaces
- Empty states with illustrations
- Error boundary components
- Toast/notification system (exists in globals.css but no component)
- Modal/Dialog primitive
- DataTable for structured data
- Command palette / search interface

---

## Modernization Priorities

### Phase 1: Foundation (Week 1)
1. **Design Tokens Extension** — Add typography presets, motion easing, layered shadows
2. **Primitive Library Audit** — Review Card, Button, Input, Select for consistency
3. **Skeleton Loader System** — Create reusable skeleton components
4. **Dark Mode Polish** — Audit all pages in dark mode, fix contrast issues

### Phase 2: Layout & Navigation (Week 1-2)
1. **Sidebar Modernization** — Icon-only compact mode, better active states
2. **Top Bar Polish** — Search placeholder, notifications icon, theme toggle, avatar
3. **Page Transitions** — Fade + slight rise on route change
4. **Mobile Responsive** — Test mobile nav, consider bottom tab bar

### Phase 3: Pages (Week 2-3)
1. **Login/Onboarding** — Split-screen gradient design, form polish
2. **Dashboard** — Widget grid (next class, attendance ring, GPA sparkline, due assignments)
3. **Agents/Tutor** — Chat UI modernization, message bubbles, input polish
4. **Flashcards** — Card grid → improved study UI
5. **Marketplace** — Tutor card grid, booking wizard polish

### Phase 4: Polish (Week 3-4)
1. **Micro-interactions** — Button press, card hover, smooth transitions
2. **Accessibility** — WCAG 2.2 AA focus rings, ARIA labels, keyboard nav
3. **Performance** — Lazy-load routes, image optimization
4. **Documentation** — UI-MIGRATION.md with token usage, component patterns

---

## Constraints & Non-Breaking Changes

### ✅ What We Will NOT Change
- API endpoints, route paths, query params
- Data schemas, auth flow, environment variables
- Clerk integration, Stripe integration, database structure
- Component props (only add, deprecate gracefully)
- Deployment config (Vercel, Next.js settings)

### ✅ Backward Compatibility Rules
- If renaming a prop: add an alias, deprecate gracefully
- If redesigning a component: must accept all existing props
- If changing layout: must preserve all existing functionality
- No breaking changes to URLs or data structures

---

## New Dependencies (Minimal)

**Already installed:**
- tailwindcss, shadcn (OK)
- lucide-react (icons, OK)
- class-variance-authority (CVA, OK)
- next-themes (dark mode, OK)

**Consider adding (justification required):**
- framer-motion — for page transitions & micro-interactions (lightweight alternative: ViewTransitions API)
- embla-carousel — only if adding carousels (avoid unless needed)
- sonner — toast notifications (lightweight, already aligns with shadcn)

**NOT adding:**
- Material-UI, Bootstrap, other UI frameworks
- Storybook, Zod validation (Prisma already validates)
- Chart libraries (unless needed for dashboards)

---

## Success Criteria

By end of modernization:
- ✅ All pages have modern visual hierarchy, proper spacing
- ✅ Dark mode is tested and works throughout
- ✅ Mobile responsiveness confirmed (320px → 2560px)
- ✅ Loading, empty, and error states designed & implemented
- ✅ Micro-interactions on buttons, cards, inputs
- ✅ Keyboard navigation working (Tab through all elements)
- ✅ Focus rings visible on all interactive elements
- ✅ Page transitions smooth and respect prefers-reduced-motion
- ✅ No breaking changes to API, routes, or auth
- ✅ Performance: LCP < 2.5s, all pages lazy-loaded where sensible

---

## Rollout Checklist

- [ ] Phase 1: Design tokens + primitives + skeletons
- [ ] Phase 2: Layout shell (Sidebar, Header, Transitions)
- [ ] Phase 3a: Login/Onboarding redesign
- [ ] Phase 3b: Dashboard redesign
- [ ] Phase 3c: Agents/Chat redesign
- [ ] Phase 3d: Flashcards redesign
- [ ] Phase 3e: Marketplace redesign
- [ ] Phase 4: Polish, accessibility audit, performance
- [ ] Testing: Desktop light/dark, Mobile light/dark, Keyboard nav
- [ ] Deploy & monitor

---

## Next Steps

**Phase 1 begins with:**
1. Create `/src/styles/tokens.ts` for design token constants
2. Audit existing `Button` and `Card` components for consistency
3. Create `Skeleton.tsx`, `EmptyState.tsx`, `ErrorBoundary.tsx`
4. Run dark mode audit on dashboard, chat, and marketplace pages
5. Create `UI-MIGRATION.md` with component usage examples

Estimated effort: ~2-3 weeks for full modernization at 4hrs/day.

---

Generated: 2026-06-09
Framework: Next.js 16 + Tailwind 4 + React 19
Status: Ready for Phase 1 implementation

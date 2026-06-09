# UI Modernization Rollout Script — Executable Checklist

**Total Effort:** ~19 hours over 3-4 weeks  
**Current Status:** Phase 1 + Phase 2a Complete (25%)  
**Last Updated:** 2026-06-09

---

## 📋 Overview: Page Implementation Order

The pages are prioritized by:
1. **Impact:** Core user journeys first (auth, dashboard, chat)
2. **Dependency:** Layout shell before content pages
3. **Complexity:** Simple pages before complex features
4. **Learning:** Early pages establish patterns for later ones

---

## PHASE 2: Layout & Navigation (Remaining ~2.5 hours)

### Phase 2b: Header Modernization (1.5 hours)
**Status:** 📋 Ready  
**File:** `src/components/layout/Header.tsx`  
**Scope:** Search bar, notifications, theme toggle, avatar menu

#### Tasks
- [ ] Enhance search input with icons and focus states
- [ ] Modernize notifications badge with animation
- [ ] Polish theme toggle with smooth transitions
- [ ] Redesign avatar dropdown menu with proper spacing
- [ ] Use design tokens for colors/spacing
- [ ] Test dark mode throughout

#### Testing Checklist
- [ ] Light mode: Search bar focus state visible
- [ ] Dark mode: All text readable, proper contrast
- [ ] Mobile: Header doesn't overflow (test 375px width)
- [ ] Keyboard: Tab through search, notifications, theme, avatar
- [ ] Notifications: Badge animation smooth, no jank
- [ ] Theme toggle: No flash on switch

#### Commit Message Template
```
Phase 2b: Modernize Header with search, notifications, theme toggle

Enhanced Header component:
1. Search bar with proper focus states and icon
2. Notifications badge with animation
3. Smooth theme toggle with transitions
4. Redesigned avatar dropdown menu
5. Design token integration
6. Dark mode testing and fixes

- src/components/layout/Header.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 2c: Page Transitions (1 hour)
**Status:** 📋 Ready  
**Files:** `src/app/globals.css`, route transitions  
**Scope:** Fade + slight rise on page changes

#### Tasks
- [ ] Add fade-in-up animation to page entries
- [ ] Implement smooth fade on route changes
- [ ] Respect `prefers-reduced-motion` for accessibility
- [ ] Test on all major pages

#### Testing Checklist
- [ ] Desktop: Smooth transition when navigating between pages
- [ ] Mobile: No jank or stuttering
- [ ] Accessibility: Motion disabled when `prefers-reduced-motion: reduce`
- [ ] Performance: Lighthouse still > 80

#### Commit Message Template
```
Phase 2c: Add page transitions (fade + rise)

Implemented smooth page transitions:
1. Fade-in effect on page mount
2. Slight upward motion (20px) for depth
3. Respects prefers-reduced-motion
4. Applied to all portal pages

Files:
- src/app/globals.css (new @keyframe)
- src/components/layout/PageTransition.tsx (wrapper component)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## PHASE 3: Core Pages (Remaining ~7 hours)

### Phase 3a: Login & Onboarding (2 hours)
**Status:** 📋 Ready  
**Files:** `src/app/(auth)/sign-in/page.tsx`, `src/app/(auth)/sign-up/page.tsx`, onboarding steps  
**Scope:** Split-screen design, form polish, MFA-ready

#### Pages to Update
1. Sign-in page
2. Sign-up page
3. Onboarding step-1 (profile)
4. Onboarding step-2 (goals)
5. Onboarding step-3 (confirmation)

#### Tasks
- [ ] Implement split-screen layout (gradient left, form right)
- [ ] Enhance form inputs with proper focus rings and labels
- [ ] Add password visibility toggle
- [ ] Progress indicator for onboarding steps
- [ ] Error/success state styling
- [ ] MFA field styling (for future)

#### Testing Checklist
- [ ] Light mode: Form readable, proper contrast
- [ ] Dark mode: All elements visible
- [ ] Mobile: Form full-width, stacked layout
- [ ] Keyboard: Tab order correct, all interactive elements reachable
- [ ] Password: Visibility toggle works
- [ ] Form validation: Error messages clear and styled
- [ ] Touch: Buttons at least 44x44px

#### Commit Message Template
```
Phase 3a: Modernize Login & Onboarding pages

Updated auth flow:
1. Split-screen sign-in (gradient + form)
2. Enhanced form inputs with better styling
3. Password visibility toggle
4. Progress indicator for onboarding steps
5. Improved error/success states
6. Mobile-responsive form layout

Files:
- src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
- src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
- src/app/(onboarding)/step-1/page.tsx
- src/app/(onboarding)/step-2/page.tsx
- src/app/(onboarding)/step-3/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 3b: Dashboard (2.5 hours)
**Status:** 📋 Ready  
**File:** `src/app/(portal)/dashboard/page.tsx`  
**Scope:** Hero section, stat widgets, loading/empty states

#### Tasks
- [ ] Hero section: Personalized greeting with proper typography
- [ ] Stat cards: Level, XP, streak with hover effects
- [ ] Loading state: Show skeletons while fetching
- [ ] Empty subjects: Show EmptyState component
- [ ] Quick actions: Hover scale animation
- [ ] Subject cards: Grid layout with proper spacing
- [ ] Dark mode: All colors tested

#### Testing Checklist
- [ ] Light mode: Hero readable, good contrast
- [ ] Dark mode: All text visible, proper depth
- [ ] Mobile: Single column layout, proper touch targets
- [ ] Loading: Skeletons appear, then content fades in
- [ ] Empty: EmptyState shown with proper icon/message
- [ ] Hover: Stat cards lift, quick actions scale
- [ ] Keyboard: Tab through all interactive elements
- [ ] Performance: Page loads < 2s

#### Commit Message Template
```
Phase 3b: Modernize Dashboard with loading/empty states

Updated dashboard:
1. Hero section with personalized greeting
2. Stat widgets with hover animations
3. Loading state with skeleton loaders
4. Empty state for subjects
5. Quick actions with scale animations
6. Subject card grid with spacing tokens
7. Dark mode testing and adjustments

Features:
- Skeleton loaders during data fetch
- EmptyState component when no subjects
- Proper visual hierarchy
- Micro-interactions on hover
- Full responsive design

Files:
- src/app/(portal)/dashboard/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 3c: AI Tutor Chat (2 hours)
**Status:** 📋 Ready  
**Files:** `src/components/agents/`, `src/app/(portal)/agents/tutor/[subject]/page.tsx`  
**Scope:** Message bubbles, input polish, loading states

#### Tasks
- [ ] Message bubbles: User (right) vs assistant (left)
- [ ] Input box: Multiline support, send button
- [ ] Loading state: Typing indicator + skeleton messages
- [ ] Error handling: Error message display
- [ ] Code blocks: Syntax highlighting (optional)
- [ ] Dark mode: Message contrast tested

#### Testing Checklist
- [ ] Light mode: Messages readable, good contrast
- [ ] Dark mode: All colors visible, proper depth
- [ ] Mobile: Full-screen chat, input sticky
- [ ] Loading: Typing indicator smooth animation
- [ ] Long messages: Text wraps properly
- [ ] Keyboard: Tab through input, send with Cmd+Enter
- [ ] Accessibility: Screen reader can read messages
- [ ] Performance: Chat doesn't lag on long conversations

#### Commit Message Template
```
Phase 3c: Modernize AI Tutor Chat interface

Updated chat UI:
1. Message bubbles (user right, assistant left)
2. Polished input box with send button
3. Typing indicator animation
4. Loading skeleton messages
5. Error message styling
6. Full responsive design
7. Dark mode support

Files:
- src/components/agents/ChatMessage.tsx
- src/components/agents/ChatInput.tsx
- src/components/agents/TypingIndicator.tsx
- src/app/(portal)/agents/tutor/[subject]/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 3d: Flashcards Study (2 hours)
**Status:** 📋 Ready  
**Files:** `src/components/flashcards/`, `src/app/(portal)/learning-hub/flashcards/`  
**Scope:** Card grid, study session UI, progress indicator

#### Pages to Update
1. Flashcards listing (`/learning-hub/flashcards`)
2. Deck detail (`/learning-hub/flashcards/[deckId]`)
3. Study mode (`/learning-hub/flashcards/[deckId]/study`)
4. Create deck (`/learning-hub/flashcards/new`)

#### Tasks
- [ ] Deck cards: Grid layout with progress bars
- [ ] Study UI: Card flip animation, navigation
- [ ] Progress: Visual indicator of progress through deck
- [ ] Empty state: Show when no decks
- [ ] Loading: Skeleton for deck grid
- [ ] New deck form: Clean form styling

#### Testing Checklist
- [ ] Light mode: Cards readable, good spacing
- [ ] Dark mode: Colors visible, proper contrast
- [ ] Mobile: Single column deck grid
- [ ] Card flip: Animation smooth, no jank
- [ ] Progress bar: Updates as you study
- [ ] Empty: EmptyState shown when no decks
- [ ] Keyboard: Navigate deck with arrow keys
- [ ] Accessibility: Screen reader reads card content

#### Commit Message Template
```
Phase 3d: Modernize Flashcards and Study UI

Updated flashcard feature:
1. Deck grid with proper spacing and shadow
2. Card flip animation for study mode
3. Progress indicator visual
4. Loading skeleton for deck grid
5. EmptyState for no decks
6. Clean form for creating new decks
7. Dark mode support throughout

Files:
- src/components/flashcards/DeckCard.tsx
- src/components/flashcards/FlashcardCard.tsx
- src/components/flashcards/StudySession.tsx
- src/app/(portal)/learning-hub/flashcards/page.tsx
- src/app/(portal)/learning-hub/flashcards/[deckId]/page.tsx
- src/app/(portal)/learning-hub/flashcards/[deckId]/study/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 3e: Marketplace (1.5 hours)
**Status:** 📋 Ready  
**Files:** `src/app/(portal)/marketplace/`, tutor cards, booking wizard  
**Scope:** Tutor card grid, booking flow, reviews

#### Pages to Update
1. Marketplace listing (`/marketplace`)
2. Tutor profile (`/marketplace/tutors/[tutorId]`)
3. Booking flow (`/marketplace/booking/[tutorId]`)
4. Confirmation (`/marketplace/booking/confirmation`)

#### Tasks
- [ ] Tutor cards: Grid with avatar, name, rating, price
- [ ] Card hover: Lift animation, shadow increase
- [ ] Booking form: Clean multi-step wizard
- [ ] Reviews: Star rating display, comments
- [ ] Loading: Skeleton for tutor grid
- [ ] Confirmation: Success state styling

#### Testing Checklist
- [ ] Light mode: Cards readable, ratings visible
- [ ] Dark mode: All colors visible
- [ ] Mobile: Single column tutor grid
- [ ] Card hover: Smooth lift animation
- [ ] Booking: Form validation works
- [ ] Confirmation: Success message clear
- [ ] Keyboard: Tab through all form fields
- [ ] Accessibility: Star ratings accessible

#### Commit Message Template
```
Phase 3e: Modernize Marketplace and Tutor Cards

Updated marketplace:
1. Tutor card grid with hover animations
2. Improved tutor profile layout
3. Booking wizard with form validation
4. Review ratings with star display
5. Loading skeletons for tutor grid
6. Confirmation page styling
7. Full dark mode support

Files:
- src/app/(portal)/marketplace/page.tsx
- src/app/(portal)/marketplace/tutors/[tutorId]/page.tsx
- src/app/(portal)/marketplace/booking/[tutorId]/page.tsx
- src/app/(portal)/marketplace/booking/confirmation/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## PHASE 4: Polish & Refinement (~3 hours)

### Phase 4a: Remaining Pages & Components (1.5 hours)
**Status:** 📋 Ready  
**Scope:** Settings, Achievements, Leaderboard, Learning Hub, Practice Papers

#### Pages to Update
1. Settings pages (`/settings/*`)
2. Achievements (`/achievements`)
3. Leaderboard (`/leaderboard`)
4. Learning Hub (`/learning-hub`)
5. Practice Papers (`/learning-hub/practice-papers`)

#### Tasks (per page)
- [ ] Replace default browser styling with design tokens
- [ ] Add loading skeletons for async data
- [ ] Add empty states where applicable
- [ ] Ensure proper spacing and visual hierarchy
- [ ] Test dark mode throughout
- [ ] Verify mobile responsiveness

#### Commit Message Template
```
Phase 4a: Modernize remaining pages

Updated:
1. Settings pages with proper form styling
2. Achievements with badge grid
3. Leaderboard with proper table styling
4. Learning Hub with course cards
5. Practice Papers with proper layout

All pages now include:
- Design token integration
- Loading skeletons
- Empty states
- Dark mode support
- Responsive design

Files:
- src/app/(portal)/settings/page.tsx
- src/app/(portal)/settings/profile/page.tsx
- src/app/(portal)/settings/appearance/page.tsx
- src/app/(portal)/settings/notifications/page.tsx
- src/app/(portal)/settings/privacy/page.tsx
- src/app/(portal)/achievements/page.tsx
- src/app/(portal)/leaderboard/page.tsx
- src/app/(portal)/learning-hub/page.tsx
- src/app/(portal)/learning-hub/practice-papers/page.tsx

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 4b: Accessibility & Performance (1 hour)
**Status:** 📋 Ready  
**Scope:** WCAG compliance, Lighthouse optimization

#### Tasks
- [ ] Run Lighthouse on all pages (target > 80)
- [ ] Axe DevTools scan for accessibility issues
- [ ] Verify keyboard navigation throughout
- [ ] Check color contrast (WCAG AA minimum)
- [ ] Test screen reader on key flows
- [ ] Optimize images (loading lazy)
- [ ] Lazy-load non-critical routes

#### Commit Message Template
```
Phase 4b: Accessibility and performance improvements

Improvements:
1. Lighthouse scores > 80 on all pages
2. WCAG 2.2 AA compliance (color contrast, focus rings)
3. Keyboard navigation tested throughout
4. Screen reader tested on key flows
5. Image optimization and lazy-loading
6. Route code-splitting for performance

Verified:
- All interactive elements keyboard accessible
- Focus rings visible and properly styled
- Color contrast meets WCAG AA standards
- Motion animations respect prefers-reduced-motion
- Page load times optimized

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### Phase 4c: Documentation & Handoff (0.5 hours)
**Status:** 📋 Ready  
**Scope:** Final docs, team handoff

#### Tasks
- [ ] Update UI-MIGRATION.md with any learnings
- [ ] Create component usage examples doc
- [ ] Document design token usage patterns
- [ ] Update README with dark mode instructions
- [ ] Tag final version as "ui-modernization-complete"

#### Commit Message Template
```
Phase 4c: Update documentation and finalize modernization

Documentation updates:
1. Final UI-MIGRATION.md with complete examples
2. Component usage guide
3. Design token pattern reference
4. Dark mode implementation guide
5. Team handoff notes

Tag: ui-modernization-complete

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## 🗂️ Global Testing Checklist (Per Phase)

After completing each phase, run this checklist:

### Visual Testing
- [ ] Light mode: All pages screenshot clean
- [ ] Dark mode: Toggle theme, verify all pages
- [ ] Mobile (375px): No horizontal scroll
- [ ] Tablet (768px): Proper responsive layout
- [ ] Desktop (1440px): Full layout visible

### Interaction Testing
- [ ] Buttons: Hover scale, active state, disabled state
- [ ] Links: Visited styling, hover underline
- [ ] Forms: Focus rings visible, validation states
- [ ] Dropdowns: Open/close smooth, arrow animation
- [ ] Animations: No jank, smooth 60fps

### Accessibility Testing
- [ ] Keyboard: Tab through all elements in order
- [ ] Focus: Visible focus rings on all interactive elements
- [ ] Screen reader: Test with NVDA or VoiceOver
- [ ] Color: Contrast check with WebAIM
- [ ] Motion: Disable motion, verify animations respect it

### Performance Testing
- [ ] Lighthouse: Run on each page, target > 80
- [ ] Bundle size: No significant increase
- [ ] Image size: Optimized, lazy-loaded
- [ ] Network: No unnecessary requests

### Dark Mode Testing
- [ ] Colors: All text readable (target 4.5:1+ ratio)
- [ ] Images: Still visible, not blown out
- [ ] Borders: Visible against background
- [ ] Shadows: Still provide depth
- [ ] Transitions: No flash on toggle

---

## 📊 Progress Tracking Template

Copy this to track your progress:

```markdown
## UI Modernization Progress — [DATE]

### Completed
- [x] Phase 1: Design tokens + primitives
- [x] Phase 2a: Sidebar
- [ ] Phase 2b: Header
- [ ] Phase 2c: Page transitions
- [ ] Phase 3a: Login/Onboarding
- [ ] Phase 3b: Dashboard
- [ ] Phase 3c: AI Tutor Chat
- [ ] Phase 3d: Flashcards
- [ ] Phase 3e: Marketplace
- [ ] Phase 4a: Remaining pages
- [ ] Phase 4b: Accessibility/Performance
- [ ] Phase 4c: Documentation

### Current
- [ ] Working on: [Phase X.Y - Page Name]
- [ ] Estimated completion: [DATE]
- [ ] Blockers: None

### Notes
- [Any learnings, gotchas, or interesting discoveries]
```

---

## 💡 Pro Tips for Smooth Rollout

1. **Commit Often:** Each page = 1 commit. Easier to revert if needed.
2. **Test Incrementally:** After each page, run full testing checklist.
3. **Dark Mode First:** Design in dark mode, then light mode. Easier to darken than lighten.
4. **Mobile-First:** Sketch mobile layout first, then desktop. Responsive happens naturally.
5. **Skeleton First:** Add Skeleton loaders before enhancing visuals. Users prefer perceived speed.
6. **Token Consistency:** Every color/space must come from tokens. No magic values.
7. **Take Breaks:** 2-3 pages per session = better quality, less burnout.
8. **Record before/after:** Screenshots of each page before/after for demo purposes.

---

## ⏱️ Time Estimates (By Experience Level)

If you're new to React/Tailwind:
- Phase 2: 4-5 hours (double time)
- Phase 3: 12-15 hours (double time)
- Phase 4: 4-5 hours (double time)
- **Total: 24-30 hours**

If you're intermediate:
- Phase 2: 2.5 hours
- Phase 3: 7 hours
- Phase 4: 3 hours
- **Total: 12.5 hours**

If you're experienced:
- Phase 2: 2 hours
- Phase 3: 6 hours
- Phase 4: 2 hours
- **Total: 10 hours**

---

## 🎯 Quality Gate: Phase Completion Criteria

A phase is complete when:
1. ✅ All files modified/created as planned
2. ✅ Tests pass (if applicable)
3. ✅ Visual testing checklist complete (light/dark/mobile)
4. ✅ No console errors or warnings
5. ✅ Lighthouse score > 80
6. ✅ Commit message clear and follows template
7. ✅ Changes pushed to GitHub

Only move to next phase when all criteria met.

---

## 🚀 Getting Started

**To start Phase 2b (Header):**

```bash
# Verify you're on main with latest changes
git checkout master
git pull origin master

# Verify current state
git log --oneline -3  # Should show Phase 2a commit

# Start working on Header
# Follow Phase 2b tasks above
# Test locally before committing
# Push to GitHub when complete

# Repeat for next phase
```

---

## 📞 Support

If you get stuck on a phase:

1. Check UI-MIGRATION.md for pattern examples
2. Review completed phases for reference
3. Re-run the testing checklist
4. Verify design tokens are being used
5. Check dark mode is working

---

**Generated:** 2026-06-09  
**Status:** Ready for Phase 2b (Header)  
**Estimated Total Time:** 10-30 hours depending on experience  
**Next Step:** Start Phase 2b Header Modernization

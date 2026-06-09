# UI Migration Guide — GCSC Student Portal Modernization

This document guides developers through modernizing pages using the new design system.

---

## 1. Using Design Tokens

Instead of magic values, import tokens from `src/styles/tokens.ts`:

```tsx
import { colors, spacing, borderRadius, shadows, typography, motion, componentSizes } from '@/styles/tokens'

// ❌ BEFORE: Magic values
<div style={{ padding: '16px', backgroundColor: '#FF6B6B', borderRadius: '12px' }}>

// ✅ AFTER: Design tokens
<div className={cn(
  'p-4 rounded-lg',  // Uses spacing.md (16px), borderRadius.lg (12px)
  'bg-primary-500'   // Uses colors.primary[500] (#FF6B6B)
)}>
```

### Common Token Usage Patterns

**Colors:**
```tsx
// Use Tailwind classes mapped to tokens
className="text-primary-500 bg-slate-100 border-slate-200"
// Dark mode is automatic via dark: prefix
className="dark:text-white dark:bg-slate-900 dark:border-slate-800"
```

**Spacing (4px grid):**
```tsx
// Tailwind spacing already aligned: p-4 = 16px (md)
className="px-6 py-4 space-y-2"
// Or use spacing tokens directly:
style={{ padding: spacing.lg }} // 24px
```

**Typography:**
```tsx
import { typography } from '@/styles/tokens'

<h1 style={{ fontSize: typography.fontSize['2xl'].size }}>
  {/* Or just use Tailwind: */}
  <h1 className="text-2xl font-bold">
```

**Shadows:**
```tsx
// Light mode:
className="shadow-md"  // Automatic light shadow
// Dark mode:
className="dark:shadow-dark-md"
```

**Motion:**
```tsx
className="transition-colors duration-200"  // Tailwind duration
// Or use motion tokens:
style={{ transition: `all ${motion.duration.slow} ${motion.easing.ease}` }}
```

---

## 2. New Primitive Components

### Skeleton Loaders

**Before:** No loading state
**After:** Use Skeleton component during data fetch

```tsx
import { Skeleton, SkeletonGrid } from '@/components/primitives/Skeleton'

function MyComponent({ data, isLoading }) {
  if (isLoading) {
    return <SkeletonGrid count={6} variant="card" columns={3} />
  }

  return (
    // Content
  )
}

// Individual skeletons:
<Skeleton variant="line" lines={3} />           // 3 text lines
<Skeleton variant="circle" width="40px" />     // Avatar placeholder
<Skeleton variant="card" />                     // Full card placeholder
```

### Empty States

**Before:** Blank space or no feedback
**After:** Helpful empty state with icon, title, description, and CTA

```tsx
import { EmptyState, EmptySearchState } from '@/components/primitives/EmptyState'

function CourseList({ courses, searchQuery }) {
  if (courses.length === 0) {
    if (searchQuery) {
      return <EmptySearchState query={searchQuery} onClear={() => setSearchQuery('')} />
    }

    return (
      <EmptyState
        icon="📚"
        title="No courses yet"
        description="Start exploring courses to add them to your learning path"
        action={{ label: 'Browse Courses', href: '/learning-hub' }}
      />
    )
  }

  return (
    // Course list
  )
}
```

---

## 3. Component Modernization Checklist

When updating a page or component, follow this checklist:

### Visual Hierarchy
- [ ] One primary focal point (hero, title, or featured content)
- [ ] Clear information hierarchy (H1 → H2 → H3)
- [ ] Proper contrast ratios for accessibility (WCAG AA)
- [ ] Generous white space (padding, margins, gaps)

### Interactivity
- [ ] Buttons have hover, active, and disabled states
- [ ] Focus rings visible on all interactive elements
- [ ] Micro-interactions on hover/click (scale, color, shadow)
- [ ] Smooth transitions (150-300ms) using motion tokens

### Loading & Error States
- [ ] Loading: Show skeleton loaders
- [ ] Empty: Show EmptyState component
- [ ] Error: Show error message with retry action
- [ ] All states tested and designed

### Responsive Design
- [ ] Mobile-first breakpoints (xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- [ ] Test on actual mobile devices (not just viewport)
- [ ] Touch targets at least 44x44px
- [ ] No horizontal scroll on mobile

### Dark Mode
- [ ] All pages tested in dark mode
- [ ] Proper contrast in both modes
- [ ] Use `dark:` prefix for dark mode styles
- [ ] Images/illustrations look good in both modes

### Accessibility
- [ ] Semantic HTML (button, a, input, etc.)
- [ ] ARIA labels on icon-only buttons
- [ ] Focus order makes sense (Tab navigation)
- [ ] Color isn't the only way to convey information
- [ ] Form validation messages are clear

---

## 4. Page Modernization Order

### Phase 2: Layout & Shell (Week 1-2)
- [ ] Sidebar: Icon-only compact mode, better active states
- [ ] Header: Search bar, notifications, theme toggle, avatar menu
- [ ] Page transitions: Fade + slight rise on route change
- [ ] Mobile nav: Consider bottom tab bar for portal

### Phase 3: Core Pages (Week 2-3)
1. **Login/Sign-Up** — Split-screen, form polish, MFA-ready
2. **Onboarding** — Progress indicator, smooth transitions
3. **Dashboard** — Widget grid (next class, GPA, due assignments)
4. **AI Tutor Chat** — Message bubbles, input polish, loading states
5. **Flashcards** — Study mode with proper spacing, study session polish
6. **Marketplace** — Tutor cards, booking wizard, reviews
7. **Settings** — Tab-based layout, proper form styling
8. **Achievements** — Badge grid with animations
9. **Leaderboard** — Table with proper sorting, filtering

### Phase 4: Polish (Week 3-4)
- [ ] Command palette (⌘K search)
- [ ] Toast notifications
- [ ] Error boundaries
- [ ] Performance optimization
- [ ] Documentation updates

---

## 5. Example: Modernizing a Page

### Dashboard (Before)

```tsx
// ❌ OLD: Static layout, no loading state, poor spacing
export default function DashboardPage() {
  const { data, loading } = useDashboardData()

  return (
    <div>
      <h1>Dashboard</h1>
      {data && (
        <>
          <div style={{ padding: '10px' }}>
            <p>Level: {data.level}</p>
            <p>XP: {data.xp}</p>
          </div>
          <div>
            {data.subjects.map(subject => (
              <div key={subject.id}>{subject.name}</div>
            ))}
          </div>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}
```

### Dashboard (After)

```tsx
import { Skeleton, SkeletonGrid } from '@/components/primitives/Skeleton'
import { EmptyState } from '@/components/primitives/EmptyState'
import { spacing, borderRadius, shadows } from '@/styles/tokens'

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData()

  // Loading state: Show skeletons
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="line" width="40%" height="32px" /> {/* Title */}
        <SkeletonGrid count={3} variant="card" columns={3} /> {/* Stats */}
        <SkeletonGrid count={6} variant="card" /> {/* Subjects */}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="Oops! Something went wrong"
        description="We couldn't load your dashboard. Try refreshing."
        action={{ label: 'Try again', onClick: () => window.location.reload() }}
      />
    )
  }

  // Empty state
  if (!data) {
    return (
      <EmptyState
        icon="📊"
        title="Complete onboarding"
        description="Finish setting up your profile to see your dashboard"
        action={{ label: 'Continue setup', href: '/onboarding' }}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome back, {data.firstName}! 👋
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Track your progress and master your subjects
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {data.stats.map(stat => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="hover:shadow-lg transition-shadow duration-300"
          />
        ))}
      </section>

      {/* Subjects Section */}
      {data.subjects.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Subjects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.subjects.map(subject => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState
          icon="📚"
          title="No subjects yet"
          description="Add subjects to your learning path"
          action={{ label: 'Browse subjects', href: '/learning-hub' }}
        />
      )}
    </div>
  )
}

function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-lg bg-white dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
        'shadow-sm dark:shadow-dark-sm',
        'transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md',
        'hover:-translate-y-1', // Lift on hover
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {trend && (
          <TrendIndicator value={trend} />
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase">
        {label}
      </p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
        {value}
      </p>
    </div>
  )
}
```

### Key Improvements
✅ Skeleton loaders during async fetch  
✅ Proper error and empty states  
✅ Visual hierarchy (h1 > h2 > stat cards)  
✅ Generous spacing using design tokens  
✅ Hover micro-interactions (shadow, lift)  
✅ Dark mode proper colors  
✅ Responsive grid layout  
✅ Accessible semantic HTML  

---

## 6. Dark Mode Best Practices

Never just invert colors. Use `dark:` prefix strategically:

```tsx
// ✅ GOOD: Thoughtful dark mode colors
<div className="
  bg-white dark:bg-slate-900           // Light/dark backgrounds
  text-slate-900 dark:text-slate-100   // Text with proper contrast
  border-slate-200 dark:border-slate-700 // Borders with depth
  shadow-sm dark:shadow-dark-sm        // Shadows adapted for dark
">

// ❌ BAD: Just inverting
<div className="
  bg-white dark:bg-black
  text-black dark:text-white
  invert dark:invert-0
">
```

---

## 7. Testing Checklist

Before marking a page as complete:

- [ ] **Light mode:** Screenshot on desktop
- [ ] **Dark mode:** Toggle theme and verify colors/contrast
- [ ] **Mobile:** Test on actual phone (not just browser viewport)
- [ ] **Keyboard:** Tab through all interactive elements, verify focus rings
- [ ] **Loading:** Trigger data fetch, verify skeletons appear
- [ ] **Empty:** Clear data, verify empty state appears
- [ ] **Error:** Simulate API error, verify error state appears
- [ ] **Performance:** Lighthouse score > 80
- [ ] **Accessibility:** axe DevTools scan passes

---

## 8. Component Library Reference

### Already Available (shadcn/ui)
- Button, Input, Select, Textarea
- Card, Badge
- Modal, Dialog, Sheet (Drawer)
- Tabs, Accordion, Dropdown (Menu)

### New in This Update
- Skeleton, SkeletonGrid, SkeletonTableRow, SkeletonListItem
- EmptyState, EmptySearchState, EmptyPermissionState, EmptyErrorState

### To Audit/Improve
- Check Button variants (primary, secondary, ghost, danger) match design tokens
- Check Card padding/radius/shadow use design tokens
- Check Form inputs have proper dark mode, focus rings, validation states

---

## 9. Commit Strategy

Keep commits small and focused:

```bash
# Phase 1
git commit -m "Phase 1: Design tokens and primitives"

# Phase 2a
git commit -m "Phase 2a: Modernize Sidebar and Header"

# Phase 3a
git commit -m "Phase 3a: Modernize Login/Onboarding pages"

# Phase 3b
git commit -m "Phase 3b: Modernize Dashboard with loading/empty states"

# Phase 3c
git commit -m "Phase 3c: Modernize AI Tutor chat interface"

# Phase 4
git commit -m "Phase 4: Polish, accessibility, performance"
```

---

## 10. Success Metrics

By the end of modernization:
- ✅ All pages have modern visual hierarchy
- ✅ Loading/empty/error states designed and implemented
- ✅ Dark mode works throughout
- ✅ Responsive on all breakpoints
- ✅ No breaking API changes
- ✅ WCAG 2.2 AA compliance
- ✅ Lighthouse score > 80
- ✅ Bundle size unchanged (no unnecessary deps)

---

**Generated:** 2026-06-09  
**Status:** Phase 1 Complete, ready for Phase 2  
**Est. Total Time:** 2-3 weeks @ 4hrs/day

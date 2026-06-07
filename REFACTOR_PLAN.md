# Refactoring Plan - GCSC Student Hub

## Goals
1. Reduce code duplication
2. Standardize patterns
3. Improve maintainability
4. Consolidate scattered logic
5. Centralize type definitions

## Phase 1: Types & Constants Consolidation

### Current State
- Types scattered across files
- Constants duplicated in multiple places
- Subject metadata repeated

### Refactoring
- [ ] Create `src/types/index.ts` - Centralize all type definitions
- [ ] Create `src/constants/index.ts` - All app constants
- [ ] Create `src/constants/subjects.ts` - Subject metadata
- [ ] Create `src/constants/achievements.ts` - Achievement definitions
- [ ] Update all imports to use centralized types

## Phase 2: API Route Consolidation

### Current State
- 15+ individual API route files
- Similar patterns repeated
- Duplicated auth checks
- Duplicated error handling

### Refactoring
- [ ] Create `src/lib/api/handlers.ts` - Shared API patterns
- [ ] Create `src/lib/api/errors.ts` - Standardized error responses
- [ ] Create `src/lib/api/auth.ts` - Shared auth middleware
- [ ] Consolidate flashcard routes (decks, cards, review, study)
- [ ] Consolidate agent routes
- [ ] Consolidate gamification routes

## Phase 3: Component Standardization

### Current State
- Input components have inconsistent styling
- Form handling patterns differ
- Card components duplicated
- Loading states vary

### Refactoring
- [ ] Create `src/components/forms/` - Standardized form components
- [ ] Create `src/components/cards/` - Reusable card patterns
- [ ] Create `src/components/layout/` - Layout utilities
- [ ] Standardize all form inputs with consistent styling
- [ ] Extract loading states to shared components
- [ ] Consolidate button variants

## Phase 4: Utility Functions Extraction

### Current State
- Utility functions scattered
- Math calculations duplicated
- Date formatting inconsistent
- String manipulation repeated

### Refactoring
- [ ] Create `src/lib/utils/math.ts` - XP, level calculations
- [ ] Create `src/lib/utils/dates.ts` - Date/time utilities
- [ ] Create `src/lib/utils/strings.ts` - String manipulation
- [ ] Create `src/lib/utils/validation.ts` - Input validation
- [ ] Extract and consolidate all repeated logic

## Phase 5: Hook Standardization

### Current State
- Form handling logic in components
- API calls duplicated
- State management inconsistent

### Refactoring
- [ ] Create `src/hooks/useForm.ts` - Standardized form hook
- [ ] Create `src/hooks/useApi.ts` - Standardized API calls
- [ ] Create `src/hooks/useAuth.ts` - Auth utilities
- [ ] Create `src/hooks/useXP.ts` - XP/gamification hooks
- [ ] Move form logic from components to hooks

## Phase 6: Styling Consistency

### Current State
- Tailwind classes inconsistent
- Color usage scattered
- Responsive design patterns vary
- Component styling mixed with logic

### Refactoring
- [ ] Create `src/styles/config.ts` - Design tokens
- [ ] Create `src/styles/patterns.ts` - Reusable Tailwind patterns
- [ ] Standardize all component styling
- [ ] Use consistent spacing, colors, shadows
- [ ] Extract inline styles to pattern classes

## Phase 7: Page Layout Refactoring

### Current State
- Layout logic in pages
- Header/footer patterns repeated
- Sidebar/nav inconsistent

### Refactoring
- [ ] Create `src/components/layout/PageLayout.tsx` - Standard page wrapper
- [ ] Create `src/components/layout/PageHeader.tsx` - Consistent headers
- [ ] Create `src/components/layout/Card.tsx` - Card wrapper
- [ ] Refactor all pages to use layout components

## Phase 8: Database & Prisma Cleanup

### Current State
- Similar queries in multiple routes
- Inconsistent include patterns
- Repeated user fetching

### Refactoring
- [ ] Create `src/lib/db/queries.ts` - Shared query patterns
- [ ] Create `src/lib/db/includes.ts` - Standard Prisma includes
- [ ] Consolidate all Prisma queries
- [ ] Add query caching where appropriate

## Success Criteria
- [ ] No duplicate imports
- [ ] No repeated utility functions
- [ ] All API routes follow same pattern
- [ ] All components use same input/button patterns
- [ ] All types centralized
- [ ] All constants in one place
- [ ] Code coverage remains 100%
- [ ] No breaking changes to functionality
- [ ] Tests pass
- [ ] All pages render correctly

## Estimated Impact
- **Code reduction**: 20-30% fewer lines
- **Maintainability**: Significantly improved
- **Consistency**: 95%+ uniform patterns
- **Onboarding**: New devs understand patterns faster

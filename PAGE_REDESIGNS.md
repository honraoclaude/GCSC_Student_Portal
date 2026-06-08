# PAGE REDESIGNS - COMPLETE SPECIFICATION GUIDE

Comprehensive design specifications for all GCSC Student Hub pages with detailed component styling, typography, spacing, animations, and responsive behavior.

---

## TABLE OF CONTENTS

1. [LANDING PAGE](#page-1-landing-page)
2. [SIGN IN PAGE](#page-2-sign-in-page)
3. [SIGN UP PAGE](#page-3-sign-up-page)
4. [ONBOARDING FLOW](#page-4-onboarding-flow)
5. [DASHBOARD](#page-5-dashboard)
6. [AI TUTOR PAGES](#pages-6-9-ai-tutor-pages)
7. [LEARNING HUB & SUBPAGES](#pages-10-17-learning-hub)
8. [LEADERBOARD](#page-18-leaderboard)
9. [ACHIEVEMENTS](#page-19-achievements)
10. [SETTINGS & PROFILE](#pages-20-22-user-settings)
11. [RESPONSIVE SPECIFICATIONS](#mobile-first-responsive-specifications)
12. [DARK MODE SPECIFICATIONS](#dark-mode-specifications)
13. [ACCESSIBILITY SPECIFICATIONS](#accessibility-specifications)

---

## PAGE 1: LANDING PAGE

**Route:** `/` (public)
**Layout:** Full-width responsive hero with multiple sections

### Section 1.1: Hero Section

**Container:**
- Background: Gradient white to blue-50 (light) / slate-900 to blue-950 (dark)
- Min-height: 100vh
- Position: relative
- Padding: xl (32px) top-bottom, container padded

**Hero Layout (Desktop):**
- Grid: 2-column (50/50 split)
- Left column: Text content (flex-col center-vertical)
- Right column: Hero image with parallax

**Hero Image:**
- Filename: `hero-ai-revolution.png`
- Dimensions: 1920x1080 native, responsive scaling
- Position: Right-aligned desktop, centered mobile
- Animation: Subtle parallax on scroll (10% movement Y-axis)
- Aspect ratio: Maintain 16:9

**Main Heading (H1):**
- Content: "Your AI-Powered GCSE Success Platform"
- Font: Poppins, 56px weight-700 (desktop) / 48px (tablet) / 36px (mobile)
- Color: Gradient blue-600 to purple-600 / blue-400 to purple-400 (dark)
- Line-height: 1.2
- Letter-spacing: -0.02em
- Max-width: 500px
- Margin: 0 0 16px 0
- Animation: Fade-in 300ms, slide-up 300ms on load

**Subheading:**
- Content: "Master every subject with personalized AI tutors, revision plans, and expert guidance"
- Font: Inter, 18px regular (desktop) / 16px (tablet) / 14px (mobile)
- Color: slate-600 / slate-300 (dark)
- Line-height: 1.6
- Margin: 16px 0 24px 0
- Max-width: 550px

**Trust Badge:**
- Content: "Trusted by 50,000+ UK students"
- Font: Inter, 14px semibold
- Color: slate-600 / slate-400 (dark)
- Display: Flex, gap 8px, align-items center
- Icon: Small checkmark or star (16px)
- Margin-bottom: 24px

**CTA Button Group:**
- Layout: Flex, gap 16px (desktop) / stack (mobile)
- Buttons wrap on tablet

**CTA Button 1 - Primary:**
- Label: "Start Free Trial"
- Style: Solid gradient background (blue-600 to purple-600)
- Text: white, 16px semibold
- Height: 48px
- Padding: 12px 32px
- Border-radius: 8px (md)
- Hover: Brightness increase 10%, translate-y -2px, shadow-lg
- Active: Scale 0.98
- Transition: 200ms all ease
- Icon: None (text only)

**CTA Button 2 - Secondary:**
- Label: "See Demo"
- Style: Outline, 2px blue-600 border
- Text: blue-600, 16px semibold
- Background: transparent / white/5 (dark)
- Height: 48px
- Padding: 12px 32px
- Border-radius: 8px (md)
- Hover: Blue background fade-in, brightness
- Transition: 200ms all ease

---

### Section 1.2: Features Grid (3 Cards)

**Container:**
- Background: white / slate-900
- Padding: xl (32px) vertical, container max-width 1200px
- Margin: xl (32px) 0

**Section Heading (H2):**
- Content: "Why Choose GCSC Hub?"
- Font: Poppins, 44px weight-700 (desktop) / 32px (tablet) / 24px (mobile)
- Color: slate-900 / white (dark)
- Text-align: center
- Margin-bottom: 48px
- Animation: Fade-in 300ms on scroll into view

**Cards Grid:**
- Layout: 3-column (desktop) / 2-column (tablet) / 1-column (mobile)
- Gap: 24px
- Auto-flow: dense

**Card Structure (repeated 3x):**
- Background: white / slate-900 with 2px border
- Border-color: blue-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Shadow: sm (0 1px 2px) → md on hover
- Transition: 200ms all ease-out
- Hover state:
  - Transform: translateY -4px
  - Shadow: md (0 4px 6px)
  - Border-color: brighten 50%

**Card 1: AI-Powered Tutors**
- Feature image: `feature-ai-tutor.png` (400x300)
- Icon: AI tutor mascot (48px, top-left)
- Animation: Subtle pulse (infinite, 2s)
- Title: "AI Tutors That Adapt to You"
  - Font: 20px semibold
  - Margin: 16px 0 8px 0
- Description: "8 specialized AI agents covering every subject and learning style"
  - Font: 14px, slate-600 / slate-400
  - Line-height: 1.5

**Card 2: Smart Revision**
- Feature image: `feature-revision-hub.png` (400x300)
- Icon: Flashcard icon (48px, top-left)
- Animation: Flip on hover (200ms)
- Title: "Revision Made Intelligent"
- Description: "SM-2 spaced repetition meets AI-generated flashcards"

**Card 3: Expert Tutors**
- Feature image: `feature-marketplace.png` (400x300)
- Icon: People/connection icon (48px, top-left)
- Title: "Connect with Real Tutors"
- Description: "Book verified tutors, connect instantly, track progress"

**Card Animation:**
- All cards fade-in + slide-up staggered (50ms delays)
- Entrance delay: 0ms, 50ms, 100ms respectively

---

### Section 1.3: Features Deep Dive (Alternating Layout)

**Container:**
- Padding: 4xl (96px) vertical gap between features
- Max-width: 1200px
- Margin: 0 auto

**Deep Dive Feature Structure (4 total):**

**Feature 1: AI Tutors (Image Left)**
- Layout: 2-column grid (desktop) / stacked (mobile)
- Gap: xl (32px)
- Image column:
  - Image: `feature-ai-tutor.png` (600x400)
  - Position: left
  - Border-radius: lg (12px)
  - Shadow: md
- Text column:
  - Max-width: 500px
  - Heading (H3): "Personalized AI Tutoring"
    - Font: Poppins, 32px bold
    - Margin-bottom: 16px
  - Description: 2-3 lines of body text (16px)
  - Benefits list (4 items with icons):
    - Icon: 20px (subject-colored)
    - Text: 14px
    - Margin: 12px 0
  - CTA: "Explore AI Tutors →" (secondary button, text-link style)
    - Color: blue-600 / blue-400
    - Hover: underline, arrow moves right 4px

**Feature 2: Revision Hub (Image Right)**
- Layout: 2-column grid reversed (desktop) / stacked (mobile)
- Image position: right
- Otherwise identical structure to Feature 1

**Feature 3: Marketplace (Image Left)**
- Layout: 2-column grid (desktop)
- Otherwise identical structure

**Feature 4: Practice Papers (Image Right)**
- Layout: 2-column grid reversed
- Otherwise identical structure

---

### Section 1.4: Testimonials Section

**Container:**
- Background image: `social-proof-celebration.png` (full-width, tiled)
- Background-attachment: fixed (desktop) / scroll (mobile)
- Overlay: Linear gradient 0deg, blue-600/30% to blue-950/30%
- Padding: xl (32px)
- Min-height: 500px
- Position: relative

**Section Heading (H2):**
- Content: "Loved by Students"
- Font: Poppins, 44px bold
- Color: white with text-shadow 2px 2px 4px rgba(0,0,0,0.3)
- Text-align: center
- Margin-bottom: 48px

**Testimonials Grid:**
- Layout: 4-column (desktop) / 2-column (tablet) / 1-column (mobile)
- Gap: 24px
- Max-width: 1200px
- Margin: 0 auto

**Testimonial Card:**
- Background: blue-50/95 / slate-900 (dark)
- Border: 2px solid, color varies (blue-200 / slate-700)
- Padding: md (16px)
- Border-radius: md (8px)
- Shadow: md
- Transition: 200ms all ease
- Hover:
  - Transform: scale 1.02
  - Shadow: lg
  - Border-color: brighten

**Card Content (top to bottom):**
1. **Avatar & Name Section:**
   - Avatar: 50x50 circular image, border 3px subject-color
   - Name: 16px semibold, slate-900 / white
   - Spacing: 12px gap, flex row

2. **Achievement Badge:**
   - Content: "Improved from Grade 5 to Grade 9"
   - Font: 14px semibold
   - Color: green-600 / green-400
   - Background: green-50 / green-900
   - Padding: 4px 8px
   - Border-radius: full
   - Margin: 8px 0

3. **Quote:**
   - Font: 16px, italic, slate-700 / slate-300
   - Line-height: 1.6
   - Margin: 12px 0
   - Max-lines: 3 (clamp if necessary)

4. **Rating:**
   - Stars: 5 stars (gold #FCD34D)
   - Count: "4.8/5" (12px) below stars
   - Color: slate-600 / slate-400

---

### Section 1.5: Statistics Section

**Container:**
- Background image: `stats-bg-pattern.png` (tileable, full-width)
- Background-size: cover
- Background-position: center
- Overlay: Linear gradient 0deg, blue-600/40% to blue-950/40%
- Padding: xl (32px)
- Position: relative

**Section Heading (H2):**
- Content: "By The Numbers"
- Font: Poppins, 44px bold
- Color: white with text-shadow
- Text-align: center
- Margin-bottom: 48px

**Stats Grid:**
- Layout: 4-column (desktop) / 2-column (mobile)
- Gap: 24px
- Max-width: 1200px
- Margin: 0 auto

**Stat Card:**
- Background: Gradient blue-50 to purple-50 / blue-900 to purple-900
- Border: 2px blue-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Text-align: center
- Box-shadow: md

**Stat Number:**
- Font: 44px bold
- Background: Linear gradient blue-600 to purple-600
- Background-clip: text
- Color: transparent (reveals gradient)
- Line-height: 1
- Animation: Counter 0 → value, 2s ease-out, staggered

**Stat Label:**
- Font: 14px, slate-600 / slate-400
- Margin-top: 8px
- Font-weight: 500

**Stats (4 total):**
1. "50,000+" / "Active Students"
2. "8" / "AI Agents"
3. "10,000+" / "Tutors Available"
4. "98%" / "Success Rate"

---

### Section 1.6: CTA Section (Conversion)

**Container:**
- Background: Linear gradient 135deg, blue-600 to purple-600
- Padding: xl (32px)
- Border-radius: lg (12px)
- Max-width: 600px
- Margin: 0 auto
- Box-shadow: lg

**Heading (H2):**
- Content: "Ready to Transform Your Grades?"
- Font: Poppins, 44px bold
- Color: white
- Text-align: center
- Margin-bottom: 16px

**Subheading:**
- Content: "Join 50,000+ students improving with AI"
- Font: Inter, 18px regular
- Color: white with opacity 90%
- Text-align: center
- Margin-bottom: 32px
- Line-height: 1.6

**Form:**
- Layout: Flex column gap 16px
- Max-width: 100%

**Email Input:**
- Type: email
- Placeholder: "your.email@example.com"
- Background: white
- Text-color: slate-900
- Padding: 12px 16px
- Border-radius: md (8px)
- Border: 2px solid transparent
- Font: 16px
- Width: 100%
- Focus:
  - Border-color: blue-400
  - Box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
  - Outline: none
- Error state:
  - Border-color: red-500
  - Text below: red-500, 12px

**Submit Button:**
- Label: "Start Free Trial"
- Style: Gradient secondary
- Color: white
- Width: 100%
- Height: 48px
- Hover: Brightness +10%, translate-y -2px
- Transition: 200ms all ease

---

### Section 1.7: Footer

**Container:**
- Background: slate-900
- Border-top: 2px solid slate-700
- Padding: xl (32px) vertical, container width
- Margin-top: 4xl (96px)

**Footer Layout:**
- Grid: 5-column (desktop) / 1-column (mobile)
- Gap: xl (32px)
- Max-width: 1200px
- Margin: 0 auto

**Column 1: Brand**
- Logo: 40x40 SVG/image
- Copyright: "© 2024 GCSC Hub. All rights reserved."
  - Font: 12px
  - Color: slate-400
  - Margin-top: 12px

**Column 2: Product**
- Heading: "Product" (12px bold, uppercase, tracking)
- Links:
  - "AI Tutors"
  - "Flashcards"
  - "Marketplace"
  - "Practice Papers"

**Column 3: Company**
- Heading: "Company"
- Links:
  - "About"
  - "Blog"
  - "Careers"
  - "Press"

**Column 4: Resources**
- Heading: "Resources"
- Links:
  - "Help Center"
  - "FAQ"
  - "Documentation"
  - "Status"

**Column 5: Legal**
- Heading: "Legal"
- Links:
  - "Privacy Policy"
  - "Terms of Service"
  - "Cookie Policy"
  - "Contact"

**Link Styling:**
- Font: 14px, slate-300
- Color: slate-300
- Hover: white, underline
- Transition: 200ms all ease

**Social Icons (Bottom):**
- Icons: LinkedIn, Twitter, YouTube, Instagram, TikTok (24x24)
- Position: Bottom center
- Gap: 16px
- Hover: Scale 1.1, color-change to subject colors
- Transition: 200ms transform ease

---

## PAGE 2: SIGN IN PAGE

**Route:** `/sign-in` (public, Clerk protected)
**Layout:** Asymmetric 2-column desktop, single-column mobile
**Min-height:** 100vh

### Section 2.1: Overall Layout

**Container:**
- Display: Flex
- Min-height: 100vh

**Left Column (Form):**
- Width: 40% (desktop) / 100% (mobile)
- Display: Flex, flex-direction column, justify-content center
- Padding: xl (32px)
- Max-width: 480px

**Right Column (Visual):**
- Width: 60% (desktop) / hidden (mobile)
- Background image: `learning-student-bg.png` or gradient
- Position: relative
- Overlay: Linear gradient 90deg, blue-600/40% to purple-600/40%
- Display: flex, justify-content center, align-items center

---

### Section 2.2: Form Container

**Header:**
- Margin-bottom: 32px

**Logo:**
- Size: 40x40
- Margin-bottom: 32px

**Heading (H1):**
- Content: "Welcome Back"
- Font: Poppins, 44px bold (desktop) / 32px (mobile)
- Color: slate-900 / white
- Margin-bottom: 8px

**Subheading:**
- Content: "Sign in to continue your learning journey"
- Font: Inter, 16px regular
- Color: slate-600 / slate-400
- Margin-bottom: 32px

---

### Section 2.3: Clerk Sign-In Component

**Integration:** Clerk's `<SignIn/>` component

**Custom Styling (CSS overrides):**

**Inputs:**
- Border: 2px solid slate-200 / slate-700
- Focus: 2px solid blue-400
- Background: white / slate-800
- Text: slate-900 / slate-100
- Padding: 12px 16px
- Border-radius: md (8px)
- Font: 14px
- Transition: 200ms border-color ease

**Buttons:**
- Background: Linear gradient blue-600 to purple-600
- Color: white
- Padding: 12px 24px
- Border-radius: md (8px)
- Font: 14px semibold
- Hover: Brightness +10%
- Transition: 200ms all ease

**Links:**
- Color: blue-600 / blue-400
- Hover: underline
- Font: 14px

**Error Messages:**
- Color: red-600
- Font: 12px
- Margin-top: 4px

**Card Container:**
- Background: white / slate-900
- Border: 2px blue-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Box-shadow: md
- Max-width: 420px

---

### Section 2.4: Form Footer

**Layout:** Centered text
- Margin-top: 24px

**Content:** "New here?" + "Sign up" link
- Font: 14px, slate-600 / slate-400
- Link color: blue-600 / blue-400
- Link hover: underline

---

## PAGE 3: SIGN UP PAGE

**Route:** `/sign-up` (public, Clerk protected)
**Layout:** Identical to Sign In page

### Section 3.1: Differences from Sign In

**Heading:**
- Content: "Create Your Account"

**Subheading:**
- Content: "Start your AI-powered learning journey"

**Clerk Component:** `<SignUp/>`
- Same styling as Sign In
- Additional fields managed by Clerk configuration

**Form Footer:**
- Content: "Already have an account?" + "Sign in" link

---

## PAGE 4: ONBOARDING FLOW

**Route:** `/onboarding` (protected, authenticated users only)
**Total Steps:** 3 (multi-step form)
**Layout:** Full-width centered content

### Section 4.1: Overall Container

**Background:** Linear gradient white to blue-50 (light) / slate-900 to slate-950 (dark)
**Min-height:** 100vh
**Padding:** xl (32px)
**Display:** Flex, flex-direction column, justify-content center, align-items center
**Max-width:** 1000px
**Margin:** 0 auto

---

### Section 4.2: Progress Indicator

**Position:** Top, full-width
**Margin-bottom:** 48px

**Step Counter:**
- Font: 14px semibold, slate-600 / slate-300
- Content: "Step [current] of 3"

**Progress Bar:**
- Height: 4px
- Background: slate-200 / slate-700
- Filled portion: Gradient blue-600 to purple-600
- Fill percentage: 33% (step 1), 66% (step 2), 100% (step 3)
- Width: 100%
- Max-width: 400px
- Border-radius: full
- Margin-top: 12px
- Transition: width 300ms ease-out

---

### Section 4.3: Step 1 - Subject Selection

**Content Container:**
- Text-align: center
- Margin-bottom: 48px

**Heading (H1):**
- Content: "What subjects are you studying?"
- Font: Poppins, 48px bold
- Background: Linear gradient blue-600 to purple-600
- Background-clip: text
- Color: transparent
- Margin-bottom: 8px

**Subheading:**
- Content: "Select all that apply"
- Font: Inter, 18px regular
- Color: slate-600 / slate-300
- Margin-bottom: 32px

**Hero Image:**
- Image: `onboarding-subjects.png` (500x300)
- Centered
- Border-radius: lg (12px)
- Margin-bottom: 48px
- Max-width: 100%

**Subject Grid:**
- Layout: 3-column (desktop) / 2-column (tablet) / 1-column (mobile)
- Gap: 16px
- Max-width: 800px
- Margin: 0 auto 48px

**Subject Cards (11 total):**

**Card Base:**
- Background: white / slate-800
- Border: 2px solid slate-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Cursor: pointer
- Transition: 200ms all ease
- Display: flex, flex-direction column, align-items center, gap 12px
- Hover:
  - Transform: scale 1.05
  - Border-color: subject-color or blue-400
  - Box-shadow: lg, subject-color/20%

**Selected State:**
- Background: Linear gradient subject-color-50 to subject-color-100 (or blue-50 / blue-900 dark)
- Border-color: subject-color or blue-600
- Box-shadow: 0 0 0 3px subject-color/10%

**Card Icon:**
- Size: 48x48
- Color: Subject-specific color
- Animation: Subtle bounce on hover (3px up, 200ms)

**Card Title:**
- Font: 18px semibold
- Color: slate-900 / white
- Text-align: center

**Card Checkmark (visible when selected):**
- Size: 20x20
- Color: green-600 / green-400
- Position: top-right corner
- Animation: Scale in 200ms cubic-bezier(0.34, 1.56, 0.64, 1)

**11 Subjects:**
1. Mathematics (Blue - #3B82F6)
2. English Language (Purple - #A855F7)
3. English Literature (Purple - #A855F7)
4. Physics (Blue - #3B82F6)
5. Chemistry (Green - #10B981)
6. Biology (Green - #10B981)
7. Computer Science (Orange - #F97316)
8. Business (Indigo - #6366F1)
9. Economics (Indigo - #6366F1)
10. Geography (Green - #10B981)
11. History (Purple - #A855F7)

**Subjects Grid Animations:**
- Cards fade-in + slide-up staggered (50ms delays)
- Entrance: 0ms → 50ms → 100ms → etc.

---

### Section 4.4: Step 1 - Action Buttons

**Position:** Bottom
**Layout:** Flex, justify-content space-between
**Gap:** 16px
**Margin-top:** 48px

**Back Button (Left):**
- Label: "Back"
- Style: Text link (no background)
- Color: blue-600 / blue-400
- Hover: underline
- Font: 16px semibold
- Cursor: pointer

**Continue Button (Right):**
- Label: "Continue"
- Style: Solid gradient
- Background: Linear gradient blue-600 to purple-600
- Color: white
- Padding: 12px 32px
- Height: 48px
- Border-radius: md (8px)
- Font: 16px semibold
- Disabled state:
  - Opacity: 50%
  - Cursor: not-allowed
  - Hover: no effect
- Enabled state:
  - Hover: Brightness +10%, translate-y -2px
  - Active: scale 0.98
- Transition: 200ms all ease

**Validation:**
- Button disabled until 1+ subjects selected
- Error message appears if user tries to continue without selection (optional enhancement)

---

### Section 4.5: Step 2 & 3 (Placeholder Structure)

**Step 2: Learning Goals**
- Similar structure to Step 1
- Multi-select cards (Top Subjects to Focus On)
- Options: Improve grades, Learn new subjects, Prepare for exams, General revision

**Step 3: Preferences**
- Similar structure
- Radio or toggle options
- Options: Daily study time, Preferred study style, Notification preferences

---

## PAGE 5: DASHBOARD

**Route:** `/dashboard` (protected, authenticated users)
**Layout:** Sidebar + Main content
**Min-height:** 100vh

### Section 5.1: Overall Layout

**Desktop Layout:**
- Sidebar: 280px fixed (left)
- Main content: Flex-grow (right)
- Gap: 0
- Background: white / slate-900

**Mobile Layout:**
- Sidebar: Hidden (toggle with hamburger menu)
- Main content: Full-width

**Max Content Width:** 1440px

---

### Section 5.2: Welcome Banner

**Position:** Top of main content
**Height:** 300px (desktop) / 200px (tablet) / 150px (mobile)
**Background image:** `dashboard-welcome-banner.png` (1200x300, tiled)
**Background-size:** cover
**Background-position:** center
**Overlay:** Linear gradient 135deg, blue-600/40% to purple-600/40%
**Position (property):** relative
**Display:** Flex, justify-content center, align-items center
**Padding:** xl (32px)

**Content Container:**
- Text-align: center
- Z-index: 1 (above overlay)

**Greeting Text (H1):**
- Content: "Welcome back, [FirstName]! 👋"
- Font: Poppins, 56px bold (desktop) / 36px (tablet) / 24px (mobile)
- Color: white with text-shadow 2px 2px 4px rgba(0,0,0,0.3)
- Margin: 0 0 16px 0

**Subtitle:**
- Content: "You're on a 7-day streak. Keep it up!"
- Font: Inter, 18px regular
- Color: white with opacity 90%
- Margin-bottom: 24px

**Quick Stat Badges:**
- Layout: Flex, gap 32px, justify-content center, flex-wrap wrap
- Responsive: Stack on mobile (gap 16px)

**Badge Structure (3 badges):**
- Display: Flex, align-items center, gap 8px
- Background: white/10 with backdrop-filter blur(10px)
- Padding: 12px 24px
- Border-radius: full (rounded)
- Border: 1px white/20%

**Badge Icon:**
- Size: 24x24
- Color: white or subject-color

**Badge Text:**
- Font: 16px semibold
- Color: white

**Badges (3 total):**
1. Level 8 (with star icon)
2. 4,250 XP (with lightning icon)
3. 7-day streak 🔥 (with flame emoji/icon)

---

### Section 5.3: Quick Actions Grid

**Position:** Below welcome banner
**Padding:** xl (32px) 0
**Margin:** xl (32px) 0

**Grid:**
- Layout: 6-column (desktop) / 3-column (tablet) / 2-column (mobile)
- Gap: 16px
- Auto-flow: row

**Quick Action Card:**
- Background: white / slate-900 with glassmorphism effect (backdrop-filter blur(10px))
- Border: 1px blue-200 / slate-700
- Padding: md (16px)
- Border-radius: md (8px)
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Transform: scale 1.05
  - Box-shadow: lg
  - Translate-y: -2px

**Card Layout:**
- Display: Flex, flex-direction column, gap 12px
- Text-align: center

**Icon:**
- Size: 32x32
- Position: top-center
- Color: Subject-specific or action-specific
- Animation: Subtle bounce on hover (2px up, 200ms)

**Title:**
- Font: 14px semibold
- Color: slate-900 / white
- Margin: 8px 0 4px

**Description (optional):**
- Font: 12px
- Color: slate-600 / slate-400
- Display: none on mobile

**6 Quick Actions:**
1. Success Coach
   - Icon: Target/coachmark icon (Indigo)
   - Title: "Success Coach"
   - Description: "Get personalized guidance"

2. Revision
   - Icon: Flashcard icon (Blue)
   - Title: "Start Revision"
   - Description: "Review your decks"

3. Exam Coach
   - Icon: Exam/clipboard icon (Green)
   - Title: "Exam Coach"
   - Description: "Prepare for tests"

4. Flashcards
   - Icon: Card icon (Purple)
   - Title: "My Flashcards"
   - Description: "Study decks"

5. Papers
   - Icon: Document icon (Amber)
   - Title: "Practice Papers"
   - Description: "Mock exams"

6. Achievements
   - Icon: Trophy icon (Gold)
   - Title: "Achievements"
   - Description: "View badges"

**Card Animations:**
- Stagger fade-in + slide-up (50ms delays)
- Entrance: 0ms, 50ms, 100ms, 150ms, 200ms, 250ms

---

### Section 5.4: Progress Cards (2 Cards, 2-Column Layout)

**Position:** Below quick actions
**Padding:** xl (32px) 0
**Margin:** xl (32px) 0

**Grid:**
- Layout: 2-column (desktop) / 1-column (mobile)
- Gap: 24px

**Card 1: Streak & XP**

**Container:**
- Background: Gradient blue-50 to purple-50 / blue-900 to purple-900
- Padding: lg (24px)
- Border-radius: lg (12px)
- Border: 2px blue-200 / slate-700
- Box-shadow: md

**Layout:**
- Display: Grid, 2-column
- Column 1: Icon (left)
- Column 2: Content (right)
- Gap: 24px

**Icon:**
- Flame emoji or icon (64x64)
- Color: Amber (animated)
- Animation: Bounce infinite (2s)
  - Transform: translateY(-4px) to translateY(0px)
  - 50% keyframe at top

**Content:**
- Display: Flex, flex-direction column, gap 12px

**Streak Heading:**
- Font: 18px semibold
- Color: blue-600 / blue-400
- Content: "7-day streak"

**XP Progress Bar:**
- Height: 6px
- Background: blue-200 / slate-700
- Filled: Gradient blue-600 to purple-600
- Width: 85% (4250/5000)
- Border-radius: full
- Margin: 12px 0

**XP Label:**
- Font: 14px
- Color: slate-600 / slate-400
- Content: "4,250 / 5,000 XP to Level 9"

---

**Card 2: Study Time**

**Container:**
- Background: Gradient emerald-50 to teal-50 / emerald-900 to teal-900
- Styling identical to Card 1
- Border-color: emerald-200 / slate-700

**Layout:** Grid 2-column (icon left, content right)

**Icon:**
- Clock icon (64x64)
- Color: Emerald

**Content:**

**Study Hours (Large):**
- Font: 24px bold
- Color: emerald-600 / emerald-400
- Content: "12.5 hours"

**Label:**
- Font: 14px
- Color: slate-600 / slate-400
- Content: "Study this week"

**Progress Indicator:**
- Font: 12px
- Color: green-600 / green-400
- Content: "+2 hours vs last week"
- Icon: Trending up arrow

---

### Section 5.5: Subjects Grid

**Position:** Below progress cards
**Padding:** xl (32px) 0
**Margin:** xl (32px) 0

**Grid:**
- Layout: 3-column (desktop) / 2-column (tablet) / 1-column (mobile)
- Gap: 24px

**Subject Card:**
- Background: Subject-specific gradient (Math=blue-50, Science=green-50, etc. light) / slate-800 (dark)
- Border: 2px subject-color-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Box-shadow: sm → md on hover
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Transform: translateY -4px
  - Border-color: brighten (subject-color-300)
  - Box-shadow: lg
  - Background: subject-color-100 / darker

**Card Layout:**
- Display: Flex, flex-direction column, gap 12px

**Header (Icon + Name):**
- Display: Flex, align-items center, gap 12px
- Margin-bottom: 12px

**Icon:**
- Size: 48x48
- Color: Subject-specific
- Border-radius: md

**Subject Name (H4):**
- Font: 24px semibold
- Color: slate-900 / white

**Target Grade Badge:**
- Background: Subject-color-100 / subject-color-900
- Color: subject-color-600 / subject-color-300
- Padding: 4px 12px
- Border-radius: full
- Font: 12px semibold
- Alignment: Right-aligned
- Content: "Target: Grade 8" or "Target: Grade 9"

**Progress Section:**
- Margin: 16px 0

**Progress Label:**
- Font: 12px
- Color: slate-600 / slate-400
- Content: "Grade 6 / Target 8"
- Margin-bottom: 8px

**Progress Bar:**
- Height: 8px
- Background: linear gradient red-500 to yellow-500 to green-500
- Width: 75% (represents Grade 6/8)
- Border-radius: full
- Box-shadow: sm

**CTA Link:**
- Font: 14px semibold
- Color: subject-color or blue-600
- Hover: underline
- Content: "Continue Learning →"
- Margin-top: 12px
- Cursor: pointer

**Subject Cards (3-4 repeated):**
- Mathematics (Blue)
- English Language (Purple)
- Biology/Sciences (Green)
- Additional subjects based on user selection

---

### Section 5.6: Recent Activity Section

**Position:** Below subjects grid
**Padding:** xl (32px) 0
**Margin:** xl (32px) 0

**Section Heading (H3):**
- Content: "Recent Activity"
- Font: Poppins, 24px bold
- Margin-bottom: 16px
- Color: slate-900 / white

**Empty State (No Activity):**
- Image: `empty-state-no-activity.png` (400x300)
- Centered
- Text below: "No activity yet. Get started with AI tutoring or flashcards!"
- Font: 16px, slate-600 / slate-400
- Margin: 32px 0

**Activity List (If has activity):**
- Display: Flex, flex-direction column
- Gap: 12px

**Activity Item:**
- Background: white / slate-900
- Border: 1px slate-200 / slate-700
- Padding: md (16px)
- Border-radius: md (8px)
- Display: Flex, align-items center, gap 16px
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Background: slate-50 / slate-800
  - Box-shadow: sm

**Activity Icon:**
- Size: 32x32
- Color: Subject-specific or action-specific
- Background: subject-color-50 / subject-color-900
- Border-radius: md

**Activity Content:**
- Display: Flex, flex-direction column, gap 4px
- Flex-grow: 1

**Activity Title:**
- Font: 14px semibold
- Color: slate-900 / white
- Content: "Completed Biology mock exam - Grade 7"

**Activity Subtitle:**
- Font: 12px
- Color: slate-600 / slate-400
- Content: "Achievement unlocked: Quiz Master!"

**Timestamp:**
- Font: 12px
- Color: slate-500 / slate-500
- Text-align: right
- Content: "2 hours ago"

**Activity Examples:**
1. Completed Biology mock exam - Grade 7 (2 hours ago)
2. Created 'Photosynthesis' flashcard deck (5 hours ago)
3. 7-day streak milestone! (1 day ago)
4. Earned 250 XP from revision session (2 days ago)

---

### Section 5.7: Sidebar (Desktop Only, Fixed)

**Position:** Fixed left, 100vh height
**Width:** 280px
**Background:** white / slate-900
**Border-right:** 2px divider slate-200 / slate-700
**Padding:** lg (24px)
**Overflow-y:** auto

**Logo & Profile Section (Top):**
- Logo: 40x40
- User name: "John Smith"
  - Font: 16px semibold
- User email: "john@example.com"
  - Font: 12px, slate-600 / slate-400
- Padding-bottom: lg (24px)
- Border-bottom: 2px divider

**Navigation Menu:**
- Margin-top: lg (24px)
- Display: Flex, flex-direction column
- Gap: 8px

**Nav Link:**
- Padding: 12px 16px
- Border-radius: md (8px)
- Font: 14px
- Color: slate-700 / slate-300
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Background: slate-100 / slate-800
  - Color: slate-900 / white
- Active:
  - Background: blue-50 / blue-900
  - Color: blue-600 / blue-400
  - Border-left: 3px blue-600

**Nav Items:**
1. Dashboard
2. AI Tutors
3. Flashcards
4. Practice Papers
5. Marketplace (Coming Soon)

**Bottom Section:**
- Border-top: 2px divider
- Margin-top: auto
- Padding-top: lg (24px)

**Settings Link:**
- Padding: 12px 16px
- Content: "⚙️ Settings"
- Style: Link style
- Hover: Background change

**Sign Out Button:**
- Width: 100%
- Padding: 12px 16px
- Background: slate-100 / slate-800
- Color: slate-900 / white
- Border: none
- Border-radius: md (8px)
- Font: 14px semibold
- Cursor: pointer
- Hover: Background darken
- Transition: 200ms all ease

---

## PAGES 6-9: AI TUTOR PAGES

**Routes:** 
- `/agents/success` - Success Coach
- `/agents/revision` - Revision Coach
- `/agents/exam-prep` - Exam Prep Coach
- `/agents/tutor/[subject]` - Subject-specific tutors (Math, English, Sciences, etc.)

**Layout:** Sidebar + Chat interface (desktop) / Full-width chat (mobile)

### Section 6.1: Overall Layout

**Desktop Layout:**
- Sidebar: 300px fixed left
- Chat: Flex-grow right
- Gap: 0
- Background: white / slate-900

**Mobile Layout:**
- Sidebar: Hidden (toggle with button)
- Chat: Full-width with overlay sidebar option

---

### Section 6.2: Sidebar Content

**Position:** Fixed left, 300px
**Height:** 100vh
**Background:** Gradient or solid slate-900
**Padding:** lg (24px) all
**Overflow-y:** auto
**Border-right:** 2px divider slate-700

**Agent Header Section:**
- Margin-bottom: lg (24px)
- Padding-bottom: lg (24px)
- Border-bottom: 2px divider slate-700

**Agent Icon:**
- Size: 48x48
- Color: Agent-specific
- Margin-bottom: 12px

**Agent Name:**
- Font: 18px semibold
- Color: white
- Content: "Success Coach" (varies per page)

**Status Badge:**
- Display: Inline-flex, gap 8px, align-items center
- Background: green-50 / green-900
- Color: green-600 / green-400
- Padding: 4px 8px
- Border-radius: full
- Font: 12px semibold
- Content: "● Connected"

**Agent Description:**
- Font: 14px
- Color: slate-300
- Line-height: 1.5
- Margin: 16px 0
- Content: "Your personal AI coach helping you master [subject] and achieve your GCSE goals"

**Quick Prompts Section:**
- Margin-bottom: lg (24px)

**Section Label (H4):**
- Font: 12px bold uppercase
- Color: slate-400
- Tracking: 0.1em
- Margin-bottom: 12px
- Content: "Try asking..."

**Prompt Cards (4-5 total):**
- Background: blue-50 / slate-800
- Border: 1px blue-200 / slate-700
- Padding: sm (8px)
- Border-radius: md (8px)
- Font: 12px
- Color: slate-900 / slate-300
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Background: blue-100 / darker
  - Border-color: brighten
  - Transform: translateX 2px
- Margin-bottom: 8px

**Prompt Examples (Success Coach):**
1. "How do I improve my grades?"
2. "Create a study schedule for me"
3. "What's my learning style?"
4. "Help me with exam anxiety"

**Prompt Examples (Math Tutor):**
1. "Explain quadratic equations"
2. "Help me with this problem"
3. "What's the difference between sine and cosine?"
4. "Practice questions on algebra"

**Resources Section (Bottom):**
- Margin-top: auto
- Border-top: 2px divider slate-700
- Padding-top: lg (24px)

**Resources Label:**
- Font: 12px bold uppercase
- Color: slate-400
- Margin-bottom: 12px

**Resource Links:**
- Font: 12px
- Color: slate-300
- Hover: white, underline
- Margin-bottom: 8px
- Examples:
  - "Subject Specification"
  - "Exam Board Resources"
  - "Success Stories"

---

### Section 6.3: Chat Container

**Position:** Flex-grow
**Display:** Flex, flex-direction column
**Height:** 100vh
**Background:** white / slate-900

**Chat Header:**
- Background: white / slate-900
- Border-bottom: 2px divider slate-200 / slate-700
- Padding: lg (24px)
- Position: sticky top 0
- Z-index: 10

**Header Content:**
- Display: Flex, justify-content space-between, align-items center

**Agent Intro Card:**
- Background: blue-50 / slate-800
- Border: 1px blue-200 / slate-700
- Padding: md (16px)
- Border-radius: md (8px)
- Flex-grow: 1

**Intro Icon:**
- Size: 24x24
- Margin-right: 12px

**Intro Text:**
- Font: 14px
- Color: slate-900 / slate-300
- Content: "Hi, I'm your [Agent Name]. How can I help you today?"

**Close/Back Button (Mobile):**
- Display: none (desktop)
- Size: 32x32
- Cursor: pointer

---

### Section 6.4: Chat History (Scrollable)

**Position:** Flex-grow 1
**Overflow-y:** auto
**Padding:** lg (24px)
**Display:** Flex, flex-direction column, gap 8px
**Scroll behavior:** smooth

**Message - User**
- Alignment: Right-aligned
- Max-width: 70%

**Container:**
- Background: blue-600
- Color: white
- Padding: md (16px)
- Border-radius: lg with square bottom-right (border-radius: 12px 12px 0 12px)
- Box-shadow: sm
- Word-wrap: break-word
- Animation: Fade-in + slide-up 300ms on appearance

**Message - Agent**
- Alignment: Left-aligned
- Max-width: 85%

**Container:**
- Background: white / slate-900
- Color: slate-900 / slate-100
- Border: 1px slate-200 / slate-700
- Padding: md (16px)
- Border-radius: lg (12px)
- Box-shadow: sm
- Word-wrap: break-word
- Animation: Fade-in + slide-up 300ms on appearance

**Message Gap:**
- Margin-bottom: 8px between messages

**Typing Indicator (While Agent Responding):**
- Position: Left-aligned
- Style: 3 bouncing dots
- Colors: Animate blue-600
- Animation: Bounce infinite 1s
  - Dot 1: Delay 0ms
  - Dot 2: Delay 150ms
  - Dot 3: Delay 300ms

---

### Section 6.5: Input Area

**Position:** Sticky bottom
**Background:** white / slate-900
**Border-top:** 2px divider slate-200 / slate-700
**Padding:** md (16px) all
**Z-index:** 10

**Input Container:**
- Display: Flex
- Gap: 12px
- Align-items: flex-end

**Textarea:**
- Flex-grow: 1
- Min-height: 80px (3 lines)
- Max-height: 300px (auto-expand)
- Expand as user types (JS to adjust height)
- Border: 2px blue-200 / slate-700
- Focus: 2px blue-400 border, box-shadow 0 0 0 3px rgba(59, 130, 246, 0.1)
- Background: white / slate-800
- Text: slate-900 / slate-100
- Padding: md (16px)
- Border-radius: md (8px)
- Font: 14px
- Resize: vertical only
- Placeholder: "Ask me anything..."
- Placeholder-color: slate-400
- Transition: 200ms border-color ease

**Placeholder Text:**
- Font: 14px
- Color: slate-400 / slate-500

**Submit Button:**
- Display: Flex, justify-content center, align-items center
- Size: 48x48
- Background: Linear gradient blue-600 to purple-600
- Color: white
- Border: none
- Border-radius: md (8px)
- Cursor: pointer
- Icon: Send/arrow icon (20px)
- Hover:
  - Brightness +10%
  - Transform: scale 1.05
  - Box-shadow: md
- Active:
  - Transform: scale 0.95
- Transition: 200ms all ease
- Animation (optional): Pulse infinite 2s when hovering
  - Box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3) → 0 0 0 10px rgba(59, 130, 246, 0)

**Disabled State (No message text):**
- Opacity: 50%
- Cursor: not-allowed
- Hover: no effects

---

### Section 6.6: Subject-Specific Styling

**Success Coach Page:**
- Sidebar color: Indigo tones
- Accent color: Indigo-600
- Icon: Target/success icon
- Agent greeting: "I'm your Success Coach..."

**Revision Coach Page:**
- Sidebar color: Blue tones
- Accent color: Blue-600
- Icon: Flashcard/review icon
- Agent greeting: "I'm your Revision Coach..."

**Exam Prep Coach Page:**
- Sidebar color: Green tones
- Accent color: Green-600
- Icon: Exam/clipboard icon
- Agent greeting: "I'm your Exam Coach..."

**Subject Tutor Pages:**
- Sidebar colors vary by subject:
  - Mathematics: Blue
  - English: Purple
  - Sciences: Green
  - Humanities: Purple
  - Business: Indigo
- Icon: Subject-specific icon
- Agent greeting: "I'm your [Subject] tutor..."

---

### Section 6.7: Message Animations

**User Message:**
- Fade-in: 300ms
- Slide-up: 300ms from +20px
- Timing: ease-out

**Agent Message:**
- Fade-in: 300ms
- Slide-up: 300ms from +20px
- Timing: ease-out
- Delay: 100ms after user message

**Typing Indicator:**
- Dots bounce animation
- Timing: 1s infinite
- Staggered delays

---

### Section 6.8: Mobile Responsive

**Sidebar:**
- Hidden by default
- Toggle: Hamburger menu button (32x32)
- Position: Fixed overlay when open
- Width: 100% (full-width overlay)
- Z-index: 50 (above chat)
- Background: Darker overlay on chat when sidebar open

**Chat Area:**
- Full-width
- Padding: sm (8px) on mobile for compact space

**Input Area:**
- Padding: sm (8px)
- Textarea: Min-height 60px
- Button: Size 40x40

---

## PAGES 10-17: LEARNING HUB & SUBPAGES

### PAGE 10: Learning Hub Main

**Route:** `/learning-hub` (protected)
**Layout:** Container-based, no sidebar
**Max-width:** 1200px

### Section 10.1: Hero Section

**Background:** Linear gradient blue-50 to purple-50 (light) / slate-800 to slate-900 (dark)
**Padding:** xl (32px)
**Border-radius:** lg (12px)
**Margin-bottom:** xl (32px)

**Layout:** 2-column grid (desktop) / stacked (mobile)
**Gap:** xl (32px)

**Left Column (Content):**

**Heading (H1):**
- Content: "Learning Hub"
- Font: Poppins, 48px bold
- Margin-bottom: 8px

**Subheading:**
- Content: "All your learning tools in one place"
- Font: Inter, 18px regular
- Color: slate-600 / slate-400
- Margin-bottom: 24px

**Description:**
- Font: 16px
- Color: slate-700 / slate-300
- Line-height: 1.6
- Margin-bottom: 24px

**CTA Button:**
- Label: "Create New Resource"
- Style: Primary gradient
- Padding: 12px 32px
- Height: 48px

**Right Column (Image):**
- Image: `learning-hub-hero.png` (500x400)
- Border-radius: lg (12px)
- Box-shadow: md
- Display: none on mobile

---

### Section 10.2: Features Grid (3 Cards)

**Layout:** 3-column (desktop) / 2-column (tablet) / 1-column (mobile)
**Gap:** 24px
**Margin-bottom:** xl (32px)

**Feature Card (Repeated 3x):**
- Background: white / slate-900
- Border: 2px slate-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Box-shadow: sm → lg on hover
- Transition: 200ms all ease
- Hover:
  - Transform: translateY -4px
  - Border-color: brighten
  - Box-shadow: lg

**Card Icon:**
- Size: 48x48
- Color: Feature-specific
- Margin-bottom: 12px

**Card Title (H3):**
- Font: 20px semibold
- Margin-bottom: 8px

**Card Description:**
- Font: 14px
- Color: slate-600 / slate-400
- Line-height: 1.5
- Margin-bottom: 12px

**Card Stats:**
- Font: 12px
- Color: slate-500
- Content: "128 cards created" (varies per feature)
- Margin-bottom: 12px

**Card CTA:**
- Font: 14px semibold
- Color: blue-600 / blue-400
- Hover: underline
- Content: "Browse Decks →" (varies)
- Cursor: pointer

**Card 1: Flashcards**
- Icon: Card icon (Blue)
- Image: `flashcards-hero.png` (optional, display above title)
- Title: "Flashcards"
- Description: "Master any topic with spaced repetition and AI-generated questions"
- Stats: "128 cards created"
- CTA: "Browse Decks →"

**Card 2: Practice Papers**
- Icon: Document icon (Green)
- Image: `practice-papers.png`
- Title: "Practice Papers"
- Description: "Exam-style questions from all subjects with real marking schemes"
- Stats: "6 papers available"
- CTA: "Practice Now →"

**Card 3: Notes (Coming Soon)**
- Icon: Note icon (Purple)
- Opacity: 50% (disabled appearance)
- Title: "Notes" (grayed out)
- Description: "Organized note-taking with AI assistance"
- Label: "Coming Soon - Phase 3"
- CTA: Disabled (grayed out)
- Hover: No effect

---

### Section 10.3: Statistics Section

**Layout:** 4-column (desktop) / 2-column (mobile)
**Gap:** 24px
**Margin-bottom:** xl (32px)

**Stat Card:**
- Background: Gradient subject-color-50 to subject-color-100 (light) / subject-color-900 (dark)
- Border: 2px subject-color-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Text-align: center

**Stat Number:**
- Font: 32px bold
- Color: subject-color-600 / subject-color-400
- Margin-bottom: 8px

**Stat Label:**
- Font: 14px
- Color: slate-700 / slate-300

**Stats (4 total):**
1. "128" / "Cards Created" (Blue)
2. "12" / "Active Decks" (Purple)
3. "5 days" / "Current Streak" (Green)
4. "64%" / "Average Mastery" (Amber)

---

### Section 10.4: CTA Section (Bottom)

**Background:** Linear gradient blue-600 to purple-600
**Padding:** xl (32px)
**Border-radius:** lg (12px)
**Text-align:** center

**Heading (H2):**
- Content: "Ready to transform your learning?"
- Font: Poppins, 36px bold
- Color: white
- Margin-bottom: 16px

**Button:**
- Label: "Start Now"
- Style: Primary with white text
- Padding: 12px 32px
- Height: 48px

---

### PAGE 11: Flashcards List

**Route:** `/learning-hub/flashcards` (protected)
**Layout:** Container-based

### Section 11.1: Header

**Heading (H1):** "My Flashcards"
**Subheading:** "Manage and review your study decks"

**Action Buttons:**
- "Create New Deck" (primary)
- "Sort/Filter" (secondary)

---

### Section 11.2: Flashcard Decks Grid

**Layout:** 3-column (desktop) / 2-column (tablet) / 1-column (mobile)
**Gap:** 24px

**Deck Card:**
- Background: white / slate-900
- Border: 2px slate-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Cursor: pointer
- Transition: 200ms all ease
- Hover:
  - Transform: scale 1.02
  - Box-shadow: lg
  - Border-color: brighten

**Deck Header:**
- Display: Flex, justify-content space-between, align-items start

**Deck Title (H3):**
- Font: 20px semibold

**Menu Button:**
- Icon: Three-dot menu (24x24)
- Cursor: pointer
- Options: Edit, Duplicate, Delete, Archive

**Deck Info:**
- Font: 12px, slate-600 / slate-400
- Content: "12 cards" + "Created 3 days ago"
- Margin-top: 12px

**Progress Bar:**
- Height: 6px
- Background: slate-200 / slate-700
- Filled: Gradient blue-600 to purple-600
- Width: 75% (mastery %)
- Border-radius: full
- Margin: 12px 0

**CTA:**
- Button: "Study Now" (secondary)
- Width: 100%
- Height: 36px

---

### PAGE 12: Create/Edit Flashcard

**Route:** `/learning-hub/flashcards/new` (create) or `[deckId]` (edit)
**Layout:** Form-based

### Section 12.1: Form Structure

**Heading (H1):** "Create New Deck" or "Edit Deck"

**Form Fields:**

1. **Deck Name:**
   - Label: "Deck Name*"
   - Input: Text field
   - Placeholder: "e.g., Photosynthesis Biology"
   - Validation: Required, max 100 chars

2. **Subject:**
   - Label: "Subject*"
   - Input: Dropdown select
   - Options: All available subjects
   - Validation: Required

3. **Description:**
   - Label: "Description"
   - Input: Textarea
   - Placeholder: "What will students learn?"
   - Max: 500 chars

**Action Buttons:**
- "Save Deck" (primary)
- "Cancel" (text link)

---

### PAGE 13: Flashcard Study Session

**Route:** `/learning-hub/flashcards/[deckId]/study` (protected)
**Layout:** Full-screen card-based

### Section 13.1: Study Header

**Progress Indicator:**
- Text: "Card 5 of 20"
- Progress bar: 25% filled

**Back Button:**
- Label: "Back to Deck"
- Style: Text link

---

### Section 13.2: Flashcard Display

**Card Container:**
- Background: white / slate-900
- Border: 2px subject-color-200 / slate-700
- Padding: xl (32px)
- Border-radius: lg (12px)
- Min-height: 400px
- Display: Flex, justify-content center, align-items center
- Box-shadow: lg
- Perspective: 1000px (for 3D flip effect)

**Card Front (Question):**
- Text-align: center
- Font: 24px semibold
- Line-height: 1.6
- Max-width: 500px

**Card Back (Answer):**
- Text-align: center
- Font: 20px regular
- Line-height: 1.6
- Max-width: 500px
- Display: none (initially)

**Flip Animation:**
- Transition: transform 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
- Transform: rotateY(0deg) → rotateY(180deg)
- When flipped: Back shows, front hidden

---

### Section 13.3: Study Actions

**Layout:** Flex, gap 16px, justify-content center
**Margin-top:** xl (32px)

**Buttons:**
1. **Flip Card:**
   - Label: "Show Answer" (when front) or "Hide Answer" (when back)
   - Style: Secondary
   - Size: 48px height

2. **Incorrect:**
   - Label: "❌ Incorrect"
   - Style: Red/danger
   - Size: 48px height

3. **Correct:**
   - Label: "✓ Correct"
   - Style: Green/success
   - Size: 48px height

**Keyboard Support:**
- Space: Flip card
- Left arrow: Incorrect
- Right arrow: Correct

---

### PAGE 14: Practice Papers

**Route:** `/learning-hub/practice-papers` (protected)
**Layout:** Grid-based similar to flashcards

### Section 14.1: Papers Grid

**Layout:** 2-column (desktop) / 1-column (mobile)
**Gap:** 24px

**Paper Card:**
- Background: white / slate-900
- Border: 2px slate-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Hover: Scale 1.02, shadow-lg

**Card Content:**
1. **Subject Badge:**
   - Background: Subject-color-50 / subject-color-900
   - Color: Subject-color-600
   - Padding: 4px 12px
   - Border-radius: full
   - Font: 12px semibold

2. **Paper Title (H3):**
   - Font: 20px semibold
   - Margin: 12px 0

3. **Board & Year:**
   - Font: 12px, slate-600 / slate-400
   - Content: "Edexcel • June 2023"

4. **Questions Count:**
   - Font: 12px, slate-600 / slate-400
   - Content: "15 questions • 90 minutes"

5. **CTA Buttons:**
   - "Start Practice" (primary)
   - "View Answers" (secondary)

---

### PAGE 15: Paper Practice

**Route:** `/learning-hub/practice-papers/[paperId]` (protected)
**Layout:** Question-by-question

### Section 15.1: Paper Header

**Title (H1):** "Edexcel Mathematics - June 2023"
**Meta:** "Paper 1 • 15 questions • 90 minutes"

**Timer (if timed session):**
- Display: "Time remaining: 1:23:45"
- Color: Green (normal) / Amber (10 min) / Red (5 min)
- Font: 16px monospace

---

### Section 15.2: Question Display

**Layout:** Single question per page or all questions

**Question Container:**
- Background: white / slate-900
- Border: 2px slate-200 / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Margin-bottom: xl (32px)

**Question Text (H3):**
- Font: 16px semibold

**Question Image (if any):**
- Max-width: 100%
- Border-radius: md

**Answer Options (Multiple Choice):**
- Layout: Flex, flex-direction column, gap 12px
- Radio buttons with custom styling

**Option Card:**
- Background: white / slate-800
- Border: 2px slate-200 / slate-700
- Padding: md (16px)
- Border-radius: md (8px)
- Cursor: pointer
- Hover: Border-color brighten
- Selected: Background blue-50 / blue-900, border-color blue-400
- Transition: 200ms all ease

**Option Label:**
- Font: 14px
- Margin-left: 8px

---

### PAGE 16: Paper Results

**Route:** `/learning-hub/practice-papers/[paperId]/results`
**Layout:** Results summary

### Section 16.1: Score Summary

**Card Container:**
- Background: Gradient subject-color-50 to subject-color-100 / subject-color-900
- Padding: xl (32px)
- Border-radius: lg (12px)
- Text-align: center

**Score Display:**
- Number: 78
  - Font: 64px bold
  - Color: subject-color-600
- Percentage: "78%"
  - Font: 32px
- Grade: "Grade B"
  - Font: 16px
  - Color: Green (good), Amber (average), Red (poor)
- Verdict: "Good effort! You're getting close to your target."
  - Font: 14px

---

### Section 16.2: Detailed Results

**Layout:** Table or card-based

**Columns:**
- Question number
- Your answer
- Correct answer
- Result (✓/✗)
- Time taken

---

### PAGE 17: Marketplace/Tutor Booking (Coming Soon)

**Route:** `/marketplace` (protected, future phase)

---

## PAGE 18: LEADERBOARD

**Route:** `/leaderboard` (protected)
**Layout:** Container-based

### Section 18.1: Leaderboard Header

**Heading (H1):** "Leaderboard"
**Tabs:** "This Week" | "This Month" | "All Time"

**View Toggle:**
- Icon buttons: Grid view / List view

---

### Section 18.2: Leaderboard Table/Grid

**Layout:** List view (primary) or grid (secondary)

**Columns (List View):**
1. Rank (# 1-50)
2. User Avatar (32x32)
3. Username
4. XP Points (formatted)
5. Level
6. Streak (days)

**Table Styling:**
- Header: Sticky, slate-100 / slate-800 background
- Row height: 60px
- Hover: Row background lighten
- Alternating row colors: white/slate-50 vs white/slate-900

**Your Position (Highlighted):**
- Background: Blue-50 / blue-900
- Border-left: 3px blue-600
- Font: Semibold

---

### Section 18.3: CTA Section

**Content:** "You're currently rank #247. Keep studying to climb the leaderboard!"
**Button:** "View Your Profile"

---

## PAGE 19: ACHIEVEMENTS

**Route:** `/achievements` (protected)
**Layout:** Grid-based

### Section 19.1: Achievements Header

**Heading (H1):** "Achievements"
**Stats:**
- Total badges earned: "24 / 50"
- Progress: Bar showing 48%

---

### Section 19.2: Achievement Categories

**Tabs:** "All" | "Unlocked" | "Locked"

**Achievement Grid (locked tab):**
- Layout: 4-column (desktop) / 2-column (mobile)
- Gap: 24px

**Achievement Badge Card:**
- Background: white / slate-900 (unlocked) or slate-100 / slate-800 (locked)
- Border: 2px gold / slate-700
- Padding: lg (24px)
- Border-radius: lg (12px)
- Text-align: center
- Opacity: 100% (unlocked) or 40% (locked)

**Badge Icon:**
- Size: 64x64
- Margin-bottom: 12px

**Badge Name (H3):**
- Font: 16px semibold

**Description:**
- Font: 12px
- Color: slate-600 / slate-400
- Margin-top: 8px

**Unlock Requirement (if locked):**
- Font: 12px
- Color: Amber
- Content: "Study 50 hours to unlock"

**Unlock Date (if unlocked):**
- Font: 12px
- Color: slate-500
- Content: "Unlocked on May 15, 2024"

---

## PAGES 20-22: USER SETTINGS & PROFILE

### PAGE 20: Profile/Account Settings

**Route:** `/settings/profile` (protected)
**Layout:** Sidebar nav + content

### Section 20.1: Settings Sidebar

**Position:** 200px width (desktop) / hidden (mobile)
**Navigation Links:**
- Account
- Learning Preferences
- Notifications
- Privacy
- Billing (if applicable)

---

### Section 20.2: Profile Form

**Heading (H2):** "Account Settings"

**Form Fields:**
1. Profile Picture
   - Avatar: 100x100 circular
   - Upload button
   - Delete button

2. Full Name*
   - Input: Text field

3. Email* (Read-only)
   - Display: Text
   - Change email button (opens modal)

4. School/College
   - Input: Text field

5. Target Grades
   - Multi-select: Select subjects and target grades

**Action Buttons:**
- "Save Changes" (primary)
- "Cancel" (text link)

---

### PAGE 21: Learning Preferences

**Route:** `/settings/preferences` (protected)

**Settings:**
1. **Daily Study Goal**
   - Input: Number (minutes)
   - Options: 30, 60, 90, 120 minutes

2. **Preferred Study Style**
   - Options: Visual, Auditory, Reading/Writing, Kinesthetic
   - Radio buttons

3. **Subjects**
   - Multi-select checkboxes
   - Allow add/remove subjects

4. **Notification Frequency**
   - Options: Daily, Weekly, Never
   - Radio buttons

---

### PAGE 22: Notifications & Privacy

**Route:** `/settings/notifications` and `/settings/privacy`

**Notification Settings:**
1. Study reminders (toggle)
2. Streak notifications (toggle)
3. Achievement alerts (toggle)
4. Weekly summary (toggle)

**Privacy Settings:**
1. Profile visibility (Public/Private/Friends Only)
2. Leaderboard visibility (toggle)
3. Show achievement badges (toggle)

---

## GLOBAL COMPONENTS & PATTERNS

### Navigation Bar (Authenticated)

**Position:** Sticky top
**Background:** white / slate-900
**Border-bottom:** 2px divider
**Height:** 64px
**Padding:** md (16px) horizontal

**Layout:** Flex, justify-content space-between, align-items center

**Left Section:**
- Logo: 32x32 clickable (navigates home)

**Center Section (Desktop):**
- Hidden on mobile/tablet

**Right Section:**
- Avatar: 40x40 circular, clickable (opens menu)
- Menu options:
  - Profile
  - Settings
  - Help
  - Sign Out

---

### Modal Component (Shared)

**Background:** Overlay (rgba(0, 0, 0, 0.5))
**Modal Box:**
- Background: white / slate-900
- Border-radius: lg (12px)
- Padding: xl (32px)
- Max-width: 500px
- Box-shadow: lg
- Position: Centered

**Modal Header:**
- Heading: 24px semibold
- Close button: Top-right, X icon

**Modal Content:**
- Font: 14px
- Line-height: 1.6

**Modal Footer:**
- Buttons: Left-aligned action buttons

**Animation:**
- Enter: Scale from 90% to 100%, opacity 0 to 1 (200ms)
- Exit: Reverse (200ms)

---

### Toast/Notification

**Position:** Fixed bottom-right (desktop) / bottom-center (mobile)
**Background:** Success (green-600), Error (red-600), Info (blue-600), Warning (amber-600)
**Color:** white
**Padding:** md (16px)
**Border-radius:** md (8px)
**Font:** 14px
**Box-shadow:** lg

**Animation:**
- Enter: Slide-up from -100px, fade-in (300ms ease-out)
- Exit: Slide-down, fade-out (300ms ease-in)
- Auto-dismiss: 5s

---

### Loading Spinner

**Position:** Centered or as overlay
**Size:** 40x40
**Color:** blue-600
**Animation:** Rotation 360deg infinite 1.5s linear

---

---

## MOBILE-FIRST RESPONSIVE SPECIFICATIONS

### Breakpoints

- **Mobile (sm):** 320px - 479px
- **Tablet (md):** 480px - 1023px
- **Desktop (lg):** 1024px - 1439px
- **Wide (xl):** 1440px+

### Typography Scaling

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| H1 (Page) | 56px | 44px | 36px |
| H2 (Section) | 44px | 32px | 24px |
| H3 (Card) | 24px | 20px | 18px |
| Body | 16px | 16px | 14px |
| Small | 14px | 13px | 12px |
| Micro | 12px | 11px | 10px |

### Spacing Scaling

| Size | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| xs | 4px | 3px | 2px |
| sm | 8px | 6px | 4px |
| md | 16px | 12px | 8px |
| lg | 24px | 18px | 12px |
| xl | 32px | 24px | 16px |
| 2xl | 48px | 36px | 24px |
| 4xl | 96px | 72px | 48px |

### Component Adaptations

**Hero Sections:**
- Desktop: 2-column layout
- Tablet: 1.5-column (image smaller)
- Mobile: 1-column stacked

**Cards:**
- Desktop: 3-column grids
- Tablet: 2-column
- Mobile: 1-column full-width

**Sidebars:**
- Desktop: Fixed 280-300px
- Tablet: Hidden (toggle)
- Mobile: Hidden (overlay when toggled)

**Buttons:**
- Desktop: Multiple buttons per row
- Tablet: 2 buttons per row
- Mobile: Full-width stacked

**Touch Targets:**
- Minimum height: 44px
- Minimum width: 44px
- Minimum gap between targets: 8px

---

## DARK MODE SPECIFICATIONS

### Color Overrides

| Element | Light | Dark |
|---------|-------|------|
| Background (Primary) | white | slate-900 |
| Background (Secondary) | slate-50 | slate-800 |
| Text (Primary) | slate-900 | white |
| Text (Secondary) | slate-600 | slate-400 |
| Border | slate-200 | slate-700 |
| Divider | slate-200 | slate-700 |

### Component Overrides

**Cards:**
- Background: white → slate-900
- Border: slate-200 → slate-700
- Text: slate-900 → white
- Shadow: Increase opacity by 20%

**Buttons:**
- Primary: Same gradient (works in both modes)
- Secondary (Outline): Border and text blue-600 → blue-400

**Inputs:**
- Background: white → slate-800
- Text: slate-900 → slate-100
- Border: slate-200 → slate-700
- Placeholder: slate-400 → slate-500

**Images:**
- Overlay opacity: Increase to 50%+ for readability on dark backgrounds

---

## ACCESSIBILITY SPECIFICATIONS

### WCAG 2.1 Level AA Compliance

**Text Contrast:**
- Body text: Minimum 4.5:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio
- Large text (18px+ or 14px+ bold): 3:1 minimum

**Focus Indicators:**
- All interactive elements have visible focus state
- Focus outline: 3px solid outline
- Outline color: blue-400 (or subject-color equivalent)
- Outline offset: 2px

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Tab order is logical and sequential
- Skip links for navigation (optional but recommended)
- No keyboard traps

**Color Usage:**
- Color is not the sole indicator of meaning
- Status/states also indicated by text or icon changes
- Example: Form errors shown with red border AND error message text

**Text Sizing:**
- Page supports 200% zoom without loss of functionality
- Text can be resized 200% without horizontal scrolling
- Avoid fixed font sizes where possible

**Motion & Animation:**
- Respect `prefers-reduced-motion` CSS media query
- For users with `prefers-reduced-motion: reduce`:
  - All animations reduced to 0.5s or removed entirely
  - Transitions disabled
  - No infinite animations

**Screen Readers:**
- Semantic HTML: Use `<h1>`, `<button>`, `<a>`, `<label>`, etc.
- ARIA labels on icon-only buttons: `aria-label="Close menu"`
- Images: `alt` text describing content (or `alt=""` if decorative)
- Form inputs: Associated `<label>` elements
- Live regions: `aria-live="polite"` for dynamic content (success messages, etc.)
- Hidden content: `aria-hidden="true"` for purely decorative elements

**Form Accessibility:**
- All inputs have associated labels
- Error messages linked to inputs with `aria-describedby`
- Required fields marked with `*` and `aria-required="true"`
- Fieldsets group related inputs with `<fieldset>` and `<legend>`

**Mobile Accessibility:**
- Touch targets minimum 44x44px
- Avoid touch targets closer than 8px
- Avoid hover-only interactions
- Support both portrait and landscape orientations

---

## VISUAL CONSISTENCY

### Color Palette

**Primary Colors:**
- Blue: #3B82F6 (blue-600)
- Purple: #A855F7 (purple-600)
- Gradient: blue-600 → purple-600

**Subject Colors:**
- Mathematics: Blue (#3B82F6)
- English: Purple (#A855F7)
- Sciences: Green (#10B981)
- Business/Economics: Indigo (#6366F1)
- Humanities: Purple (#A855F7)

**Semantic Colors:**
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Amber (#F59E0B)
- Info: Blue (#3B82F6)

### Typography

**Fonts:**
- Headings: Poppins (bold, weight 700)
- Body: Inter (regular, weight 400)
- Mono (code): Courier New or monospace

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Icons

**Sizing:**
- Micro: 16x16px (inline text)
- Small: 20x20px (buttons, inputs)
- Medium: 32x32px (cards)
- Large: 48x48px (feature icons)
- Extra Large: 64x64px (badges)

**Styling:**
- Color: Match surrounding text or use subject-color
- Stroke width: 2px (consistent across all icons)

### Shadows

**Drop Shadows (on white background):**
- sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- md: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

**Drop Shadows (on dark background):**
- Increase opacity by 30%
- Use rgba(0, 0, 0, 0.3) + additional layer

### Border Radius

- None: 0px
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

---

## ANIMATIONS & INTERACTIONS

### Timing & Easing

**Standard Transitions:**
- Duration: 200ms
- Easing: `ease-out` (cubic-bezier(0.16, 1, 0.3, 1))

**Page/Section Transitions:**
- Duration: 300ms
- Easing: `ease-out`

**Complex Animations:**
- Duration: 600ms - 1000ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy effects

**Hover Effects:**
- Button scale: 1.05
- Card scale: 1.02
- Translate: -4px (up) on hover

**Active/Click Effects:**
- Scale: 0.98
- Duration: 100ms

### Animations

**Fade-in:**
- Opacity: 0 → 1
- Duration: 300ms
- Timing: ease-out

**Slide-up:**
- Transform: translateY(20px) → translateY(0)
- Duration: 300ms
- Timing: ease-out

**Bounce:**
- Transform: Keyframes with 4-5 bounces
- Duration: 2s
- Timing: ease-out

**Pulse (Infinite):**
- Scale: 1 → 1.05 → 1
- Duration: 2s
- Timing: ease-in-out
- Iteration: infinite

**Flip (Card):**
- Transform: rotateY(0deg) → rotateY(180deg)
- Duration: 600ms
- Timing: cubic-bezier(0.68, -0.55, 0.265, 1.55)

---

## IMAGE SPECIFICATIONS

### Image Assets

| Filename | Dimensions | Format | Purpose |
|----------|------------|--------|---------|
| hero-ai-revolution.png | 1920x1080 | PNG/WebP | Landing page hero |
| feature-ai-tutor.png | 400x300 | PNG/WebP | Feature card image |
| feature-revision-hub.png | 400x300 | PNG/WebP | Feature card image |
| feature-marketplace.png | 400x300 | PNG/WebP | Feature card image |
| dashboard-welcome-banner.png | 1200x300 | PNG/WebP | Dashboard hero |
| onboarding-subjects.png | 500x300 | PNG/WebP | Onboarding illustration |
| learning-hub-hero.png | 500x400 | PNG/WebP | Learning hub hero |
| social-proof-celebration.png | 1920x600 | PNG/WebP | Testimonials background |
| stats-bg-pattern.png | 1024x1024 | PNG (tileable) | Stats section pattern |
| empty-state-no-activity.png | 400x300 | PNG/WebP | Empty state illustration |
| learning-student-bg.png | 1920x1080 | PNG/WebP | Sign in/sign up background |

### Image Optimization

- Use WebP format with PNG fallback
- Compress using TinyPNG or similar
- Lazy load off-screen images
- Responsive images (srcset) for desktop/mobile variants

---

## FORM INPUT SPECIFICATIONS

### Input Base Styling

**All Inputs (text, email, password, textarea, select):**

**Default State:**
- Border: 2px solid slate-200 / slate-700
- Background: white / slate-800
- Text: slate-900 / slate-100
- Padding: 12px 16px
- Border-radius: 8px (md)
- Font: 14px Inter
- Placeholder: slate-400 / slate-500

**Focus State:**
- Border: 2px solid blue-400
- Box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
- Outline: none
- Transition: 200ms border-color ease

**Disabled State:**
- Background: slate-100 / slate-700
- Color: slate-400
- Cursor: not-allowed
- Opacity: 50%

**Error State:**
- Border: 2px solid red-500
- Background: white / slate-800 (unchanged)
- Helper text below: red-600, 12px

**Success State:**
- Border: 2px solid green-500
- Icon: Check mark (right side)

### Label Styling

**Label:**
- Font: 14px semibold
- Color: slate-900 / white
- Margin-bottom: 8px
- Display: block

**Required Indicator:**
- Color: red-600
- Content: "*"
- After label text

### Textarea Specific

- Min-height: 80px (3 lines)
- Max-height: 300px (with overflow-y auto)
- Resize: Vertical only
- Expands as user types (JS implementation)

### Select Specific

- Arrow icon: Right side, blue-600
- Custom styling: Browser default or custom component
- Hover: Border-color brighten

---

## API/BACKEND CONSIDERATIONS

These specifications assume the following backend endpoints exist:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile
- `POST /api/agents/chat` - Send message to AI agent
- `GET /api/flashcards/decks` - Get user's flashcard decks
- `POST /api/flashcards/decks` - Create new deck
- `GET /api/practice-papers` - Get available practice papers
- `POST /api/practice-papers/[id]/submit` - Submit answers
- `GET /api/leaderboard` - Get leaderboard data
- `GET /api/achievements` - Get user's achievements

---

## DEPLOYMENT & BUILD NOTES

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS with custom color palette
- **Icons:** Use component library (e.g., Lucide React, Heroicons)
- **Animations:** CSS transitions + framer-motion (if needed)
- **Dark Mode:** Tailwind's `dark:` variant
- **Responsive:** Mobile-first approach with breakpoint utilities
- **Accessibility:** Follow WCAG 2.1 AA guidelines
- **SEO:** Meta tags, canonical URLs, structured data

---

## CHECKLIST FOR DEVELOPERS

- [ ] All pages follow the specified layout and structure
- [ ] Typography matches font family, size, and weight specifications
- [ ] Colors use the defined palette (Tailwind classes)
- [ ] Spacing follows the defined scale (padding, margin, gaps)
- [ ] All interactive elements have hover states
- [ ] All interactive elements have focus states (keyboard accessible)
- [ ] Mobile responsiveness verified at breakpoints
- [ ] Dark mode tested and functional
- [ ] Images are optimized and properly sized
- [ ] Forms have proper labels and error handling
- [ ] Animations use specified timing and easing
- [ ] Page load performance is optimized
- [ ] Cross-browser compatibility tested
- [ ] Accessibility tested with screen readers
- [ ] Touch targets are 44x44px minimum
- [ ] All pages have proper SEO metadata

---

**Document Version:** 1.0  
**Last Updated:** June 8, 2024  
**Status:** Production Ready

For questions or clarifications, refer to the design system or contact the UI/UX team.

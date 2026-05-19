# Paire Design Guide — Building a Premium, Human-Crafted UI

A practical guide to making Paire look and feel like a hand-crafted product, not an AI-generated template. Based on research from Refactoring UI, rauno.me/interfaces, Laws of UX, Anthony Hobday's visual design rules, Nielsen Norman Group heuristics, and patterns from Hinge, Bumble, Airbnb, and Apple HIG.

---

## 1. Color: Warmth Over Stock Palettes

**Problem with AI-generated UIs:** They use pure black (#000), pure white (#FFF), and stock saturated colors. The result looks flat and lifeless.

**Rules:**
- **Never use pure black or white.** Use near-black (`#0F0D15`) and near-white (`#FAFAF8`) instead. This reduces harsh contrast and adds warmth.
- **Saturate your neutrals.** Add a hint of your brand hue (purple) to grays. A gray of `hsl(260, 3%, 55%)` feels warmer than `hsl(0, 0%, 55%)`.
- **Limit your palette.** Use one primary (purple `#7C5CFC`), one accent (coral `#FF6B6B`), and 3-4 neutral shades derived from the primary. That's it.
- **Distinct brightness values.** Each color in the palette should have a clearly different brightness, so nothing competes visually.
- **Background brightness delta.** Container backgrounds should differ from the page background by ≤ 12% (dark mode) or ≤ 7% (light mode) in HSB brightness.

**Applied to Paire:**
- Background: `#FAFAF8` (warm off-white) instead of pure white
- Near-black text: `#0F0D15` instead of `#000`
- Card backgrounds: `#F5F4F0` (light) / `#1A1820` (dark) — warm neutrals with purple saturation
- Muted text uses purple-tinted gray, not pure gray

---

## 2. Typography: Tight Headlines, Airy Body

**Problem with AI-generated UIs:** Same line-height everywhere, same letter-spacing, mechanical uniformity.

**Rules:**
- **Tighten large text.** Headlines (24px+) should have `letter-spacing: -0.02em` and `line-height: 1.15`. This creates a dense, editorial look.
- **Loosen small text.** Body text (14-16px) uses `line-height: 1.6` and `letter-spacing: 0.01em` for readability.
- **Two typefaces max.** Paire uses Geist Sans (UI) — that's fine as the single typeface. Don't mix in random display fonts.
- **Font weight 400-700.** Never go below 400. Medium-sized headings look best at 500-600.
- **Anti-aliased rendering.** Always apply `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.
- **Tabular nums.** Use `font-variant-numeric: tabular-nums` for numbers in tables, timers, compatibility scores — prevents layout shift.

**Applied to Paire:**
- Hero heading: tracking-tighter, font-bold, line-height ~1.15
- Body copy: text-base with relaxed line-height
- Compatibility scores use tabular-nums
- All text ≥ 16px on mobile (prevents iOS auto-zoom on focus)

---

## 3. Spacing: Mathematical Rhythm

**Problem with AI-generated UIs:** Random spacing values. Padding and margins feel arbitrary.

**Rules:**
- **Use an 8px grid.** Every spacing value should be a multiple of 4 or 8: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Outer padding ≥ inner padding.** Card padding should be ≥ the spacing between elements inside the card.
- **Horizontal button padding = 2× vertical.** If vertical padding is 12px, horizontal should be 24px.
- **Space between contrast edges.** Measure spacing from one high-contrast edge to the next.
- **Progressive spacing.** Related items sit close (8-12px gap), section breaks sit far (48-96px gap). This is Gestalt proximity.

**Applied to Paire:**
- Cards use p-5 (20px) with internal gap-3 (12px) — outer > inner
- Section spacing: py-20 for major sections, py-12 for minor
- Button padding: `px-8 py-3` (2:1 ratio)
- Feature grid gap: 20px between cards

---

## 4. Motion: Fast, Proportional, Purposeful

**Problem with AI-generated UIs:** Everything animates the same way: 0.3s fade-in with y:20. It feels robotic and repetitive.

**Rules:**
- **Keep interactions under 200ms.** Hover, press, tab changes — all should feel instant.
- **Proportional scaling.** Buttons scale to 0.97 on press, not 0.8. Dialogs enter at 0.96 scale, not 0. The trigger determines the magnitude.
- **Stagger meaningfully.** Don't stagger every list — only use it when items appear in a clear sequence (onboarding steps, how-it-works). Feature grids can appear simultaneously.
- **Avoid redundant animations.** Frequent actions (sending a message, swiping a card, navigating tabs) should NOT have entrance animations. Reserve animation for novelty moments: match modal, first visit, confetti.
- **Spring physics > duration.** Use `type: "spring"` with `stiffness: 300, damping: 25` for natural card physics. Avoid linear easing.
- **Reduced motion support.** Respect `prefers-reduced-motion: reduce`. Disable all non-essential animations.
- **No animation on theme switch.** When toggling dark/light mode, suppress all transitions momentarily.

**Applied to Paire:**
- Swipe cards use spring physics (stiffness 400, damping 30)
- Bottom nav indicator uses `layoutId` spring transition
- Landing page: hero fades in once, sections use subtle `whileInView`
- Chat messages do NOT animate on send — just appear instantly

---

## 5. Depth: Light Source Consistency

**Problem with AI-generated UIs:** Inconsistent shadow directions, too many depth levels, shadows in dark mode.

**Rules:**
- **One light source.** All shadows cast from top-left. Shadow: `0 2px 8px rgba(0,0,0,0.06)` for subtle, `0 8px 32px rgba(0,0,0,0.10)` for elevated.
- **Shadow blur = 2× distance.** A 4px Y-offset needs 8px blur.
- **Lower opacity as elements rise.** Closer (higher) elements get larger, softer shadows.
- **No shadows in dark mode.** Use 1px borders or brightness differences instead. Shadows are invisible against dark backgrounds.
- **Don't mix depth techniques.** If you use shadows, use them everywhere. If you use borders, commit to borders. Don't alternate randomly.
- **Closer = lighter.** Elevated cards should be slightly lighter than the page background.

**Applied to Paire:**
- Cards: `shadow-sm` in light mode, `border border-border/50` in dark mode
- Swipe card: `shadow-2xl` because it's the primary interactive element
- Bottom nav: `backdrop-blur-xl` with translucent bg — no shadow
- Dark mode: border-based separation, no shadows

---

## 6. Layout: Breathing Room & Alignment

**Problem with AI-generated UIs:** Content crammed edge-to-edge, inconsistent max-widths, no clear visual hierarchy.

**Rules:**
- **Max-width everything.** Content areas should have a max-width (640px for reading, 1024px for dashboards).
- **Generous top padding.** The first section should breathe. `pt-24` minimum on hero.
- **Align everything.** Every element should be aligned with at least one other element on the page. Random positioning = amateur.
- **Safe area support.** Use `env(safe-area-inset-bottom)` for bottom nav, `100dvh` for full-height layouts.
- **No two hard divides adjacent.** Don't put a border AND a background change at the same boundary. Pick one.

**Applied to Paire:**
- All content: `max-w-lg` (mobile), `max-w-3xl` (desktop features)
- Hero: `pt-24 pb-16` for generous breathing
- Sections alternate between `bg-background` and `bg-muted/30` — not both border + bg change

---

## 7. Interactivity: Touch-First, Accessible

**Problem with AI-generated UIs:** Hover-only states, tiny tap targets, no keyboard support.

**Rules:**
- **44px minimum tap targets.** Per Apple HIG. Buttons, nav items, interactive elements.
- **Hover states only with `@media (hover: hover)`.** On touch devices, hover states should NOT show on tap.
- **Disable user-select on interactive elements.** Prevents accidental text selection during swipes.
- **No auto-focus on mobile.** Opening a keyboard unexpectedly is hostile.
- **Disable spell-check on non-text inputs.** Names, locations, etc.
- **Form inputs wrapped in `<form>`.** So Enter submits.
- **Buttons disable after submission.** Prevents duplicate requests.

**Applied to Paire:**
- Swipe cards: `select-none`, `touch-action: none` on drag
- Bottom nav items: `h-16` with padding for 44px+ tap area
- Login/signup forms wrapped in `<form>` with Enter submission
- Submit buttons show loading spinner and disable during submission

---

## 8. Borders, Corners & Containers

**Problem with AI-generated UIs:** Aggressive rounding (rounded-3xl on everything), inconsistent border radius, borders that blend into backgrounds.

**Rules:**
- **Nest corner radii properly.** Inner radius = outer radius − gap. If a card has `border-radius: 16px` and 8px padding, inner elements use `border-radius: 8px`.
- **Borders must contrast with BOTH the container and the background.** A border between two surfaces should be darker (light mode) or lighter (dark mode) than both.
- **Consistent rounding scale.** Use 3-4 radius sizes: `rounded-lg` (buttons, badges), `rounded-xl` (cards, inputs), `rounded-2xl` (modals, major cards), `rounded-full` (avatars, pills).
- **No double hard divides.** Don't stack a border on top of a color change.

**Applied to Paire:**
- Swipe cards: `rounded-3xl` (the primary element)
- Inner content cards: `rounded-xl`
- Badges/pills: `rounded-full`
- Bottom nav: border-t only, no shadow, no background change

---

## 9. Content: Human Voice, Not Marketing Speak

**Problem with AI-generated UIs:** Generic hero copy like "Find Your Perfect Match", stock testimonials with round numbers ("50K+ users"), too many exclamation marks.

**Rules:**
- **Specificity over generality.** "Find someone who matches your sleep schedule, budget, and cleaning habits" > "Find your perfect roommate."
- **Realistic numbers.** Don't claim "50K+ users" if you don't have them. Use social proof you can actually back up, or skip the stats bar entirely for early-stage apps.
- **One CTA per section.** Don't give users 3 buttons. One primary action per screen.
- **Conversational headings.** "How it works" is fine. "Your Journey to the Perfect Roommate Starts Here" is AI-speak.
- **No placeholder testimonials unless clearly labeled.** Fake quotes with initials damage trust.

**Applied to Paire:**
- Landing page uses direct, specific copy
- Social proof bar is honest for the stage of the product
- Single primary CTA: "Get Started Free"

---

## 10. Dark Mode: Not Just Inverted Colors

**Problem with AI-generated UIs:** Dark mode = `background: black, color: white`. Looks washed out and harsh.

**Rules:**
- **Dark background = near-black with purple warmth.** `#0F0D15` instead of `#000`.
- **Foreground = off-white.** `#EDEDEB` instead of `#FFF`.
- **Elevated elements are lighter, not darker.** Cards in dark mode should be slightly lighter than the background.
- **No shadows in dark mode.** Use subtle borders (`border-white/5`) instead.
- **Reduce image brightness slightly.** `brightness(0.95)` on photos in dark mode prevents eye strain.
- **Muted colors get warmer.** Purple-tinted grays instead of neutral grays.

---

## 11. Performance & Polish

**Rules:**
- **Images: lazy load by default.** Only priority-load above-the-fold content.
- **Blur effects sparingly.** `backdrop-filter: blur()` is GPU-expensive. Only use on nav bars and modals.
- **No layout shift.** Skeleton loaders should match final content dimensions. Use `font-variant-numeric: tabular-nums` for changing numbers.
- **Response time < 400ms** (Doherty Threshold). Every interaction must respond within 400ms to maintain flow state.

---

## Quick Reference: AI-Generated vs Hand-Crafted

| AI-Generated Smell | Hand-Crafted Fix |
|---|---|
| Pure black/white | Near-black `#0F0D15` / near-white `#FAFAF8` |
| Uniform `y:20, opacity:0` entrance on everything | Animate only novel moments; instant for frequent actions |
| Generic stock copy | Specific, conversational, honest numbers |
| Same border-radius on everything | Hierarchical: `full` → `2xl` → `xl` → `lg` |
| Shadows in dark mode | Borders and brightness differences |
| Random spacing values | 8px grid, mathematical relationships |
| Every list item staggers | Only stagger sequential reveals |
| Hover effects on mobile | `@media (hover: hover)` guard |
| Flat unsaturated grays | Purple-tinted neutrals |
| Too many gradients | One gradient (CTA), rest solid with subtle tints |

---

## Sources

- [Refactoring UI](https://www.refactoringui.com/) — Steve Schoger & Adam Wathan
- [Web Interface Guidelines](https://rauno.me/interfaces) — Rauno Freiberg (Vercel)
- [Laws of UX](https://lawsofux.com/) — Jon Yablonski
- [Visual Design Rules You Can Safely Follow](https://anthonyhobday.com/sideprojects/saferules/) — Anthony Hobday
- [10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — Nielsen Norman Group
- [Web Vitals](https://web.dev/articles/vitals) — Google
- Apple Human Interface Guidelines
- Material Design 3 Guidelines

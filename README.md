# Paire — Roommate Matching App

A roommate matching app with swipe-to-match, real-time chat, and compatibility scoring. Built with Next.js 16, Supabase, TypeScript, TailwindCSS v4, and shadcn/ui.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, TailwindCSS v4, shadcn/ui |
| **Animations** | Framer Motion (swipe physics, page transitions) |
| **State** | Zustand (client), React Query ready (server state) |
| **Backend** | Supabase — PostgreSQL, Auth, Realtime, Storage |
| **Hosting** | Vercel (frontend) + Supabase Cloud (backend) |

---

## How It Works

1. **Sign up** with email/password or Google OAuth
2. **Onboard** in 5 steps — basics, lifestyle, budget, personality prompts, photos
3. **Discover** — swipe through roommate cards ranked by compatibility (like, pass, or super-like)
4. **Match** — when both users like each other, a match is created automatically via a PostgreSQL trigger
5. **Chat** — real-time messaging opens between matched users, with typing indicators and icebreaker suggestions
6. **Filter** — narrow results by budget range, age, sleep schedule, smoking, pets

### Compatibility Scoring

Each pair gets a weighted score across 5 dimensions:

| Dimension | Weight |
|-----------|--------|
| Budget | 25% |
| Cleanliness | 20% |
| Schedule | 20% |
| Social habits | 15% |
| Lifestyle | 20% |

The score appears as an animated circular badge on every swipe card and in the full profile detail view.

---

## Features

### Core
- **Auth** — Email/password + Google OAuth via Supabase SSR (cookie-based sessions)
- **Profiles** — Photo uploads, bio, budget range, lifestyle preferences, move-in date
- **Swipe UI** — Drag-to-swipe cards with LIKE/NOPE overlays and spring physics
- **Matching** — Automatic mutual-match detection with confetti animation
- **Real-time Chat** — Supabase Realtime with read receipts, iMessage-style bubbles
- **Filters** — Budget range, age, sleep schedule, smoking, pets (bottom sheet drawer)
- **Dark Mode** — Full theme toggle
- **Mobile-first** — Responsive, `100dvh` layouts, safe-area inset support
- **Security** — Row Level Security (RLS) on all database tables

### Competitive Improvements
- **Compatibility scoring** — Weighted algorithm with animated circular badge on every card
- **Hinge-style prompts** — Users answer up to 3 personality prompts during onboarding
- **Verification badges** — Trust signals for email, phone, ID, and photo verification
- **Typing indicator** — Animated bouncing dots in chat
- **Icebreaker suggestions** — Pre-written opening messages when starting a new conversation
- **Profile detail sheet** — Tap any card to see full profile: photo gallery, compatibility breakdown, prompts, lifestyle grid
- **Super like** — Third swipe action with distinct visual
- **Online/activity status** — Green dot + relative time on cards, matches, and chat
- **Profile completion progress** — Tracks 9 fields with progress bar
- **Deal-breaker system** — Database schema for non-negotiables (smoking, pets, budget, gender)

### Design System
- **Warm color palette** — Near-black/near-white with purple-tinted neutrals (no pure black or white)
- **Semantic color tokens** — All colors defined as CSS custom properties in `globals.css`, so the entire palette can be changed in one file
- **Reduced motion support** — Respects `prefers-reduced-motion: reduce`
- **Typography** — Geist Sans, antialiased rendering, tight headline tracking, relaxed body text
- **8px spacing grid** — Consistent spacing scale across all components

See [`DESIGN_GUIDE.md`](./DESIGN_GUIDE.md) for the full design principles reference.

---

## Prerequisites

- **Node.js** 20.9+ (tested with 22.x)
- **npm** 10+
- A free [Supabase](https://supabase.com) account

---

## Local Setup

### 1. Clone & install

```bash
git clone https://github.com/ismailsiddeeq/paire-roommate-app.git
cd paire-roommate-app
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run both migrations in order:
   - `supabase/migrations/001_initial_schema.sql` — tables, indexes, RLS policies, match trigger
   - `supabase/migrations/002_competitive_improvements.sql` — prompts, verification, deal-breakers, activity tracking, superlike support
3. **Settings → API** — copy your Project URL and anon (public) key
4. **Storage** — create a bucket called `profile-photos` (set to public)
5. **Database → Replication** — enable Realtime for `messages` and `matches` tables

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set up auth providers

**Email/Password** — enabled by default in Supabase.

**Google OAuth** (optional):
1. Supabase Dashboard → Authentication → Providers → Google
2. Add your Google OAuth client ID and secret
3. Set redirect URL to `http://localhost:3000/auth/callback`

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, Signup pages
│   ├── (app)/               # Authenticated pages (protected by middleware)
│   │   ├── discover/        # Swipe feed with compatibility scores
│   │   ├── matches/         # Match list with online indicators
│   │   ├── chat/            # Chat list + individual conversations
│   │   ├── profile/         # Profile view + edit + completion tracking
│   │   └── onboarding/      # 5-step profile setup wizard
│   ├── auth/callback/       # OAuth redirect handler
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components (button, input, card, etc.)
│   ├── layout/              # BottomNav, Header, Logo
│   ├── swipe/               # SwipeCard, SwipeButtons, MatchModal, CompatibilityBadge, ProfileDetailSheet
│   ├── chat/                # MessageBubble, ChatInput, TypingIndicator, IcebreakerSuggestions
│   └── profile/             # OnboardingForm, FilterDrawer, VerificationBadge, ProfileCompletion
├── hooks/                   # useUser, useDiscovery, useMatches, useChat
├── stores/                  # Zustand stores (auth, discovery filters)
├── lib/                     # Supabase clients, compatibility algorithm, utils
└── types/                   # TypeScript interfaces
supabase/
└── migrations/              # SQL migration files (run in order)
```

## Database

| Table | Purpose |
|-------|---------|
| **users** | Profile data, lifestyle preferences (JSONB), prompts, verification status, deal-breakers |
| **profile_photos** | Multiple photos per user with ordering |
| **swipes** | Like/pass/superlike records (unique per pair) |
| **matches** | Auto-created via PostgreSQL trigger on mutual likes |
| **messages** | Real-time chat messages with read receipts |

All tables have Row Level Security (RLS) policies. Matching is handled by a PostgreSQL trigger (`check_match`) that fires on swipe insertion — if both users have liked each other, a match row is created atomically.

## Deployment

### Vercel

1. Connect the GitHub repo at [vercel.com](https://vercel.com)
2. Set environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy — Vercel auto-detects Next.js

### Supabase (production)

1. Run both migration SQL files in your production Supabase project
2. Enable Realtime on `messages` and `matches` tables
3. Create `profile-photos` storage bucket (public)
4. Set OAuth redirect URLs for your production domain

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build with TypeScript checking |
| `npm run start` | Start production server |
| `npm run lint` | ESLint with React Compiler rules |

## Architecture

- **Client Components** for interactive screens (swipe, chat, forms); **Server Components** for layout shells
- **Supabase SSR** middleware for auth (cookie-based sessions, auto-refresh)
- **Realtime subscriptions** for live chat + match notifications
- **Zustand** for client state (auth user, discovery filters)
- **Framer Motion** for card swipe physics, page transitions, staggered reveals
- **PostgreSQL triggers** for atomic match creation (avoids race conditions)
- **Semantic CSS tokens** — all colors derive from CSS custom properties, so the palette is configurable in one file

## License

MIT

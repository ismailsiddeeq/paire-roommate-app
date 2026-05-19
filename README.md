# Paire — Find Your Perfect Roommate 🏠

A production-grade roommate matching app with Tinder-style swiping, real-time chat, compatibility scoring, and premium UI. Built with Next.js 16, Supabase, and shadcn/ui.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, TailwindCSS v4, shadcn/ui |
| **Animations** | Framer Motion (swipe physics, page transitions, micro-interactions) |
| **State** | Zustand (client), React Query (server state ready) |
| **Backend** | Supabase — PostgreSQL, Auth, Realtime, Storage |
| **Hosting** | Vercel (frontend) + Supabase Cloud (backend) |

## Features

### Core
- **Auth** — Email/password + Google OAuth (Supabase SSR with cookie-based sessions)
- **Profiles** — Photo uploads, bio, budget range, lifestyle preferences, move-in date
- **Swipe UI** — Drag-to-swipe cards with LIKE/NOPE overlays and spring physics
- **Matching** — Automatic mutual-match detection with confetti animation modal
- **Real-time Chat** — Supabase Realtime with read receipts, iMessage-style bubbles
- **Filters** — Budget range, age, sleep schedule, smoking, pets
- **Dark Mode** — Full theme toggle
- **Mobile-first** — Responsive, 100dvh layouts, safe-area support
- **Security** — Row Level Security (RLS) on all tables

### Competitive Improvements
- **Compatibility Scoring** — Weighted algorithm (budget 25%, cleanliness 20%, schedule 20%, social 15%, lifestyle 20%) with animated circular badge on every card
- **Hinge-style Prompts** — Users answer up to 3 personality prompts during onboarding ("My ideal roommate...", "I'm looking for...", etc.)
- **Verification Badges** — Trust signals for email, phone, ID, and photo verification
- **Typing Indicator** — Animated bouncing dots in chat
- **Icebreaker Suggestions** — Pre-written opening messages when starting a new conversation
- **Profile Detail Sheet** — Tap any card to expand full profile with photo gallery, compatibility breakdown, prompts, and lifestyle grid
- **Super Like** — Third swipe action with distinct blue sparkle visual
- **Online/Activity Status** — Green dot + relative time on cards, matches, and chat headers
- **Profile Completion Progress** — Tracks 9 fields with progress bar encouraging users to complete their profile
- **Landing Page** — Social proof, stats, testimonials, feature grid — all animated

---

## Prerequisites

- **Node.js** 20.9+ (tested with 22.x)
- **npm** 10+
- A free [Supabase](https://supabase.com) account

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/ismailsiddeeq/paire-roommate-app.git
cd paire-roommate-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql` — creates tables, indexes, RLS policies, and match trigger
   - `supabase/migrations/002_competitive_improvements.sql` — adds prompts, verification, deal-breakers, activity tracking, superlike support
3. Go to **Settings → API** and copy your **Project URL** and **anon (public) key**
4. Go to **Storage** and create a bucket called `profile-photos` (set it to **public**)
5. Go to **Database → Replication** and enable Realtime for the `messages` and `matches` tables

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Auth Providers

**Email/Password** — Enabled by default in Supabase.

**Google OAuth** (optional):
1. Supabase Dashboard → Authentication → Providers → Google
2. Add your Google OAuth client ID and secret
3. Set redirect URL to `http://localhost:3000/auth/callback` (or your production domain)

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Build for Production

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
│   ├── (app)/               # Authenticated app pages
│   │   ├── discover/        # Swipe feed with compatibility scores
│   │   ├── matches/         # Match list with online indicators
│   │   ├── chat/            # Chat list + individual chats with typing indicator
│   │   ├── profile/         # Profile view + edit + completion tracking
│   │   └── onboarding/      # 5-step profile setup wizard
│   ├── auth/callback/       # OAuth callback handler
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
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

## Database Schema

| Table | Purpose |
|-------|---------|
| **users** | Profile data, lifestyle preferences (JSONB), prompts, verification status, deal-breakers, activity tracking |
| **profile_photos** | Multiple photos per user with ordering |
| **swipes** | Like/pass/superlike records (unique per pair) |
| **matches** | Auto-created via PostgreSQL trigger on mutual likes |
| **messages** | Real-time chat messages with read receipts |

All tables have Row Level Security (RLS) policies. Matching is handled via a PostgreSQL trigger (`check_match`) that fires on swipe insertion.

## Deployment

### Vercel

1. Connect the GitHub repo to [Vercel](https://vercel.com)
2. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy — Vercel auto-detects Next.js

### Supabase (Production)

1. Run both migration SQL files in your production Supabase project
2. Enable Realtime on `messages` and `matches` tables
3. Create `profile-photos` storage bucket (public)
4. Configure OAuth redirect URLs for your production domain

## Architecture Notes

- **Client Components** for all interactive screens (swipe, chat, forms), **Server Components** for layout shells
- **Supabase SSR** middleware for auth (cookie-based sessions, auto-refresh)
- **Realtime subscriptions** for live chat messages + match notifications
- **Zustand** for client state (auth user, discovery filters)
- **Framer Motion** for card swipe physics, page transitions, staggered reveals
- **PostgreSQL triggers** for match creation (avoids race conditions on mutual likes)
- **Compatibility algorithm** with weighted scoring across 5 lifestyle dimensions

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (React Compiler rules) |

## License

MIT

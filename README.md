# Paire — Find Your Perfect Roommate 🏠

A production-grade roommate matching app with Tinder-style swiping, real-time chat, and premium UI. Built with Next.js, Supabase, and shadcn/ui.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, TailwindCSS v4, shadcn/ui
- **Animations**: Framer Motion
- **State**: Zustand + React Query
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Hosting**: Vercel (frontend) + Supabase Cloud (backend)

## Features

- **Auth** — Email/password + Google OAuth
- **Profiles** — Photo uploads, bio, budget, lifestyle preferences, move-in date
- **Swipe UI** — Drag-to-swipe cards with LIKE/NOPE overlays
- **Matching** — Automatic mutual-match detection with animated modal
- **Real-time Chat** — Supabase Realtime with read receipts
- **Filters** — Budget range, age, sleep schedule, smoking, pets
- **Dark Mode** — Full theme toggle
- **Mobile-first** — Responsive, 100dvh layouts, safe-area support
- **Security** — Row Level Security on all tables

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/ismailsiddeeq/paire-roommate-app.git
cd paire-roommate-app
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration in `supabase/migrations/001_initial_schema.sql`
3. Go to **Settings → API** and copy your project URL + anon key

### 3. Configure Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Set Up Auth Providers

**Email/Password**: Enabled by default in Supabase.

**Google OAuth**:
1. Supabase Dashboard → Authentication → Providers → Google
2. Add your Google OAuth client ID and secret
3. Set redirect URL: `https://your-domain.com/auth/callback`

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Signup pages
│   ├── (app)/           # Authenticated app pages
│   │   ├── discover/    # Swipe feed
│   │   ├── matches/     # Match list
│   │   ├── chat/        # Chat list + individual chats
│   │   ├── profile/     # Profile view + edit
│   │   └── onboarding/  # Profile setup wizard
│   ├── auth/callback/   # OAuth callback handler
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # BottomNav, Header, Logo
│   ├── swipe/           # SwipeCard, SwipeButtons, MatchModal
│   ├── chat/            # MessageBubble, ChatInput
│   └── profile/         # OnboardingForm, FilterDrawer
├── hooks/               # useUser, useDiscovery, useMatches, useChat
├── stores/              # Zustand stores
├── lib/                 # Supabase clients, utils
└── types/               # TypeScript types
```

## Database Schema

- **users** — Profile data + lifestyle preferences JSON
- **profile_photos** — Multiple photos per user with ordering
- **swipes** — Like/pass records (unique per pair)
- **matches** — Auto-created via DB trigger on mutual likes
- **messages** — Real-time chat messages with read receipts

All tables have Row Level Security (RLS) policies. Matching is handled via a PostgreSQL trigger (`check_match`) that fires on swipe insertion.

## Deployment

### Vercel

```bash
npm run build
# Deploy via Vercel CLI or connect GitHub repo
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Supabase

1. Run the migration SQL in production Supabase project
2. Enable Realtime on `messages` and `matches` tables
3. Create `profile-photos` storage bucket (public)
4. Configure OAuth redirect URLs for production domain

## Architecture Notes

- **Server Components** for layout/data fetching, **Client Components** for interactivity
- **Supabase SSR** for middleware auth (cookie-based sessions)
- **Realtime subscriptions** for live chat + match notifications
- **Zustand** for client state (auth, filters), **React Query** ready for server state caching
- **Framer Motion** for card physics, page transitions, micro-interactions
- **PostgreSQL triggers** for match creation (avoids race conditions)

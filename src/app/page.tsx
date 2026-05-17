"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
  Star,
  BadgeCheck,
  Zap,
  Home,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "Compatibility Scoring",
    description:
      "Our algorithm calculates your match percentage based on lifestyle, budget, schedule, and habits.",
  },
  {
    icon: Heart,
    title: "Swipe to Match",
    description:
      "Tinder-style swiping makes finding roommates fast and fun. Match when you both like each other.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description:
      "Instant messaging with typing indicators and icebreaker suggestions to get the conversation going.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "Email, phone, ID, and photo verification badges so you know who you're matching with.",
  },
  {
    icon: BadgeCheck,
    title: "Deal-Breaker Filters",
    description:
      "Set your non-negotiables upfront — smoking, pets, budget — and only see compatible matches.",
  },
  {
    icon: Home,
    title: "Lifestyle Matching",
    description:
      "Match on cleanliness, noise level, sleep schedule, social habits, guests, and work-from-home preferences.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create your profile",
    description:
      "Tell us about your lifestyle, budget, and what you're looking for in a roommate. Add prompts to show your personality.",
  },
  {
    step: "02",
    title: "Discover matches",
    description:
      "Swipe through compatible roommates with our smart matching algorithm. See compatibility scores instantly.",
  },
  {
    step: "03",
    title: "Chat & connect",
    description:
      "When you match, start chatting right away. Use our icebreaker suggestions or jump straight in.",
  },
];

const stats = [
  { value: "95%", label: "Match satisfaction" },
  { value: "48hrs", label: "Avg time to match" },
  { value: "50K+", label: "Roommates matched" },
  { value: "4.9", label: "App Store rating", icon: Star },
];

const testimonials = [
  {
    name: "Sarah K.",
    location: "New York, NY",
    text: "I found my roommate in 3 days. The compatibility score was spot on — we've been living together for 6 months and it's been perfect.",
    avatar: "SK",
  },
  {
    name: "Marcus J.",
    location: "San Francisco, CA",
    text: "Every other roommate app felt like Craigslist with a coat of paint. Paire actually felt like a modern app built for how I search.",
    avatar: "MJ",
  },
  {
    name: "Emily R.",
    location: "Austin, TX",
    text: "The prompts and lifestyle matching are game-changers. I could tell within seconds if someone would be a good fit.",
    avatar: "ER",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-50 via-background to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20" />
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl" />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex max-w-lg flex-col items-center text-center"
        >
          <Logo size={72} />

          {/* Trust badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex items-center gap-1.5 rounded-full bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          >
            <Zap className="h-3 w-3" />
            #1 Rated Roommate Matching App
          </motion.div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Perfect{" "}
            </span>
            Roommate
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Swipe, match, and connect with compatible roommates. Smart
            compatibility scoring. Verified profiles. Real-time chat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="w-full rounded-full bg-purple-600 px-8 hover:bg-purple-700"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full px-8"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Social proof strip */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["SK", "MJ", "ER", "TL", "AH"].map((initials, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-purple-400 to-pink-400 text-[10px] font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Loved by 50,000+ roommate seekers
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-purple-600">
                  {stat.value}
                </span>
                {stat.icon && (
                  <stat.icon className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold">How Paire Works</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Three simple steps to finding your ideal roommate
          </p>
          <div className="mt-10 space-y-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ x: i % 2 === 0 ? -20 : 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-lg font-bold text-purple-600 dark:bg-purple-900/30">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/40 bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold">
            Everything You Need to Find Your Match
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Built with features from the best dating and roommate apps — done
            better
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-2xl bg-background p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <feature.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold">
            What Our Users Say
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Real stories from real roommates
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border/50 bg-card p-5"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-[10px] font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{testimonial.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-16 text-white">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <Users className="h-10 w-10 opacity-80" />
          <h2 className="mt-4 text-2xl font-bold">
            Ready to find your perfect roommate?
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Join thousands of people who found their ideal living situation
            through Paire.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="mt-6 rounded-full bg-white px-8 text-purple-600 hover:bg-white/90"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-6 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Logo size={16} />
          <span>Paire &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

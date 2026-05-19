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
  BadgeCheck,
  Home,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "Compatibility scoring",
    description:
      "Budget, cleanliness, schedule, social habits — weighted and scored so you see how well you actually fit.",
  },
  {
    icon: Heart,
    title: "Swipe to match",
    description:
      "Like, pass, or super-like. When it's mutual, you both get notified and chat opens up.",
  },
  {
    icon: MessageCircle,
    title: "Real-time chat",
    description:
      "Message your matches instantly. Typing indicators and icebreaker prompts included.",
  },
  {
    icon: Shield,
    title: "Verified profiles",
    description:
      "Email, phone, ID, and photo verification. Know who you're talking to before you commit.",
  },
  {
    icon: BadgeCheck,
    title: "Deal-breaker filters",
    description:
      "Set your non-negotiables once — smoking, pets, budget range — and never see mismatches.",
  },
  {
    icon: Home,
    title: "Lifestyle matching",
    description:
      "Cleanliness, noise, sleep schedule, guests, WFH — the stuff that actually matters when you share a space.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Build your profile",
    description:
      "Add your lifestyle preferences, budget, and answer a few personality prompts. Takes about 3 minutes.",
  },
  {
    step: "02",
    title: "Browse compatible people",
    description:
      "Swipe through profiles ranked by compatibility. Tap any card to see the full breakdown.",
  },
  {
    step: "03",
    title: "Match and chat",
    description:
      "When it's mutual, the chat opens. Start with an icebreaker or just say hi.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 flex max-w-md flex-col items-center text-center"
        >
          <Logo size={64} />

          <h1 className="mt-8 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
            Find someone who
            <span className="text-primary"> actually </span>
            fits your lifestyle
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            Paire matches roommates on the things that matter — budget,
            cleanliness, schedule, and social habits. Not just a photo and a zip code.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="w-full rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full px-8"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/50 px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-12 space-y-10">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true, margin: "-40px" }}
                className="flex gap-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold tabular-nums text-primary">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Built for how people actually find roommates
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            We studied SpareRoom, Roomster, Diggz, Hinge, and Bumble — then built something better.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                viewport={{ once: true, margin: "-20px" }}
                className="rounded-2xl border border-border/50 bg-background p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight">
            Stop scrolling Craigslist
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Paire is free to use. Create a profile in 3 minutes and start
            matching with compatible roommates today.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Logo size={16} />
          <span>Paire</span>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ArrowRight, Heart, MessageCircle, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Heart,
    title: "Smart Matching",
    description: "Swipe through compatible roommates based on lifestyle, budget, and location.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Chat instantly with your matches to get to know them before moving in.",
  },
  {
    icon: Shield,
    title: "Safe & Verified",
    description: "Verified profiles and secure messaging for peace of mind.",
  },
  {
    icon: Sparkles,
    title: "Lifestyle Fit",
    description: "Match on cleanliness, noise, sleep schedule, pets, and more.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background gradient */}
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
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Find Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}
              Perfect
            </span>{" "}
            Roommate
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Swipe, match, and connect with compatible roommates in your area.
            Move-in ready, stress-free.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="w-full rounded-full bg-purple-600 px-8 hover:bg-purple-700"
              >
                Get Started
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
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-border/40 bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold">
            Why Paire?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
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

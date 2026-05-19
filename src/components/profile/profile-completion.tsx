"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { User } from "@/types/database";
import { cn } from "@/lib/utils";

interface ProfileCompletionProps {
  user: User;
  compact?: boolean;
}

interface CompletionItem {
  label: string;
  complete: boolean;
}

export function calculateProfileCompletion(user: User): {
  percentage: number;
  items: CompletionItem[];
} {
  const items: CompletionItem[] = [
    { label: "Name", complete: !!user.name },
    { label: "Age", complete: !!user.age },
    { label: "Bio", complete: !!user.bio && user.bio.length > 10 },
    { label: "Location", complete: !!user.location },
    { label: "Budget", complete: !!user.budget_min && !!user.budget_max },
    { label: "Move-in date", complete: !!user.move_in_date },
    { label: "Lifestyle preferences", complete: !!user.lifestyle },
    { label: "Profile prompts", complete: !!user.prompts && user.prompts.length >= 2 },
    { label: "Profile photo", complete: !!user.avatar_url },
  ];

  const completed = items.filter((i) => i.complete).length;
  const percentage = Math.round((completed / items.length) * 100);

  return { percentage, items };
}

export function ProfileCompletion({ user, compact = false }: ProfileCompletionProps) {
  const { percentage, items } = calculateProfileCompletion(user);
  const incomplete = items.filter((i) => !i.complete);

  if (percentage === 100) {
    if (compact) return null;
    return (
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-900/20">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Profile complete!
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Profile {percentage}% complete
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border/50 bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold">Complete your profile</span>
        </div>
        <span className="text-sm font-bold tabular-nums text-primary">{percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {incomplete.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Still needed:</p>
          <div className="flex flex-wrap gap-1.5">
            {incomplete.map((item) => (
              <span
                key={item.label}
                className={cn(
                  "rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700",
                  "dark:bg-amber-900/20 dark:text-amber-400"
                )}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

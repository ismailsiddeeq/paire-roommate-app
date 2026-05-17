"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ICEBREAKER_SUGGESTIONS } from "@/types/database";

interface IcebreakerSuggestionsProps {
  onSelect: (message: string) => void;
  matchName?: string;
}

export function IcebreakerSuggestions({
  onSelect,
  matchName,
}: IcebreakerSuggestionsProps) {
  const suggestions = ICEBREAKER_SUGGESTIONS.slice(0, 4);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-3 px-1"
    >
      <div className="flex items-center gap-2 text-center">
        <div className="h-px flex-1 bg-border/50" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-purple-500" />
          <span>Break the ice with {matchName ?? "your match"}</span>
        </div>
        <div className="h-px flex-1 bg-border/50" />
      </div>
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={i}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            onClick={() => onSelect(suggestion)}
            className="rounded-2xl border border-purple-200 bg-purple-50/50 px-4 py-2.5 text-left text-sm text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-100/70 active:scale-[0.98] dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

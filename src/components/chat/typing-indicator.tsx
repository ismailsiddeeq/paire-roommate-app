"use client";

import { motion } from "framer-motion";

interface TypingIndicatorProps {
  name?: string;
}

export function TypingIndicator({ name }: TypingIndicatorProps) {
  return (
    <div className="flex items-end gap-2">
      <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      {name && (
        <span className="mb-1 text-[10px] text-muted-foreground">
          {name} is typing
        </span>
      )}
    </div>
  );
}

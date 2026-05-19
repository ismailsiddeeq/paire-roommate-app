"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSend: (content: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-border/40 bg-background/80 p-3 backdrop-blur-xl"
    >
      <div className="flex flex-1 items-end rounded-2xl border border-border bg-background px-4 py-2.5">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="max-h-24 w-full resize-none bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        />
      </div>
      <AnimatePresence>
        {value.trim() && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

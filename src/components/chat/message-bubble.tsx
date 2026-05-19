"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import type { Message } from "@/types/database";

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
}

export function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const time = new Date(message.created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn("flex", isMine ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isMine
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground"
        )}
      >
        <p className="text-[15px] leading-relaxed">{message.content}</p>
        <div
          className={cn(
            "mt-0.5 flex items-center justify-end gap-1",
            isMine ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          <span className="text-[10px]">{time}</span>
          {isMine &&
            (message.read_at ? (
              <CheckCheck className="h-3 w-3" />
            ) : (
              <Check className="h-3 w-3" />
            ))}
        </div>
      </div>
    </motion.div>
  );
}

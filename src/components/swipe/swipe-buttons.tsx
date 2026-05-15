"use client";

import { motion } from "framer-motion";
import { X, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike?: () => void;
  disabled?: boolean;
}

export function SwipeButtons({
  onPass,
  onLike,
  onSuperLike,
  disabled,
}: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={onPass}
        disabled={disabled}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 bg-white shadow-lg transition-colors hover:bg-red-50 dark:border-red-800 dark:bg-card dark:hover:bg-red-950",
          disabled && "opacity-50"
        )}
      >
        <X className="h-7 w-7 text-red-500" strokeWidth={3} />
      </motion.button>

      {onSuperLike && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={onSuperLike}
          disabled={disabled}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-200 bg-white shadow-lg transition-colors hover:bg-blue-50 dark:border-blue-800 dark:bg-card dark:hover:bg-blue-950",
            disabled && "opacity-50"
          )}
        >
          <Star className="h-5 w-5 text-blue-500" strokeWidth={2.5} />
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={onLike}
        disabled={disabled}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-white shadow-lg transition-colors hover:bg-green-50 dark:border-green-800 dark:bg-card dark:hover:bg-green-950",
          disabled && "opacity-50"
        )}
      >
        <Heart className="h-7 w-7 text-green-500" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

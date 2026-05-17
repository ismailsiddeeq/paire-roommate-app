"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompatibilityBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function CompatibilityBadge({
  score,
  size = "md",
  showLabel = false,
}: CompatibilityBadgeProps) {
  const radius = size === "sm" ? 16 : size === "md" ? 22 : 30;
  const strokeWidth = size === "sm" ? 3 : size === "md" ? 3.5 : 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  const color =
    score >= 85
      ? "#10b981"
      : score >= 70
        ? "#22c55e"
        : score >= 55
          ? "#3b82f6"
          : score >= 40
            ? "#eab308"
            : "#f97316";

  const fontSize = size === "sm" ? "text-[10px]" : size === "md" ? "text-xs" : "text-sm";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="-rotate-90"
        >
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center font-bold",
            fontSize
          )}
          style={{ color }}
        >
          {score}%
        </div>
      </div>
      {showLabel && (
        <span className="text-[10px] font-medium text-muted-foreground">
          Match
        </span>
      )}
    </div>
  );
}

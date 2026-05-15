"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  transparent?: boolean;
}

export function Header({
  title,
  left,
  right,
  className,
  transparent,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between px-4",
        transparent
          ? "bg-transparent"
          : "border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex w-16 items-center">{left}</div>
      {title && (
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      )}
      <div className="flex w-16 items-center justify-end">{right}</div>
    </header>
  );
}

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/swipe/compatibility-badge";
import { VerificationBadge } from "@/components/profile/verification-badge";
import { cn } from "@/lib/utils";
import type { UserWithPhotos, User, LifestylePreferences } from "@/types/database";
import { calculateCompatibility } from "@/lib/compatibility";

interface SwipeCardProps {
  user: UserWithPhotos;
  currentUser?: User | null;
  onSwipe: (direction: "like" | "pass" | "superlike") => void;
  onTapExpand?: () => void;
  isTop?: boolean;
}

const SWIPE_THRESHOLD = 100;

export function SwipeCard({ user, currentUser, onSwipe, onTapExpand, isTop = false }: SwipeCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);

  const photos =
    user.profile_photos?.length > 0
      ? user.profile_photos.sort((a, b) => a.order_index - b.order_index)
      : [];

  const lifestyle = user.lifestyle as LifestylePreferences;
  const photoUrl =
    photos[photoIndex]?.image_url ??
    user.avatar_url ??
    `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`;

  const compatibility = currentUser
    ? calculateCompatibility(currentUser, user)
    : null;

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > SWIPE_THRESHOLD) {
        onSwipe("like");
      } else if (info.offset.x < -SWIPE_THRESHOLD) {
        onSwipe("pass");
      }
    },
    [onSwipe]
  );

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < photos.length - 1) setPhotoIndex((i) => i + 1);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) setPhotoIndex((i) => i - 1);
  };

  const budgetStr =
    user.budget_min && user.budget_max
      ? `$${user.budget_min} - $${user.budget_max}`
      : user.budget_min
        ? `$${user.budget_min}+`
        : user.budget_max
          ? `Up to $${user.budget_max}`
          : null;

  const [now] = useState(() => Date.now());

  const activeLabel = user.last_active
    ? getActivityLabel(user.last_active, now)
    : null;

  return (
    <motion.div
      className={cn(
        "absolute inset-0 cursor-grab select-none overflow-hidden rounded-3xl bg-card shadow-2xl active:cursor-grabbing",
        !isTop && "pointer-events-none"
      )}
      style={{ x, rotate, zIndex: isTop ? 10 : 5 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 1 } : { scale: 0.95, y: 12 }}
      animate={isTop ? { scale: 1, y: 0 } : { scale: 0.95, y: 12 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      {/* Photo */}
      <div className="relative h-[65%] w-full overflow-hidden bg-muted">
        <Image
          src={photoUrl}
          alt={user.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={isTop}
          unoptimized
        />

        {/* Photo nav dots */}
        {photos.length > 1 && (
          <div className="absolute left-0 right-0 top-3 flex justify-center gap-1 px-4">
            {photos.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors",
                  i === photoIndex
                    ? "bg-white"
                    : "bg-white/40"
                )}
              />
            ))}
          </div>
        )}

        {/* Photo nav buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-0 top-0 flex h-full w-1/3 items-center justify-start pl-2"
            >
              {photoIndex > 0 && (
                <ChevronLeft className="h-6 w-6 text-white drop-shadow" />
              )}
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-0 top-0 flex h-full w-1/3 items-center justify-end pr-2"
            >
              {photoIndex < photos.length - 1 && (
                <ChevronRight className="h-6 w-6 text-white drop-shadow" />
              )}
            </button>
          </>
        )}

        {/* Compatibility badge (top-right) */}
        {compatibility && (
          <div className="absolute right-3 top-8">
            <CompatibilityBadge
              score={compatibility.overall}
              size="sm"
              showLabel
            />
          </div>
        )}

        {/* Active indicator */}
        {activeLabel && (
          <div className="absolute left-3 top-8">
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm",
              activeLabel.isOnline
                ? "bg-emerald-500/20 text-emerald-200"
                : "bg-black/30 text-white/70"
            )}>
              {activeLabel.isOnline && (
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
              {activeLabel.text}
            </div>
          </div>
        )}

        {/* Like/Pass overlays */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-green-500/20"
          style={{ opacity: likeOpacity }}
        >
          <div className="rotate-[-20deg] rounded-lg border-4 border-green-500 px-6 py-2">
            <span className="text-4xl font-black text-green-500">LIKE</span>
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-red-500/20"
          style={{ opacity: passOpacity }}
        >
          <div className="rotate-[20deg] rounded-lg border-4 border-red-500 px-6 py-2">
            <span className="text-4xl font-black text-red-500">NOPE</span>
          </div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              {user.name}
              {user.age && (
                <span className="ml-2 font-normal opacity-80">{user.age}</span>
              )}
            </h2>
            <VerificationBadge verification={user.verification} size="sm" />
          </div>
          {user.location && (
            <div className="mt-0.5 flex items-center gap-1 text-sm opacity-80">
              <MapPin className="h-3.5 w-3.5" />
              {user.location}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex h-[35%] flex-col gap-3 p-4">
        {/* Hinge-style prompt preview */}
        {user.prompts && user.prompts.length > 0 ? (
          <div className="rounded-xl bg-primary/[0.06] px-3 py-2">
            <p className="text-[10px] font-semibold text-primary">
              {user.prompts[0].question}
            </p>
            <p className="mt-0.5 line-clamp-2 text-sm">
              {user.prompts[0].answer}
            </p>
          </div>
        ) : user.bio ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {user.bio}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-1.5">
          {budgetStr && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <DollarSign className="h-3 w-3" />
              {budgetStr}
            </Badge>
          )}
          {lifestyle?.sleep_schedule && (
            <Badge variant="secondary" className="gap-1 text-xs">
              {lifestyle.sleep_schedule === "early_bird" ? (
                <Sun className="h-3 w-3" />
              ) : (
                <Moon className="h-3 w-3" />
              )}
              {lifestyle.sleep_schedule === "early_bird"
                ? "Early Bird"
                : lifestyle.sleep_schedule === "night_owl"
                  ? "Night Owl"
                  : "Flexible"}
            </Badge>
          )}
          {lifestyle?.work_from_home && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Briefcase className="h-3 w-3" />
              WFH
            </Badge>
          )}
          {lifestyle?.smoking === "no" && (
            <Badge variant="secondary" className="text-xs">
              🚭 Non-smoker
            </Badge>
          )}
          {lifestyle?.pets === "yes" && (
            <Badge variant="secondary" className="text-xs">
              🐾 Has pets
            </Badge>
          )}
        </div>

        {/* Tap to expand */}
        {onTapExpand && (
          <button
            onClick={(e) => { e.stopPropagation(); onTapExpand(); }}
            className="mt-auto flex items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronUp className="h-3.5 w-3.5" />
            Tap for full profile
          </button>
        )}
      </div>
    </motion.div>
  );
}

function getActivityLabel(dateStr: string, nowMs: number): { text: string; isOnline: boolean } {
  const date = new Date(dateStr);
  const diffMs = nowMs - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 5) return { text: "Online", isOnline: true };
  if (diffMins < 60) return { text: `${diffMins}m ago`, isOnline: false };
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return { text: `${diffHours}h ago`, isOnline: false };
  return { text: "Recently active", isOnline: false };
}

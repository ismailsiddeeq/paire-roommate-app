"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  DollarSign,
  Calendar,
  Moon,
  Sun,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Home,
  Volume2,
  Users,
  Dog,
  Cigarette,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/swipe/compatibility-badge";
import { VerificationBadge } from "@/components/profile/verification-badge";
import { calculateCompatibility, getCompatibilityLabel } from "@/lib/compatibility";
import type { UserWithPhotos, User, LifestylePreferences, ProfilePrompt } from "@/types/database";
import { cn } from "@/lib/utils";

interface ProfileDetailSheetProps {
  user: UserWithPhotos;
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: () => void;
  onPass?: () => void;
  onSuperLike?: () => void;
}

export function ProfileDetailSheet({
  user,
  currentUser,
  isOpen,
  onClose,
  onLike,
  onPass,
  onSuperLike,
}: ProfileDetailSheetProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [now] = useState(() => Date.now());

  const photos =
    user.profile_photos?.length > 0
      ? user.profile_photos.sort((a, b) => a.order_index - b.order_index)
      : [];

  const photoUrl =
    photos[photoIndex]?.image_url ??
    user.avatar_url ??
    `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`;

  const lifestyle = user.lifestyle as LifestylePreferences;
  const prompts = (user.prompts ?? []) as ProfilePrompt[];
  const compatibility = currentUser
    ? calculateCompatibility(currentUser, user)
    : null;
  const compatLabel = compatibility
    ? getCompatibilityLabel(compatibility.overall)
    : null;

  const budgetStr =
    user.budget_min && user.budget_max
      ? `$${user.budget_min} - $${user.budget_max}/mo`
      : user.budget_min
        ? `$${user.budget_min}+/mo`
        : user.budget_max
          ? `Up to $${user.budget_max}/mo`
          : null;

  const lifestyleItems = [
    {
      icon: Home,
      label: "Cleanliness",
      value: lifestyle?.cleanliness
        ? `${lifestyle.cleanliness}/5`
        : null,
    },
    {
      icon: Volume2,
      label: "Noise Level",
      value: lifestyle?.noise_level
        ? `${lifestyle.noise_level}/5`
        : null,
    },
    {
      icon: Users,
      label: "Social",
      value: lifestyle?.social_level
        ? `${lifestyle.social_level}/5`
        : null,
    },
    {
      icon: lifestyle?.sleep_schedule === "early_bird" ? Sun : Moon,
      label: "Sleep",
      value: lifestyle?.sleep_schedule
        ? lifestyle.sleep_schedule === "early_bird"
          ? "Early Bird"
          : lifestyle.sleep_schedule === "night_owl"
            ? "Night Owl"
            : "Flexible"
        : null,
    },
    {
      icon: Dog,
      label: "Pets",
      value: lifestyle?.pets
        ? lifestyle.pets === "yes"
          ? "Has pets"
          : lifestyle.pets === "no"
            ? "No pets"
            : "Depends"
        : null,
    },
    {
      icon: Cigarette,
      label: "Smoking",
      value: lifestyle?.smoking
        ? lifestyle.smoking === "no"
          ? "Non-smoker"
          : lifestyle.smoking === "outside_only"
            ? "Outside only"
            : "Smoker"
        : null,
    },
  ].filter((item) => item.value !== null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-x-0 bottom-0 top-8 overflow-hidden rounded-t-3xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full overflow-y-auto pb-24">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Photo gallery */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={photoUrl}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />

                {photos.length > 1 && (
                  <>
                    <div className="absolute left-0 right-0 top-3 flex justify-center gap-1 px-4">
                      {photos.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-0.5 flex-1 rounded-full transition-colors",
                            i === photoIndex ? "bg-white" : "bg-white/40"
                          )}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => photoIndex > 0 && setPhotoIndex((i) => i - 1)}
                      className="absolute left-0 top-0 flex h-full w-1/3 items-center justify-start pl-2"
                    >
                      {photoIndex > 0 && (
                        <ChevronLeft className="h-6 w-6 text-white drop-shadow" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        photoIndex < photos.length - 1 &&
                        setPhotoIndex((i) => i + 1)
                      }
                      className="absolute right-0 top-0 flex h-full w-1/3 items-center justify-end pr-2"
                    >
                      {photoIndex < photos.length - 1 && (
                        <ChevronRight className="h-6 w-6 text-white drop-shadow" />
                      )}
                    </button>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold text-white">
                          {user.name}
                          {user.age && (
                            <span className="ml-2 text-2xl font-normal opacity-80">
                              {user.age}
                            </span>
                          )}
                        </h2>
                        <VerificationBadge verification={user.verification} size="md" />
                      </div>
                      {user.location && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-white/80">
                          <MapPin className="h-3.5 w-3.5" />
                          {user.location}
                        </div>
                      )}
                    </div>
                    {compatibility && (
                      <CompatibilityBadge
                        score={compatibility.overall}
                        size="lg"
                        showLabel
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-5 py-5">
                {/* Compatibility breakdown */}
                {compatibility && compatLabel && (
                  <div className="space-y-3 rounded-2xl bg-primary/[0.05] p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className={cn("text-sm font-semibold", compatLabel.color)}>
                        {compatLabel.label} — {compatibility.overall}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Budget", value: compatibility.budget },
                        { label: "Cleanliness", value: compatibility.cleanliness },
                        { label: "Schedule", value: compatibility.schedule },
                        { label: "Social", value: compatibility.social },
                        { label: "Lifestyle", value: compatibility.lifestyle },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div className="text-lg font-bold text-foreground">
                            {item.value}%
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {user.bio && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                      About
                    </h3>
                    <p className="text-sm leading-relaxed">{user.bio}</p>
                  </div>
                )}

                {/* Prompts (Hinge-style) */}
                {prompts.length > 0 && (
                  <div className="space-y-3">
                    {prompts.map((prompt, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-border/50 bg-card p-4"
                      >
                        <p className="text-xs font-semibold text-primary">
                          {prompt.question}
                        </p>
                        <p className="mt-1.5 text-sm">{prompt.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2">
                  {budgetStr && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <DollarSign className="h-3 w-3" />
                      {budgetStr}
                    </Badge>
                  )}
                  {user.move_in_date && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      {new Date(user.move_in_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </Badge>
                  )}
                  {lifestyle?.work_from_home && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Briefcase className="h-3 w-3" />
                      Works from home
                    </Badge>
                  )}
                </div>

                {/* Lifestyle breakdown */}
                {lifestyleItems.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                      Lifestyle
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {lifestyleItems.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2.5"
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-xs font-medium">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification details */}
                <VerificationBadge
                  verification={user.verification}
                  showDetails
                />

                {/* Last active */}
                {user.last_active && (
                  <p className="text-center text-xs text-muted-foreground">
                    Active{" "}
                    {getRelativeTime(user.last_active, now)}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom action buttons */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 border-t border-border/40 bg-background/90 px-6 py-4 backdrop-blur-xl">
              {onPass && (
                <button
                  onClick={() => { onPass(); onClose(); }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 bg-white text-red-500 shadow-sm transition-all hover:scale-105 hover:border-red-300 hover:shadow-md active:scale-95 dark:bg-card"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
              {onSuperLike && (
                <button
                  onClick={() => { onSuperLike(); onClose(); }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-500 shadow-sm transition-all hover:scale-105 hover:border-blue-300 hover:shadow-md active:scale-95 dark:bg-card"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              )}
              {onLike && (
                <button
                  onClick={() => { onLike(); onClose(); }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-white text-green-500 shadow-sm transition-all hover:scale-105 hover:border-green-300 hover:shadow-md active:scale-95 dark:bg-card"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getRelativeTime(dateStr: string, nowMs: number): string {
  const date = new Date(dateStr);
  const diffMs = nowMs - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

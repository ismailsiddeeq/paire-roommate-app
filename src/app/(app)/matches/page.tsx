"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { useMatches } from "@/hooks/use-matches";
import { useAuthStore } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/swipe/compatibility-badge";
import { calculateCompatibility } from "@/lib/compatibility";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function isRecentlyOnline(lastActive: string | null, now: number): boolean {
  if (!lastActive) return false;
  return now - new Date(lastActive).getTime() < 5 * 60 * 1000;
}

export default function MatchesPage() {
  const { matches, isLoading } = useMatches();
  const { user } = useAuthStore();
  const [now] = useState(() => Date.now());

  const newMatches = matches.filter((m) => !m.lastMessage);
  const conversations = matches.filter((m) => m.lastMessage);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header title="Matches" />

      <div className="flex-1 px-4 py-4">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-full" />
              ))}
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        ) : matches.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 pt-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
              <Heart className="h-10 w-10 text-pink-500" />
            </div>
            <h2 className="text-xl font-semibold">No matches yet</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              Keep swiping to find your perfect roommate. You&apos;ll see your
              matches here!
            </p>
          </div>
        ) : (
          <>
            {/* New Matches */}
            {newMatches.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
                  New Matches
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {newMatches.map((m, i) => {
                    const compat = user
                      ? calculateCompatibility(user, m.otherUser)
                      : null;
                    const isOnline = isRecentlyOnline(m.otherUser.last_active ?? null, now);

                    return (
                      <motion.div
                        key={m.match.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={`/chat/${m.match.id}`}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div className="relative">
                            <Avatar className="h-18 w-18 border-2 border-purple-400">
                              <AvatarImage
                                src={
                                  m.otherUser.avatar_url ??
                                  `https://api.dicebear.com/9.x/notionists/svg?seed=${m.otherUser.id}`
                                }
                              />
                              <AvatarFallback>
                                {m.otherUser.name?.[0] ?? "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white">
                              <Heart className="h-3 w-3 fill-current" />
                            </div>
                            {isOnline && (
                              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                            )}
                          </div>
                          <span className="max-w-[72px] truncate text-xs font-medium">
                            {m.otherUser.name}
                          </span>
                          {compat && (
                            <span className="text-[9px] font-semibold text-purple-600">
                              {compat.overall}% match
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conversations */}
            {conversations.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
                  Messages
                </h2>
                <div className="space-y-1">
                  {conversations.map((m) => {
                    const compat = user
                      ? calculateCompatibility(user, m.otherUser)
                      : null;
                    const isOnline = isRecentlyOnline(m.otherUser.last_active ?? null, now);

                    return (
                      <Link
                        key={m.match.id}
                        href={`/chat/${m.match.id}`}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={
                                m.otherUser.avatar_url ??
                                `https://api.dicebear.com/9.x/notionists/svg?seed=${m.otherUser.id}`
                              }
                            />
                            <AvatarFallback>
                              {m.otherUser.name?.[0] ?? "?"}
                            </AvatarFallback>
                          </Avatar>
                          {isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{m.otherUser.name}</h3>
                            {m.lastMessage && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(
                                  m.lastMessage.created_at
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                          {m.lastMessage && (
                            <p className="truncate text-sm text-muted-foreground">
                              {m.lastMessage.content}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {compat && (
                            <CompatibilityBadge
                              score={compat.overall}
                              size="sm"
                            />
                          )}
                          {m.unreadCount > 0 && (
                            <Badge className="h-5 min-w-[20px] rounded-full bg-purple-600 px-1.5 text-[10px]">
                              {m.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

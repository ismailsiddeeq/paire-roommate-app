"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Logo } from "@/components/layout/logo";
import { SwipeCard } from "@/components/swipe/swipe-card";
import { SwipeButtons } from "@/components/swipe/swipe-buttons";
import { MatchModal } from "@/components/swipe/match-modal";
import { ProfileDetailSheet } from "@/components/swipe/profile-detail-sheet";
import { FilterDrawer } from "@/components/profile/filter-drawer";
import { useDiscovery } from "@/hooks/use-discovery";
import { useAuthStore } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass } from "lucide-react";
import type { UserWithPhotos } from "@/types/database";

export default function DiscoverPage() {
  const { currentProfile, nextProfile, isLoading, swipe, isEmpty } =
    useDiscovery();
  const { user } = useAuthStore();
  const [matchModal, setMatchModal] = useState<{
    isOpen: boolean;
    user: UserWithPhotos | null;
    matchId?: string;
  }>({ isOpen: false, user: null });
  const [detailProfile, setDetailProfile] = useState<UserWithPhotos | null>(null);

  const handleSwipe = async (direction: "like" | "pass" | "superlike") => {
    const result = await swipe(direction);
    if (result?.isMatch) {
      setMatchModal({
        isOpen: true,
        user: result.target,
      });
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <Header
        left={<Logo size={28} />}
        title="Discover"
        right={<FilterDrawer />}
      />

      <div className="relative flex flex-1 flex-col items-center px-4 pb-4">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-3xl" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="h-11 w-11 rounded-full" />
                <Skeleton className="h-14 w-14 rounded-full" />
              </div>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Compass className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">
              You&apos;ve seen everyone!
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              No more profiles right now. Check back later or adjust your
              filters to discover more people.
            </p>
          </div>
        ) : (
          <>
            <div className="relative mt-2 aspect-[3/4.5] w-full max-w-sm flex-1">
              <AnimatePresence>
                {nextProfile && (
                  <SwipeCard
                    key={nextProfile.id}
                    user={nextProfile}
                    currentUser={user}
                    onSwipe={() => {}}
                  />
                )}
                {currentProfile && (
                  <SwipeCard
                    key={currentProfile.id}
                    user={currentProfile}
                    currentUser={user}
                    onSwipe={handleSwipe}
                    onTapExpand={() => setDetailProfile(currentProfile)}
                    isTop
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 pb-2">
              <SwipeButtons
                onPass={() => handleSwipe("pass")}
                onLike={() => handleSwipe("like")}
                onSuperLike={() => handleSwipe("superlike")}
                disabled={!currentProfile}
              />
            </div>
          </>
        )}
      </div>

      <MatchModal
        isOpen={matchModal.isOpen}
        onClose={() => setMatchModal({ isOpen: false, user: null })}
        matchedUser={matchModal.user}
        matchId={matchModal.matchId}
      />

      {/* Full profile detail sheet */}
      {currentProfile && (
        <ProfileDetailSheet
          user={currentProfile}
          currentUser={user}
          isOpen={!!detailProfile}
          onClose={() => setDetailProfile(null)}
          onLike={() => handleSwipe("like")}
          onPass={() => handleSwipe("pass")}
          onSuperLike={() => handleSwipe("superlike")}
        />
      )}
    </div>
  );
}

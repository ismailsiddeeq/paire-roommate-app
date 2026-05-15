"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscoveryStore } from "@/stores/discovery-store";
import type { UserWithPhotos } from "@/types/database";

export function useDiscovery() {
  const [profiles, setProfiles] = useState<UserWithPhotos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuthStore();
  const { filters } = useDiscoveryStore();
  const supabase = createClient();

  const fetchProfiles = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    const { data: swipedIds } = await supabase
      .from("swipes")
      .select("target_id")
      .eq("swiper_id", user.id);

    const excludeIds = [
      user.id,
      ...(swipedIds?.map((s) => s.target_id) ?? []),
    ];

    let query = supabase
      .from("users")
      .select("*, profile_photos(*)")
      .eq("onboarding_complete", true)
      .not("id", "in", `(${excludeIds.join(",")})`)
      .order("created_at", { ascending: false })
      .limit(20);

    if (filters.budget_min) {
      query = query.gte("budget_max", filters.budget_min);
    }
    if (filters.budget_max) {
      query = query.lte("budget_min", filters.budget_max);
    }
    if (filters.min_age) {
      query = query.gte("age", filters.min_age);
    }
    if (filters.max_age) {
      query = query.lte("age", filters.max_age);
    }
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }

    const { data } = await query;
    setProfiles((data as UserWithPhotos[]) ?? []);
    setCurrentIndex(0);
    setIsLoading(false);
  }, [user, filters, supabase]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const swipe = async (direction: "like" | "pass") => {
    if (!user || currentIndex >= profiles.length) return null;

    const target = profiles[currentIndex];

    await supabase.from("swipes").insert({
      swiper_id: user.id,
      target_id: target.id,
      direction,
    });

    let isMatch = false;
    if (direction === "like") {
      const { data: mutual } = await supabase
        .from("swipes")
        .select("id")
        .eq("swiper_id", target.id)
        .eq("target_id", user.id)
        .eq("direction", "like")
        .maybeSingle();

      isMatch = !!mutual;
    }

    setCurrentIndex((prev) => prev + 1);

    if (currentIndex >= profiles.length - 3) {
      fetchProfiles();
    }

    return { isMatch, target };
  };

  return {
    profiles,
    currentProfile: profiles[currentIndex] ?? null,
    nextProfile: profiles[currentIndex + 1] ?? null,
    isLoading,
    swipe,
    refresh: fetchProfiles,
    isEmpty: !isLoading && currentIndex >= profiles.length,
  };
}

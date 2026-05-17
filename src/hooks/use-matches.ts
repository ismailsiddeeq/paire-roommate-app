"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { Match, User, Message } from "@/types/database";

export interface MatchWithUser {
  match: Match;
  otherUser: User;
  lastMessage?: Message;
  unreadCount: number;
}

export function useMatches() {
  const [matches, setMatches] = useState<MatchWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  const fetchMatches = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    const { data: matchData } = await supabase
      .from("matches")
      .select(
        `
        *,
        user1:users!matches_user1_id_fkey(*),
        user2:users!matches_user2_id_fkey(*)
      `
      )
      .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!matchData) {
      setIsLoading(false);
      return;
    }

    const matchesWithMessages: MatchWithUser[] = await Promise.all(
      matchData.map(async (match) => {
        const otherUser =
          match.user1_id === user.id ? match.user2 : match.user1;

        const { data: lastMsg } = await supabase
          .from("messages")
          .select("*")
          .eq("match_id", match.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("match_id", match.id)
          .neq("sender_id", user.id)
          .is("read_at", null);

        return {
          match,
          otherUser: otherUser as User,
          lastMessage: lastMsg as Message | undefined,
          unreadCount: count ?? 0,
        };
      })
    );

    setMatches(matchesWithMessages);
    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async data fetch, setState after await
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "matches",
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase, fetchMatches]);

  return { matches, isLoading, refresh: fetchMatches };
}

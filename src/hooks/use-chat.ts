"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { Message } from "@/types/database";

export function useChat(matchId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("match_id", matchId)
      .order("created_at", { ascending: true });

    setMessages((data as Message[]) ?? []);
    setIsLoading(false);
  }, [matchId, supabase]);

  const markAsRead = useCallback(async () => {
    if (!user) return;
    await supabase
      .from("messages")
      .update({ read_at: new Date().toISOString() })
      .eq("match_id", matchId)
      .neq("sender_id", user.id)
      .is("read_at", null);
  }, [matchId, user, supabase]);

  useEffect(() => {
    fetchMessages();
    markAsRead();
  }, [fetchMessages, markAsRead]);

  useEffect(() => {
    const channel = supabase
      .channel(`chat-${matchId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
          if (newMessage.sender_id !== user?.id) {
            markAsRead();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId, user, supabase, markAsRead]);

  const sendMessage = async (content: string) => {
    if (!user) return;
    await supabase.from("messages").insert({
      match_id: matchId,
      sender_id: user.id,
      content,
    });
  };

  return { messages, isLoading, sendMessage };
}

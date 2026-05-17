"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/hooks/use-chat";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { IcebreakerSuggestions } from "@/components/chat/icebreaker-suggestions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import type { User, Match } from "@/types/database";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;
  const { messages, isLoading, sendMessage } = useChat(matchId);
  const { user } = useAuthStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [now] = useState(() => Date.now());

  const supabase = createClient();

  useEffect(() => {
    const fetchMatch = async () => {
      const { data } = await supabase
        .from("matches")
        .select(
          `
          *,
          user1:users!matches_user1_id_fkey(*),
          user2:users!matches_user2_id_fkey(*)
        `
        )
        .eq("id", matchId)
        .single();

      if (data) {
        const match = data as Match & { user1: User; user2: User };
        setOtherUser(
          match.user1_id === user?.id ? match.user2 : match.user1
        );
      }
    };
    if (user) fetchMatch();
  }, [matchId, user, supabase]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender_id !== user?.id) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing typing indicator on new message arrival
        setIsTyping(false);
      }
    }
  }, [messages, user?.id]);

  const handleSend = (content: string) => {
    sendMessage(content);
    // Brief simulated typing after you send
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timeout);
  };

  const activeLabel = otherUser?.last_active
    ? getActivityText(otherUser.last_active, now)
    : null;

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-border/40 bg-background/80 px-3 py-3 backdrop-blur-xl">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="relative">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                otherUser?.avatar_url ??
                `https://api.dicebear.com/9.x/notionists/svg?seed=${otherUser?.id ?? "x"}`
              }
            />
            <AvatarFallback>{otherUser?.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          {/* Online dot */}
          {activeLabel?.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          )}
        </div>
        <div>
          <h2 className="text-sm font-semibold">
            {otherUser?.name ?? "Loading..."}
          </h2>
          <p className="text-[10px] text-muted-foreground">
            {activeLabel?.text ?? otherUser?.location ?? ""}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <Skeleton className="h-10 w-48 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div>
              <Avatar className="mx-auto h-16 w-16">
                <AvatarImage
                  src={
                    otherUser?.avatar_url ??
                    `https://api.dicebear.com/9.x/notionists/svg?seed=${otherUser?.id ?? "x"}`
                  }
                />
                <AvatarFallback>{otherUser?.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
              <p className="mt-3 text-sm text-muted-foreground">
                You matched with {otherUser?.name ?? "someone"}!<br />
                Send the first message to start chatting.
              </p>
            </div>
            <IcebreakerSuggestions
              onSelect={handleSend}
              matchName={otherUser?.name ?? undefined}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isMine={msg.sender_id === user?.id}
              />
            ))}
            {isTyping && <TypingIndicator name={otherUser?.name ?? undefined} />}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

function getActivityText(dateStr: string, nowMs: number): { text: string; isOnline: boolean } {
  const date = new Date(dateStr);
  const diffMs = nowMs - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 5) return { text: "Online now", isOnline: true };
  if (diffMins < 60) return { text: `Active ${diffMins}m ago`, isOnline: false };
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return { text: `Active ${diffHours}h ago`, isOnline: false };
  return { text: "Recently active", isOnline: false };
}

"use client";

import { Header } from "@/components/layout/header";
import { useMatches } from "@/hooks/use-matches";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ChatListPage() {
  const { matches, isLoading } = useMatches();

  const withMessages = matches.filter((m) => m.lastMessage);
  const noMessages = matches.filter((m) => !m.lastMessage);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header title="Chat" />

      <div className="flex-1 px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 pt-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <MessageCircle className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">No chats yet</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              Match with someone first, then start chatting here!
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Active conversations first */}
            {withMessages.map((m) => (
              <Link
                key={m.match.id}
                href={`/chat/${m.match.id}`}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-muted/50"
              >
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
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${m.unreadCount > 0 ? "font-semibold" : ""}`}
                    >
                      {m.otherUser.name}
                    </h3>
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
                    <p
                      className={`truncate text-sm ${m.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      {m.lastMessage.content}
                    </p>
                  )}
                </div>
                {m.unreadCount > 0 && (
                  <Badge className="h-5 min-w-[20px] rounded-full bg-purple-600 px-1.5 text-[10px]">
                    {m.unreadCount}
                  </Badge>
                )}
              </Link>
            ))}

            {/* Matches without messages */}
            {noMessages.length > 0 && (
              <>
                <div className="px-3 py-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Say hi!
                  </p>
                </div>
                {noMessages.map((m) => (
                  <Link
                    key={m.match.id}
                    href={`/chat/${m.match.id}`}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-muted/50"
                  >
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
                    <div className="flex-1">
                      <h3 className="font-medium">{m.otherUser.name}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        New match — say hello! 👋
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { UserWithPhotos } from "@/types/database";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUser: UserWithPhotos | null;
  matchId?: string;
}

export function MatchModal({
  isOpen,
  onClose,
  matchedUser,
  matchId,
}: MatchModalProps) {
  const router = useRouter();

  if (!matchedUser) return null;

  const photoUrl =
    matchedUser.profile_photos?.[0]?.image_url ??
    matchedUser.avatar_url ??
    `https://api.dicebear.com/9.x/notionists/svg?seed=${matchedUser.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative mx-4 flex w-full max-w-sm flex-col items-center rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Confetti-like particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"][
                    i % 4
                  ],
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  x: Math.cos((i * 30 * Math.PI) / 180) * 120,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 120,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-5xl"
            >
              🎉
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-3xl font-bold"
            >
              It&apos;s a Match!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center text-sm text-white/80"
            >
              You and {matchedUser.name} both liked each other
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative mt-6 h-28 w-28 overflow-hidden rounded-full border-4 border-white/30 shadow-xl"
            >
              <Image
                src={photoUrl}
                alt={matchedUser.name}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex w-full flex-col gap-2"
            >
              <Button
                size="lg"
                className="w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={() => {
                  if (matchId) {
                    router.push(`/chat/${matchId}`);
                  }
                  onClose();
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send a message
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="w-full rounded-full text-white hover:bg-white/10"
                onClick={onClose}
              >
                Keep swiping
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

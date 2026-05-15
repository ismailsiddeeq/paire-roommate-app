"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Edit,
  LogOut,
  Moon,
  Shield,
  MapPin,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import type { LifestylePreferences } from "@/types/database";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  if (!user) return null;

  const lifestyle = user.lifestyle as LifestylePreferences;
  const budgetStr =
    user.budget_min && user.budget_max
      ? `$${user.budget_min} - $${user.budget_max}/mo`
      : null;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header
        title="Profile"
        right={
          <button
            onClick={() => router.push("/profile/edit")}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <Edit className="h-4 w-4" />
          </button>
        }
      />

      <div className="flex-1 px-4 py-6">
        {/* Profile header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Avatar className="h-24 w-24 border-4 border-purple-100 dark:border-purple-900">
            <AvatarImage
              src={
                user.avatar_url ??
                `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`
              }
            />
            <AvatarFallback className="text-2xl">
              {user.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold">
              {user.name}
              {user.age && (
                <span className="ml-1 font-normal text-muted-foreground">
                  , {user.age}
                </span>
              )}
            </h2>
            {user.location && (
              <div className="mt-0.5 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {user.location}
              </div>
            )}
          </div>
        </motion.div>

        {user.bio && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {user.bio}
          </p>
        )}

        {/* Quick info */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {budgetStr && (
            <Badge variant="secondary" className="gap-1">
              <DollarSign className="h-3 w-3" />
              {budgetStr}
            </Badge>
          )}
          {lifestyle?.sleep_schedule && (
            <Badge variant="secondary">
              {lifestyle.sleep_schedule === "early_bird"
                ? "🌅 Early Bird"
                : lifestyle.sleep_schedule === "night_owl"
                  ? "🌙 Night Owl"
                  : "🔄 Flexible"}
            </Badge>
          )}
          {lifestyle?.work_from_home && (
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              WFH
            </Badge>
          )}
          {lifestyle?.smoking === "no" && (
            <Badge variant="secondary">🚭 Non-smoker</Badge>
          )}
          {lifestyle?.pets === "yes" && (
            <Badge variant="secondary">🐾 Has pets</Badge>
          )}
        </div>

        <Separator className="my-6" />

        {/* Settings */}
        <div className="space-y-1">
          <div className="flex items-center justify-between rounded-xl px-3 py-3">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Dark Mode</span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          <button
            onClick={() => router.push("/profile/edit")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Edit Profile</span>
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Safety Center</span>
          </button>

          <Separator className="my-2" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

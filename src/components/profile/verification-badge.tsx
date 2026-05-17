"use client";

import { BadgeCheck, ShieldCheck, Mail, Phone, Camera, IdCard } from "lucide-react";
import type { VerificationStatus } from "@/types/database";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  verification: VerificationStatus | null;
  size?: "sm" | "md";
  showDetails?: boolean;
}

export function VerificationBadge({
  verification,
  size = "sm",
  showDetails = false,
}: VerificationBadgeProps) {
  if (!verification) return null;

  const verifiedCount = [
    verification.email_verified,
    verification.phone_verified,
    verification.id_verified,
    verification.photo_verified,
  ].filter(Boolean).length;

  if (verifiedCount === 0) return null;

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  if (!showDetails) {
    return (
      <div
        title={`${verifiedCount} of 4 verifications complete`}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5",
          verifiedCount >= 3
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        )}
      >
        <BadgeCheck className={iconSize} />
        {size === "md" && (
          <span className="text-[10px] font-semibold">Verified</span>
        )}
      </div>
    );
  }

  const checks = [
    { key: "email", label: "Email", icon: Mail, verified: verification.email_verified },
    { key: "phone", label: "Phone", icon: Phone, verified: verification.phone_verified },
    { key: "id", label: "ID", icon: IdCard, verified: verification.id_verified },
    { key: "photo", label: "Photo", icon: Camera, verified: verification.photo_verified },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-semibold">Verification</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {checks.map((check) => (
          <div
            key={check.key}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
              check.verified
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-muted text-muted-foreground"
            )}
          >
            <check.icon className="h-3.5 w-3.5" />
            <span className="font-medium">{check.label}</span>
            {check.verified && <BadgeCheck className="ml-auto h-3.5 w-3.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}

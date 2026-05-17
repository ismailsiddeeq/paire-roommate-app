import type { User, LifestylePreferences } from "@/types/database";

interface CompatibilityBreakdown {
  overall: number;
  budget: number;
  lifestyle: number;
  schedule: number;
  cleanliness: number;
  social: number;
}

export function calculateCompatibility(
  userA: User,
  userB: User
): CompatibilityBreakdown {
  const lifestyleA = userA.lifestyle as LifestylePreferences;
  const lifestyleB = userB.lifestyle as LifestylePreferences;

  // Budget overlap (0-100)
  const budget = calculateBudgetScore(userA, userB);

  // Cleanliness similarity (0-100)
  const cleanliness = calculateScaleScore(
    lifestyleA?.cleanliness ?? 3,
    lifestyleB?.cleanliness ?? 3,
    5
  );

  // Social level similarity (0-100)
  const social = calculateScaleScore(
    lifestyleA?.social_level ?? 3,
    lifestyleB?.social_level ?? 3,
    5
  );

  // Schedule compatibility (0-100)
  const schedule = calculateScheduleScore(lifestyleA, lifestyleB);

  // Lifestyle compatibility (smoking, pets, guests, WFH) (0-100)
  const lifestyle = calculateLifestyleScore(lifestyleA, lifestyleB);

  // Weighted overall score
  const overall = Math.round(
    budget * 0.25 +
      cleanliness * 0.2 +
      schedule * 0.2 +
      social * 0.15 +
      lifestyle * 0.2
  );

  return { overall, budget, lifestyle, schedule, cleanliness, social };
}

function calculateBudgetScore(userA: User, userB: User): number {
  const aMin = userA.budget_min ?? 0;
  const aMax = userA.budget_max ?? 10000;
  const bMin = userB.budget_min ?? 0;
  const bMax = userB.budget_max ?? 10000;

  const overlapStart = Math.max(aMin, bMin);
  const overlapEnd = Math.min(aMax, bMax);

  if (overlapStart > overlapEnd) {
    const gap = overlapStart - overlapEnd;
    const avgRange = ((aMax - aMin) + (bMax - bMin)) / 2;
    return Math.max(0, Math.round(100 - (gap / Math.max(avgRange, 1)) * 100));
  }

  const overlap = overlapEnd - overlapStart;
  const totalRange = Math.max(aMax, bMax) - Math.min(aMin, bMin);
  return totalRange === 0 ? 100 : Math.round((overlap / totalRange) * 100);
}

function calculateScaleScore(a: number, b: number, max: number): number {
  const diff = Math.abs(a - b);
  return Math.round(((max - diff) / max) * 100);
}

function calculateScheduleScore(
  a: LifestylePreferences,
  b: LifestylePreferences
): number {
  const schedA = a?.sleep_schedule ?? "flexible";
  const schedB = b?.sleep_schedule ?? "flexible";

  if (schedA === schedB) return 100;
  if (schedA === "flexible" || schedB === "flexible") return 75;
  return 30;
}

function calculateLifestyleScore(
  a: LifestylePreferences,
  b: LifestylePreferences
): number {
  let score = 0;
  let factors = 0;

  // Smoking
  factors++;
  const smokingA = a?.smoking ?? "no";
  const smokingB = b?.smoking ?? "no";
  if (smokingA === smokingB) score += 100;
  else if (smokingA === "outside_only" || smokingB === "outside_only") score += 50;
  else score += 20;

  // Pets
  factors++;
  const petsA = a?.pets ?? "depends";
  const petsB = b?.pets ?? "depends";
  if (petsA === petsB) score += 100;
  else if (petsA === "depends" || petsB === "depends") score += 70;
  else score += 20;

  // Guests
  factors++;
  const guestsA = a?.guests ?? "sometimes";
  const guestsB = b?.guests ?? "sometimes";
  if (guestsA === guestsB) score += 100;
  else if (
    (guestsA === "sometimes" || guestsB === "sometimes") &&
    guestsA !== "often" &&
    guestsB !== "often"
  )
    score += 70;
  else score += 40;

  // Noise level
  factors++;
  score += calculateScaleScore(
    a?.noise_level ?? 3,
    b?.noise_level ?? 3,
    5
  );

  return Math.round(score / factors);
}

export function getCompatibilityLabel(score: number): {
  label: string;
  color: string;
} {
  if (score >= 90) return { label: "Perfect Match", color: "text-emerald-500" };
  if (score >= 75) return { label: "Great Match", color: "text-green-500" };
  if (score >= 60) return { label: "Good Match", color: "text-blue-500" };
  if (score >= 40) return { label: "Okay Match", color: "text-yellow-500" };
  return { label: "Low Match", color: "text-orange-500" };
}

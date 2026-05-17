export interface User {
  id: string;
  email: string;
  name: string;
  age: number | null;
  bio: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  budget_min: number | null;
  budget_max: number | null;
  move_in_date: string | null;
  lifestyle: LifestylePreferences;
  avatar_url: string | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
  // New competitive features
  prompts: ProfilePrompt[] | null;
  verification: VerificationStatus | null;
  deal_breakers: DealBreakers | null;
  last_active: string | null;
  profile_completion: number | null;
}

export interface ProfilePrompt {
  question: string;
  answer: string;
}

export interface VerificationStatus {
  email_verified: boolean;
  phone_verified: boolean;
  id_verified: boolean;
  photo_verified: boolean;
}

export interface DealBreakers {
  no_smoking: boolean;
  no_pets: boolean;
  no_parties: boolean;
  max_budget: number | null;
  min_budget: number | null;
  gender_preference: string | null;
}

export interface LifestylePreferences {
  cleanliness: number;
  noise_level: number;
  sleep_schedule: "early_bird" | "night_owl" | "flexible";
  smoking: "yes" | "no" | "outside_only";
  pets: "yes" | "no" | "depends";
  social_level: number;
  guests: "rarely" | "sometimes" | "often";
  work_from_home: boolean;
}

export interface ProfilePhoto {
  id: string;
  user_id: string;
  image_url: string;
  order_index: number;
  created_at: string;
}

export interface Swipe {
  id: string;
  swiper_id: string;
  target_id: string;
  direction: "like" | "pass" | "superlike";
  created_at: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  user1?: User;
  user2?: User;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

export interface DiscoveryFilters {
  budget_min?: number;
  budget_max?: number;
  location?: string;
  max_distance?: number;
  sleep_schedule?: string;
  smoking?: string;
  pets?: string;
  min_age?: number;
  max_age?: number;
  verified_only?: boolean;
}

export interface UserWithPhotos extends User {
  profile_photos: ProfilePhoto[];
}

export const PROMPT_OPTIONS = [
  "My ideal roommate is someone who...",
  "On weekends you'll find me...",
  "I'm looking for a place that...",
  "The most important thing in a home is...",
  "I'm a great roommate because...",
  "My biggest pet peeve is...",
  "A fun fact about me...",
  "My move-in deal breaker is...",
] as const;

export const ICEBREAKER_SUGGESTIONS = [
  "Hey! What neighborhood are you looking in?",
  "Your place looks great! When are you looking to move in?",
  "We seem like a great match! What's your ideal living situation?",
  "Hi! I noticed we have similar budgets. Want to chat about finding a place?",
  "Love that we're both early birds! Want to tell me more about your routine?",
  "Your bio really resonated with me! What's the most important thing to you in a roommate?",
] as const;

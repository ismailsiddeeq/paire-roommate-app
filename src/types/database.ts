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
  direction: "like" | "pass";
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
}

export interface UserWithPhotos extends User {
  profile_photos: ProfilePhoto[];
}

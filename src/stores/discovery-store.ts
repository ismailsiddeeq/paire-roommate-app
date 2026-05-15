"use client";

import { create } from "zustand";
import type { DiscoveryFilters } from "@/types/database";

interface DiscoveryState {
  filters: DiscoveryFilters;
  setFilters: (filters: Partial<DiscoveryFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: DiscoveryFilters = {
  budget_min: 500,
  budget_max: 3000,
  min_age: 18,
  max_age: 45,
};

export const useDiscoveryStore = create<DiscoveryState>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));

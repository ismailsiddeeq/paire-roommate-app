"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import { useDiscoveryStore } from "@/stores/discovery-store";
import { useState } from "react";

export function FilterDrawer() {
  const { filters, setFilters, resetFilters } = useDiscoveryStore();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
          />
        }
      >
        <SlidersHorizontal className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          {/* Budget Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Budget Range: ${filters.budget_min ?? 500} - $
              {filters.budget_max ?? 3000}
            </Label>
            <Slider
              value={[filters.budget_min ?? 500, filters.budget_max ?? 3000]}
              min={0}
              max={5000}
              step={100}
              onValueChange={(val) => {
                const arr = Array.isArray(val) ? val : [val];
                setFilters({ budget_min: arr[0], budget_max: arr[1] });
              }}
            />
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Age Range: {filters.min_age ?? 18} - {filters.max_age ?? 45}
            </Label>
            <Slider
              value={[filters.min_age ?? 18, filters.max_age ?? 45]}
              min={18}
              max={65}
              step={1}
              onValueChange={(val) => {
                const arr = Array.isArray(val) ? val : [val];
                setFilters({ min_age: arr[0], max_age: arr[1] });
              }}
            />
          </div>

          {/* Sleep Schedule */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Sleep Schedule</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: undefined, label: "Any" },
                { value: "early_bird", label: "🌅 Early Bird" },
                { value: "night_owl", label: "🌙 Night Owl" },
                { value: "flexible", label: "🔄 Flexible" },
              ].map((option) => (
                <Badge
                  key={option.label}
                  variant={
                    filters.sleep_schedule === option.value
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer px-3 py-1.5 text-xs"
                  onClick={() =>
                    setFilters({ sleep_schedule: option.value })
                  }
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Smoking */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Smoking</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: undefined, label: "Any" },
                { value: "no", label: "🚭 Non-smoker" },
                { value: "outside_only", label: "🚪 Outside only" },
              ].map((option) => (
                <Badge
                  key={option.label}
                  variant={
                    filters.smoking === option.value ? "default" : "outline"
                  }
                  className="cursor-pointer px-3 py-1.5 text-xs"
                  onClick={() => setFilters({ smoking: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pets */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Pets</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: undefined, label: "Any" },
                { value: "yes", label: "🐾 Has pets" },
                { value: "no", label: "No pets" },
              ].map((option) => (
                <Badge
                  key={option.label}
                  variant={
                    filters.pets === option.value ? "default" : "outline"
                  }
                  className="cursor-pointer px-3 py-1.5 text-xs"
                  onClick={() => setFilters({ pets: option.value })}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => {
                resetFilters();
                setOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              className="flex-1 rounded-full bg-purple-600 hover:bg-purple-700"
              onClick={() => setOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import type { LifestylePreferences, ProfilePrompt } from "@/types/database";
import { PROMPT_OPTIONS } from "@/types/database";

const STEPS = [
  "basics",
  "lifestyle",
  "budget",
  "prompts",
  "photos",
] as const;

const STEP_TITLES = {
  basics: "About You",
  lifestyle: "Your Lifestyle",
  budget: "Budget & Move-in",
  prompts: "Your Personality",
  photos: "Your Photos",
};

export function OnboardingForm() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const supabase = createClient();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [prompts, setPrompts] = useState<ProfilePrompt[]>(
    (user?.prompts ?? []) as ProfilePrompt[]
  );

  const [form, setForm] = useState({
    name: user?.name ?? "",
    age: user?.age ?? 25,
    bio: user?.bio ?? "",
    location: user?.location ?? "",
    budget_min: user?.budget_min ?? 800,
    budget_max: user?.budget_max ?? 2000,
    move_in_date: user?.move_in_date ?? "",
    lifestyle: (user?.lifestyle ?? {
      cleanliness: 3,
      noise_level: 3,
      sleep_schedule: "flexible" as const,
      smoking: "no" as const,
      pets: "depends" as const,
      social_level: 3,
      guests: "sometimes" as const,
      work_from_home: false,
    }) as LifestylePreferences,
  });

  const updateForm = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateLifestyle = (key: string, value: unknown) => {
    setForm((prev) => ({
      ...prev,
      lifestyle: { ...prev.lifestyle, [key]: value },
    }));
  };

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPhotoFiles((prev) => [...prev, ...files].slice(0, 6));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string].slice(0, 6));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (idx: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== idx));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const uploadedPhotos: string[] = [];
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}_${i}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-photos")
          .upload(path, file);

        if (!uploadError) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("profile-photos").getPublicUrl(path);
          uploadedPhotos.push(publicUrl);
        }
      }

      if (uploadedPhotos.length > 0) {
        const photoRows = uploadedPhotos.map((url, idx) => ({
          user_id: user.id,
          image_url: url,
          order_index: idx,
        }));
        await supabase.from("profile_photos").insert(photoRows);
      }

      const { data: updatedUser } = await supabase
        .from("users")
        .update({
          name: form.name,
          age: form.age,
          bio: form.bio,
          location: form.location,
          budget_min: form.budget_min,
          budget_max: form.budget_max,
          move_in_date: form.move_in_date || null,
          lifestyle: form.lifestyle,
          prompts: prompts.filter((p) => p.answer.trim()),
          avatar_url: uploadedPhotos[0] ?? user.avatar_url,
          onboarding_complete: true,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (updatedUser) {
        setUser(updatedUser);
      }
      router.push("/discover");
    } catch (err) {
      console.error("Onboarding error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-lg flex-col px-4 pb-8 pt-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-semibold">
            {STEP_TITLES[currentStep]}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {/* Step: Basics */}
          {currentStep === "basics" && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="Your first name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={99}
                  value={form.age ?? ""}
                  onChange={(e) =>
                    updateForm("age", parseInt(e.target.value) || null)
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="location">City</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => updateForm("bio", e.target.value)}
                  placeholder="Tell potential roommates about yourself..."
                  rows={4}
                  maxLength={300}
                  className="mt-1.5 resize-none"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {(form.bio ?? "").length}/300
                </p>
              </div>
            </div>
          )}

          {/* Step: Lifestyle */}
          {currentStep === "lifestyle" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>
                  Cleanliness: {form.lifestyle.cleanliness}/5
                </Label>
                <Slider
                  value={[form.lifestyle.cleanliness]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(val) => updateLifestyle("cleanliness", Array.isArray(val) ? val[0] : val)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Relaxed</span>
                  <span>Spotless</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Noise Level: {form.lifestyle.noise_level}/5</Label>
                <Slider
                  value={[form.lifestyle.noise_level]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(val) => updateLifestyle("noise_level", Array.isArray(val) ? val[0] : val)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Quiet</span>
                  <span>Lively</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sleep Schedule</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "early_bird", label: "🌅 Early Bird" },
                      { value: "night_owl", label: "🌙 Night Owl" },
                      { value: "flexible", label: "🔄 Flexible" },
                    ] as const
                  ).map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={
                        form.lifestyle.sleep_schedule === opt.value
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() =>
                        updateLifestyle("sleep_schedule", opt.value)
                      }
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Smoking</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "no", label: "🚭 No" },
                      { value: "outside_only", label: "🚪 Outside" },
                      { value: "yes", label: "🚬 Yes" },
                    ] as const
                  ).map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={
                        form.lifestyle.smoking === opt.value
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => updateLifestyle("smoking", opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Pets</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "yes", label: "🐾 Have pets" },
                      { value: "no", label: "🚫 No pets" },
                      { value: "depends", label: "🤔 Depends" },
                    ] as const
                  ).map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={
                        form.lifestyle.pets === opt.value
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => updateLifestyle("pets", opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>
                  Social Level: {form.lifestyle.social_level}/5
                </Label>
                <Slider
                  value={[form.lifestyle.social_level]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(val) => updateLifestyle("social_level", Array.isArray(val) ? val[0] : val)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Introvert</span>
                  <span>Extrovert</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Guests</Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "rarely", label: "Rarely" },
                      { value: "sometimes", label: "Sometimes" },
                      { value: "often", label: "Often" },
                    ] as const
                  ).map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={
                        form.lifestyle.guests === opt.value
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => updateLifestyle("guests", opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    form.lifestyle.work_from_home ? "default" : "outline"
                  }
                  className="cursor-pointer px-3 py-1.5"
                  onClick={() =>
                    updateLifestyle(
                      "work_from_home",
                      !form.lifestyle.work_from_home
                    )
                  }
                >
                  💻 Work from Home
                </Badge>
              </div>
            </div>
          )}

          {/* Step: Budget & Move-in */}
          {currentStep === "budget" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>
                  Monthly Budget: ${form.budget_min} - ${form.budget_max}
                </Label>
                <Slider
                  value={[form.budget_min, form.budget_max]}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={(val) => {
                    const arr = Array.isArray(val) ? val : [val];
                    updateForm("budget_min", arr[0]);
                    updateForm("budget_max", arr[1]);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="move_in_date">Move-in Date</Label>
                <Input
                  id="move_in_date"
                  type="date"
                  value={form.move_in_date}
                  onChange={(e) => updateForm("move_in_date", e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          )}

          {/* Step: Prompts */}
          {currentStep === "prompts" && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">
                Add 2-3 prompts to let potential roommates know your personality.
                This is what makes your profile stand out!
              </p>
              {prompts.map((prompt, idx) => (
                <div key={idx} className="space-y-2 rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">
                      {prompt.question}
                    </span>
                    <button
                      onClick={() =>
                        setPrompts((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                  <Textarea
                    value={prompt.answer}
                    onChange={(e) => {
                      const updated = [...prompts];
                      updated[idx] = { ...prompt, answer: e.target.value };
                      setPrompts(updated);
                    }}
                    placeholder="Your answer..."
                    rows={2}
                    maxLength={200}
                    className="resize-none text-sm"
                  />
                  <p className="text-right text-[10px] text-muted-foreground">
                    {prompt.answer.length}/200
                  </p>
                </div>
              ))}
              {prompts.length < 3 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Choose a prompt:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROMPT_OPTIONS.filter(
                      (opt) => !prompts.some((p) => p.question === opt)
                    ).map((opt) => (
                      <Badge
                        key={opt}
                        variant="outline"
                        className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-primary/[0.06] hover:text-primary"
                        onClick={() =>
                          setPrompts((prev) => [
                            ...prev,
                            { question: opt, answer: "" },
                          ])
                        }
                      >
                        {opt}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: Photos */}
          {currentStep === "photos" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add up to 6 photos. First photo is your main profile picture.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {photoPreviews.map((preview, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={preview}
                      alt={`Photo ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removePhoto(idx)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ✕
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-1 left-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                        Main
                      </div>
                    )}
                  </div>
                ))}
                {photoPreviews.length < 6 && (
                  <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-primary/[0.04]">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoAdd}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setStep((s) => s - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button
            className="flex-1 rounded-full bg-primary hover:bg-primary/90"
            onClick={() => setStep((s) => s + 1)}
            disabled={currentStep === "basics" && !form.name.trim()}
          >
            Continue
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="flex-1 rounded-full bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Complete Profile"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

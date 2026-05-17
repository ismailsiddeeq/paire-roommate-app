-- Paire Roommate App - Competitive Improvements Migration
-- Adds: prompts, verification, deal_breakers, last_active, profile_completion, superlike support

-- ============================================
-- NEW COLUMNS ON USERS TABLE
-- ============================================

-- Hinge-style profile prompts (JSONB array of {question, answer})
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prompts JSONB DEFAULT '[]'::jsonb;

-- Verification status (email, phone, ID, photo)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS verification JSONB DEFAULT '{
  "email_verified": false,
  "phone_verified": false,
  "id_verified": false,
  "photo_verified": false
}'::jsonb;

-- Deal-breakers for matching
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS deal_breakers JSONB DEFAULT '{
  "no_smoking": false,
  "no_pets": false,
  "no_parties": false,
  "max_budget": null,
  "min_budget": null,
  "gender_preference": null
}'::jsonb;

-- Activity tracking
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_active TIMESTAMPTZ DEFAULT NOW();

-- Profile completion percentage (calculated on update)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS profile_completion INTEGER DEFAULT 0;

-- ============================================
-- UPDATE SWIPES TO SUPPORT SUPERLIKE
-- ============================================
ALTER TABLE public.swipes DROP CONSTRAINT IF EXISTS swipes_direction_check;
ALTER TABLE public.swipes ADD CONSTRAINT swipes_direction_check
  CHECK (direction IN ('like', 'pass', 'superlike'));

-- ============================================
-- INDEX FOR LAST ACTIVE (activity status)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_last_active ON public.users(last_active DESC);

-- ============================================
-- AUTO-UPDATE last_active ON LOGIN
-- ============================================
CREATE OR REPLACE FUNCTION public.update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_active = NOW();
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_last_active
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_active();

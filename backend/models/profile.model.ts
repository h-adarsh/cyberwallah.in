// MODEL — the shape of a member profile. Mirrors the `profiles` table in
// supabase/migrations/0001_init.sql. Hand-written for v1; regenerate with the
// Supabase CLI later if the schema grows.

export type Tier = "free" | "pro" | "pro_plus";

export interface Profile {
  id: string;
  card_number: number;
  full_name: string | null;
  age: number | null;
  location: string | null;
  avatar_url: string | null;
  tier: Tier;
  created_at: string;
  updated_at: string;
}

/** The subset of fields a member is allowed to edit on their own profile. */
export type ProfilePatch = Partial<
  Pick<Profile, "full_name" | "age" | "location" | "avatar_url">
>;

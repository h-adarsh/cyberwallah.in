import { supabase } from "../client";
import type { Profile, ProfilePatch, PublicCard } from "../models";

// SERVICE — profile & membership-card data access. Owns every `profiles`
// query and the public-card RPC. RLS on the table is the real security
// boundary; these methods just express the app's intent.

export const profileService = {
  /** A member's own profile row (RLS ensures they only read their own). */
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      console.error("[profile] failed to load profile:", error.message);
      return null;
    }
    return (data as Profile | null) ?? null;
  },

  /** Update the signed-in member's editable profile fields. */
  async updateProfile(
    userId: string,
    patch: ProfilePatch,
  ): Promise<{ error: string | null }> {
    const { error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", userId);
    return { error: error ? error.message : null };
  },

  /**
   * Public verify lookup for /id/:cardNumber. Calls the SECURITY DEFINER RPC
   * that returns only the privacy-safe subset. Returns null when no member has
   * that number; throws on an actual request error so the caller can tell
   * "not found" apart from "something broke".
   */
  async getPublicCard(cardNumber: number): Promise<PublicCard | null> {
    const { data, error } = await supabase.rpc("get_public_card", {
      p_card_number: cardNumber,
    });
    if (error) {
      console.error("[profile] get_public_card:", error.message);
      throw new Error(error.message);
    }
    const row = (Array.isArray(data) ? data[0] : data) as
      | PublicCard
      | undefined;
    return row ?? null;
  },
};

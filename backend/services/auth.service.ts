import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../client";

// SERVICE — everything auth. The only module (besides the other services) that
// touches `supabase.auth`. AuthProvider consumes this; UI never calls it directly.

/**
 * Shown when the app is running without Supabase credentials. Without this
 * guard, `signInWithOAuth` would redirect the whole browser to the placeholder
 * URL (`https://placeholder.supabase.co/...`), which doesn't exist — the user
 * sees a raw "Server Not Found" browser page instead of an in-app message.
 */
const NOT_CONFIGURED =
  "Sign-in isn't available yet — the site isn't connected to Supabase. " +
  "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend/.env (see README).";

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  age?: number | null;
}

export interface SignUpResult {
  error: string | null;
  /** True when email confirmation is required before a session exists. */
  needsConfirmation: boolean;
}

export const authService = {
  /** The current session, or null if signed out. */
  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /**
   * Subscribe to auth-state changes. The callback fires with the new session
   * (or null on sign-out). Returns an unsubscribe function for cleanup.
   */
  onAuthStateChange(callback: (session: Session | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return () => data.subscription.unsubscribe();
  },

  async signUp({
    email,
    password,
    fullName,
    age,
  }: SignUpParams): Promise<SignUpResult> {
    if (!isSupabaseConfigured)
      return { error: NOT_CONFIGURED, needsConfirmation: false };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, age: age ?? null },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) return { error: error.message, needsConfirmation: false };
    // With "Confirm email" on, no session is returned until the user confirms.
    return { error: null, needsConfirmation: !data.session };
  },

  async signIn(
    email: string,
    password: string,
  ): Promise<{ error: string | null }> {
    if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error ? error.message : null };
  },

  async signInWithGoogle(): Promise<{ error: string | null }> {
    if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    return { error: error ? error.message : null };
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  async resetPassword(email: string): Promise<{ error: string | null }> {
    if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error ? error.message : null };
  },

  async updatePassword(password: string): Promise<{ error: string | null }> {
    if (!isSupabaseConfigured) return { error: NOT_CONFIGURED };
    const { error } = await supabase.auth.updateUser({ password });
    return { error: error ? error.message : null };
  },
};

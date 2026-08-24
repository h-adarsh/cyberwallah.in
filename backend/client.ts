import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True only when both Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Fail loudly in the console, but DON'T crash the whole app: we fall back to a
  // syntactically-valid placeholder URL below so the public site still renders.
  // Auth/data calls will simply fail (handled by the services) until real
  // credentials are added.
  console.error(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Auth is disabled until you add them to frontend/.env — see frontend/.env.example.",
  );
}

/**
 * The single Supabase client for the whole app — the ONE place that holds the
 * connection.
 *
 * Architecture rule: only files under `backend/services` import this. UI
 * (components / pages / context) talks to a *service*, and the service talks
 * to this client. Keeping the client behind the service layer is what stops
 * raw `supabase.from(...)` calls from leaking back into the UI.
 *
 * - persistSession + autoRefreshToken: keep the user logged in across reloads.
 * - detectSessionInUrl: required so the Google OAuth redirect (/auth/callback)
 *   is parsed into a session automatically.
 *
 * The anon key is public by design; data safety is enforced by Row Level
 * Security in the database (see supabase/migrations/0001_init.sql).
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

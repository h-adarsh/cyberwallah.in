import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { authService, profileService } from "@backend/services";
import type { SignUpParams } from "@backend/services";
import type { Profile, ProfilePatch } from "@backend/models";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /** True until the initial session has been resolved. */
  loading: boolean;
  /** True while the profile row is being (re)fetched. */
  profileLoading: boolean;
  signUp: (
    params: SignUpParams,
  ) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  updateProfile: (patch: ProfilePatch) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Holds session + profile state for the app and exposes auth actions.
 * All the actual Supabase work is delegated to the backend service layer
 * (`@backend/services`) — this provider is the bridge between that layer and
 * React state.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const user = session?.user ?? null;

  const fetchProfile = useCallback(async (userId: string) => {
    setProfileLoading(true);
    const row = await profileService.getProfile(userId);
    setProfile(row);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    void authService.getSession().then((current) => {
      if (!active) return;
      setSession(current);
      setLoading(false);
      if (current?.user) void fetchProfile(current.user.id);
    });

    const unsubscribe = authService.onAuthStateChange((next) => {
      if (!active) return;
      setSession(next);
      setLoading(false);
      // Defer other Supabase calls out of the callback to avoid the
      // documented auth-lock deadlock.
      if (next?.user) {
        const uid = next.user.id;
        setTimeout(() => {
          if (active) void fetchProfile(uid);
        }, 0);
      } else {
        setProfile(null);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [fetchProfile]);

  const signUp: AuthContextValue["signUp"] = (params) =>
    authService.signUp(params);

  const signIn: AuthContextValue["signIn"] = (email, password) =>
    authService.signIn(email, password);

  const signInWithGoogle: AuthContextValue["signInWithGoogle"] = () =>
    authService.signInWithGoogle();

  const signOut = async () => {
    await authService.signOut();
    setProfile(null);
  };

  const resetPassword: AuthContextValue["resetPassword"] = (email) =>
    authService.resetPassword(email);

  const updatePassword: AuthContextValue["updatePassword"] = (password) =>
    authService.updatePassword(password);

  const updateProfile: AuthContextValue["updateProfile"] = async (patch) => {
    if (!user) return { error: "Not signed in." };
    const { error } = await profileService.updateProfile(user.id, patch);
    if (error) return { error };
    await fetchProfile(user.id);
    return { error: null };
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const value: AuthContextValue = {
    session,
    user,
    profile,
    loading,
    profileLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

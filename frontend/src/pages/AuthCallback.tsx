import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

/**
 * OAuth landing page. supabase-js parses the URL hash (detectSessionInUrl)
 * and fires onAuthStateChange; once a session is present we forward to the
 * dashboard. If none arrives, we fall back to the login page.
 */
export default function AuthCallback() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (session) {
      navigate("/dashboard", { replace: true });
      return;
    }
    // Give supabase a moment to finish parsing the URL, then bail to login.
    const t = setTimeout(() => navigate("/login", { replace: true }), 2000);
    return () => clearTimeout(t);
  }, [session, loading, navigate]);

  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-electric-400)]" />
        <span className="font-mono text-sm">signing you in…</span>
      </div>
    </div>
  );
}

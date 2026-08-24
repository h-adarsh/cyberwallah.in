import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

/**
 * Nested layout route (react-router v7 data-router style):
 * - while the session is resolving → spinner
 * - no session → redirect to /login, remembering where we came from
 * - otherwise → render the protected child route
 */
export function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-electric-400)]" />
          <span className="font-mono text-sm">authenticating…</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

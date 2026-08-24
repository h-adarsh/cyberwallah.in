import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthProvider";

export default function ResetPassword() {
  const { session, loading: authLoading, updatePassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  // The recovery link establishes a session via detectSessionInUrl. If, once
  // auth has resolved, there's still no session, the link was invalid/expired.
  const invalidLink = !authLoading && !session;

  return (
    <AuthShell
      seoTitle="Set a new password"
      seoDescription="Choose a new password for your CyberWallah account."
      title="Set a new password"
      subtitle={
        invalidLink ? undefined : "Choose a new password for your account."
      }
      footer={
        <Link
          to="/login"
          className="font-medium text-[var(--color-electric-400)] hover:underline"
        >
          Back to log in
        </Link>
      }
    >
      {invalidLink ? (
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            This reset link is invalid or has expired. Request a new one.
          </p>
          <Link to="/forgot-password" className="w-full">
            <Button variant="outline" fullWidth>
              Request a new link
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="New password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="At least 8 characters."
            leftIcon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
          <Input
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
          {error && (
            <p className="text-sm text-[var(--color-danger)]" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" fullWidth loading={loading}>
            Update password
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

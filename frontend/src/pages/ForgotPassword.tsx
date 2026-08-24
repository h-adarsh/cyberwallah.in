import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthProvider";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await resetPassword(email.trim());
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      seoTitle="Reset password"
      seoDescription="Reset your CyberWallah account password."
      title="Reset your password"
      subtitle={
        sent
          ? undefined
          : "Enter your email and we'll send you a reset link."
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
      {sent ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-electric-950)] text-[var(--color-electric-400)]">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <p className="text-sm text-[var(--color-text-muted)]">
            If an account exists for{" "}
            <span className="font-medium text-[var(--color-text-primary)]">
              {email.trim()}
            </span>
            , a password reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            placeholder="you@example.com"
          />
          {error && (
            <p className="text-sm text-[var(--color-danger)]" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" fullWidth loading={loading}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { AuthShell, OrDivider } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthProvider";

interface LocationState {
  from?: { pathname?: string };
}

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as LocationState | null)?.from?.pathname ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <AuthShell
      seoTitle="Log in"
      seoDescription="Log in to your CyberWallah account to access your dashboard and member ID."
      title="Welcome back"
      subtitle="Log in to access your dashboard and member ID."
      footer={
        <>
          New here?{" "}
          <Link
            to="/signup"
            className="font-medium text-[var(--color-electric-400)] hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
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
        <div>
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
          <div className="mt-1.5 text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-electric-400)]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" fullWidth loading={loading}>
          Log in
        </Button>
      </form>

      <OrDivider />
      <GoogleButton />
    </AuthShell>
  );
}

import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Lock, Mail, User } from "lucide-react";
import { AuthShell, OrDivider } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthProvider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  age?: string;
  consent?: string;
}

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (fullName.trim().length < 2) next.fullName = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (age.trim()) {
      const n = Number(age);
      if (!Number.isInteger(n) || n < 5 || n > 120)
        next.age = "Enter a valid age between 5 and 120.";
    }
    if (!consent) next.consent = "Please accept the terms to continue.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    const { error, needsConfirmation } = await signUp({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
      age: age.trim() ? Number(age) : null,
    });
    setLoading(false);

    if (error) {
      setFormError(error);
      return;
    }
    if (needsConfirmation) {
      setConfirmSent(true);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  if (confirmSent) {
    return (
      <AuthShell
        seoTitle="Confirm your email"
        seoDescription="Confirm your email to finish creating your CyberWallah account."
        title="Check your inbox"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-electric-950)] text-[var(--color-electric-400)]">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <p className="text-sm text-[var(--color-text-muted)]">
            We sent a confirmation link to{" "}
            <span className="font-medium text-[var(--color-text-primary)]">
              {email.trim()}
            </span>
            . Click it to activate your account, then log in.
          </p>
          <Link to="/login" className="w-full">
            <Button variant="outline" fullWidth>
              Go to log in
            </Button>
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      seoTitle="Sign up"
      seoDescription="Create your free CyberWallah account and get your digital member ID."
      title="Create your account"
      subtitle="Join CyberWallah and claim your digital member ID."
      footer={
        <>
          Already a member?{" "}
          <Link
            to="/login"
            className="font-medium text-[var(--color-electric-400)] hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          leftIcon={<User className="h-4 w-4" />}
          placeholder="Adarsh Singh"
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4" />}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          helperText="At least 8 characters."
          leftIcon={<Lock className="h-4 w-4" />}
          placeholder="••••••••"
        />
        <Input
          label="Age"
          type="number"
          inputMode="numeric"
          min={5}
          max={120}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={errors.age}
          helperText="Optional — shown only on your own dashboard."
          placeholder="21"
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-electric-500)]"
            />
            <span>
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-[var(--color-electric-400)] hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-[var(--color-electric-400)] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-[var(--color-danger)]" role="alert">
              {errors.consent}
            </p>
          )}
        </div>

        {formError && (
          <p className="text-sm text-[var(--color-danger)]" role="alert">
            {formError}
          </p>
        )}

        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <OrDivider />
      <GoogleButton label="Sign up with Google" />
    </AuthShell>
  );
}

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  ExternalLink,
  LogOut,
  Share2,
  Sparkles,
} from "lucide-react";
import SEO from "@/components/seo/SEO";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DigitalIdCard } from "@/components/id-card/DigitalIdCard";
import { useAuth } from "@/context/AuthProvider";
import { quizService } from "@backend/services";
import {
  cardUrl,
  downloadCardPng,
  formatCardNumber,
  shareCard,
} from "@/lib/idcard";
import type { Profile, QuizResult } from "@backend/models";

export default function Dashboard() {
  const { profile, signOut } = useAuth();

  if (!profile) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-electric-400)]" />
      </div>
    );
  }

  const firstName = profile.full_name?.trim().split(/\s+/)[0] || "there";

  return (
    <>
      <SEO
        title="Dashboard"
        description="Your CyberWallah dashboard — member ID, profile, and quiz history."
      />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Welcome, <span className="text-gradient">{firstName}</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Member {formatCardNumber(profile.card_number)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut className="h-4 w-4" />}
            onClick={() => void signOut()}
          >
            Log out
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <IdCardPanel profile={profile} />
          <ProfilePanel profile={profile} />
        </div>

        <QuizHistoryPanel userId={profile.id} />
      </section>
    </>
  );
}

function IdCardPanel({ profile }: { profile: Profile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const flash = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

  const onDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      await downloadCardPng(cardRef.current, profile.card_number);
    } catch {
      flash("Couldn't generate the image. Try again.");
    } finally {
      setDownloading(false);
    }
  };

  const onShare = async () => {
    const result = await shareCard(profile.card_number);
    if (result === "copied") flash("Link copied to clipboard.");
    else if (result === "shared") flash("Shared!");
    else flash("Sharing isn't supported on this device.");
  };

  return (
    <div className="flex flex-col gap-4">
      <DigitalIdCard
        ref={cardRef}
        variant="full"
        cardNumber={profile.card_number}
        fullName={profile.full_name}
        age={profile.age}
        tier={profile.tier}
        createdAt={profile.created_at}
        className="mx-auto"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={<Download className="h-4 w-4" />}
          loading={downloading}
          onClick={onDownload}
        >
          Download PNG
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<Share2 className="h-4 w-4" />}
          onClick={onShare}
        >
          Share
        </Button>
        <a
          href={cardUrl(profile.card_number)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-electric-400)]"
        >
          View public card <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {message && (
        <p className="text-sm text-[var(--color-electric-400)]" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

function ProfilePanel({ profile }: { profile: Profile }) {
  const { updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [age, setAge] = useState(profile.age != null ? String(profile.age) : "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [ageError, setAgeError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incomplete = profile.age == null || !profile.location;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setAgeError(undefined);

    let ageValue: number | null = null;
    if (age.trim()) {
      const n = Number(age);
      if (!Number.isInteger(n) || n < 5 || n > 120) {
        setAgeError("Enter a valid age between 5 and 120.");
        return;
      }
      ageValue = n;
    }

    setSaving(true);
    const { error } = await updateProfile({
      full_name: fullName.trim() || null,
      age: ageValue,
      location: location.trim() || null,
    });
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card variant="glass" padding="lg">
      <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
        Your profile
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        This name appears on your member ID.
      </p>

      {incomplete && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[var(--color-border-glow)] bg-[var(--color-electric-950)]/40 p-3 text-sm text-[var(--color-electric-300)]">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Complete your profile to finish setting up your member ID.</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4" noValidate>
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Age"
          type="number"
          inputMode="numeric"
          min={5}
          max={120}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={ageError}
          placeholder="21"
        />
        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, State"
        />

        {error && (
          <p className="text-sm text-[var(--color-danger)]" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" size="sm" loading={saving}>
            Save changes
          </Button>
          {saved && (
            <span
              className="text-sm text-[var(--color-electric-400)]"
              role="status"
            >
              Saved.
            </span>
          )}
        </div>
      </form>
    </Card>
  );
}

function QuizHistoryPanel({ userId }: { userId: string }) {
  const [rows, setRows] = useState<QuizResult[] | null>(null);

  useEffect(() => {
    let active = true;
    void quizService.listResults(userId).then((data) => {
      if (active) setRows(data);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  return (
    <Card variant="glass" padding="lg" className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
          Quiz history
        </h2>
        <Link
          to="/quiz"
          className="text-sm font-medium text-[var(--color-electric-400)] hover:underline"
        >
          Take the quiz
        </Link>
      </div>

      {rows === null ? (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          No attempts yet. Take the quiz to track your progress here.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--color-border-subtle)]">
          {rows.map((row) => {
            const pct = row.total
              ? Math.round((row.score / row.total) * 100)
              : 0;
            return (
              <li
                key={row.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-mono text-sm text-[var(--color-text-primary)]">
                    {row.score} / {row.total}{" "}
                    <span className="text-[var(--color-text-dim)]">
                      ({pct}%)
                    </span>
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {new Date(row.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={
                    pct >= 80
                      ? "text-sm text-[var(--color-electric-400)]"
                      : "text-sm text-[var(--color-text-muted)]"
                  }
                >
                  {pct >= 80 ? "Excellent" : pct >= 50 ? "Good" : "Keep going"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

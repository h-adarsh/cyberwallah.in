import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardUrl, formatCardNumber } from "@/lib/idcard";
import type { Tier } from "@backend/models";

const TIER_LABEL: Record<Tier, string> = {
  free: "Free",
  pro: "Pro",
  pro_plus: "Pro+",
};

interface DigitalIdCardProps {
  cardNumber: number;
  fullName: string | null;
  tier: Tier;
  createdAt: string;
  age?: number | null;
  /** 'full' shows age (the owner's own view); 'public' hides it. */
  variant?: "full" | "public";
  className?: string;
}

function memberSince(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export const DigitalIdCard = forwardRef<HTMLDivElement, DigitalIdCardProps>(
  function DigitalIdCard(
    { cardNumber, fullName, tier, createdAt, age, variant = "full", className },
    ref,
  ) {
    const name = fullName?.trim() || "CyberWallah Member";

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-border-glow)] bg-gradient-card p-6 shadow-[var(--shadow-glow-md)]",
          className,
        )}
      >
        {/* ambient layers */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-glow blur-2xl" />

        <div className="relative">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-[var(--shadow-glow-sm)]">
                <TerminalSquare
                  className="h-4 w-4 text-white"
                  strokeWidth={2.25}
                />
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                Cyber<span className="text-gradient">Wallah</span>
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
              Member ID
            </span>
          </div>

          {/* body */}
          <div className="mt-6 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-electric-400)]">
                Name
              </p>
              <h3 className="mt-1 truncate font-display text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {name}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)]">
                {variant === "full" && age != null && <span>Age {age}</span>}
                <span className="inline-flex items-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-electric-950)]/50 px-2.5 py-0.5 text-xs text-[var(--color-electric-300)]">
                  {TIER_LABEL[tier]} tier
                </span>
              </div>
            </div>

            {/* QR — dark-on-white for reliable scanning */}
            <div className="shrink-0 rounded-xl bg-white p-2 shadow-[var(--shadow-elevated)]">
              <QRCodeSVG
                value={cardUrl(cardNumber)}
                size={76}
                level="M"
                fgColor="#04140c"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* footer */}
          <div className="mt-6 flex items-end justify-between border-t border-[var(--color-border-subtle)] pt-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-dim)]">
                Member No.
              </p>
              <p className="mt-0.5 font-mono text-2xl font-semibold text-gradient">
                {formatCardNumber(cardNumber)}
              </p>
            </div>
            <div className="text-right">
              <p className="inline-flex items-center gap-1 text-xs text-[var(--color-electric-400)]">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Since {memberSince(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/Button";
import { DigitalIdCard } from "@/components/id-card/DigitalIdCard";
import { profileService } from "@backend/services";
import { formatCardNumber, parseCardNumber } from "@/lib/idcard";
import type { PublicCard } from "@backend/models";

type State =
  | { status: "loading" }
  | { status: "found"; card: PublicCard }
  | { status: "notfound" }
  | { status: "error" };

export default function IdCardPublic() {
  const { cardNumber } = useParams();
  const parsed = parseCardNumber(cardNumber);
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (parsed == null) {
      setState({ status: "notfound" });
      return;
    }
    let active = true;
    profileService
      .getPublicCard(parsed)
      .then((card) => {
        if (!active) return;
        setState(card ? { status: "found", card } : { status: "notfound" });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });
    return () => {
      active = false;
    };
  }, [parsed]);

  const heading =
    state.status === "found"
      ? `${state.card.full_name ?? "Member"} — ${formatCardNumber(state.card.card_number)}`
      : "Verify member";

  return (
    <>
      <SEO
        title={heading}
        description="Verify a CyberWallah member's digital ID card."
      />
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        {state.status === "loading" && (
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-electric-400)]" />
        )}

        {state.status === "found" && (
          <>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glow)] bg-[var(--color-electric-950)]/50 px-4 py-1.5 text-sm text-[var(--color-electric-300)]">
              <ShieldCheck className="h-4 w-4" />
              Verified CyberWallah member
            </p>
            <DigitalIdCard
              variant="public"
              cardNumber={state.card.card_number}
              fullName={state.card.full_name}
              tier={state.card.tier}
              createdAt={state.card.created_at}
            />
            <p className="mt-8 text-sm text-[var(--color-text-muted)]">
              Want your own member ID?
            </p>
            <Link to="/signup" className="mt-3">
              <Button variant="primary">Join CyberWallah</Button>
            </Link>
          </>
        )}

        {state.status === "notfound" && (
          <>
            <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              No member found
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              We couldn't find a member with this ID. Check the number and try
              again.
            </p>
            <Link to="/" className="mt-6">
              <Button variant="outline">Back home</Button>
            </Link>
          </>
        )}

        {state.status === "error" && (
          <>
            <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              We couldn't verify this member right now. Please try again later.
            </p>
          </>
        )}
      </section>
    </>
  );
}

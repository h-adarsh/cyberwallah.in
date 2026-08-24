import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TerminalSquare } from "lucide-react";
import SEO from "@/components/seo/SEO";
import { Card } from "@/components/ui/Card";

interface AuthShellProps {
  seoTitle: string;
  seoDescription: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/** Centered, branded shell shared by the login / signup / password pages. */
export function AuthShell({
  seoTitle,
  seoDescription,
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-[var(--shadow-glow-sm)]">
            <TerminalSquare className="h-5 w-5 text-white" strokeWidth={2.25} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Cyber<span className="text-gradient">Wallah</span>
          </span>
        </Link>

        <Card
          variant="glass"
          padding="lg"
          className="border border-[var(--color-border-subtle)]"
        >
          <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {subtitle}
            </p>
          )}
          <div className="mt-6">{children}</div>
        </Card>

        {footer && (
          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            {footer}
          </p>
        )}
      </section>
    </>
  );
}

/** "or" separator used between the email form and the Google button. */
export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
        or
      </span>
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>
  );
}

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function NewsletterSignup() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-[var(--color-border-default)] bg-gradient-card p-8 shadow-[var(--shadow-elevated)] sm:p-10"
      >
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-gradient-glow blur-2xl" />

        <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
          <div className="md:max-w-md">
            <span className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-[var(--shadow-glow-sm)]">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              Stay a step ahead of the <span className="text-gradient">scammers</span>.
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)]">
              One short email a week — new scams doing the rounds and plain-English tips. Free,
              unsubscribe anytime.
            </p>
          </div>

          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            action={import.meta.env.VITE_GOOGLE_SCRIPT_URL || undefined}
            method="POST"
            target="_blank"
          >
            <label htmlFor="home-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="home-newsletter-email"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)] px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)] transition-all focus:border-[var(--color-electric-500)] focus:shadow-[var(--shadow-glow-sm)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white shadow-[var(--shadow-glow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-glow-md)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

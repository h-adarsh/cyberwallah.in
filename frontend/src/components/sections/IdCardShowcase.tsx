import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { DigitalIdCard } from "../id-card/DigitalIdCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const BENEFITS = [
  "A verified founding-member number — be among the first",
  "Your quiz scores and progress, saved to your profile",
  "Weekly, practical safety tips straight to your inbox",
  "A shareable digital ID card you can download anytime",
];

export function IdCardShowcase() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-sm tracking-widest text-[var(--color-electric-400)]">
            // MEMBERSHIP
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            Learning is free. Your <span className="text-gradient">member ID</span> makes it official.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-text-muted)]">
            Join CyberWallah and claim your own digital identity card — proof you're building real
            cyber skills, the Indian way.
          </p>

          <ul className="mt-8 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-electric-400)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <NavLink
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-glow-md)]"
            >
              Create your free ID
              <ArrowRight className="h-4 w-4" />
            </NavLink>
            <NavLink
              to="/login"
              className="text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              Already a member? Log in
            </NavLink>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30, scale: prefersReduced ? 1 : 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* ambient glow behind the card */}
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-4/5 bg-gradient-glow blur-3xl" />
          <div className={prefersReduced ? "" : "transition-transform duration-500 hover:rotate-0 lg:rotate-[-4deg]"}>
            <DigitalIdCard
              variant="public"
              cardNumber={101}
              fullName="Aarav Sharma"
              tier="free"
              createdAt="2025-01-01"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

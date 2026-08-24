import { NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TermCard } from "../ui/TermCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import dictionary from "../../data/dictionary.json";

interface Term {
  term: string;
  slug: string;
  letter: string;
  preview: string;
}

/** Curated, India-relevant terms surfaced on the homepage (all confirmed present in dictionary.json). */
const POPULAR_SLUGS = [
  "digital-arrest",
  "upi-fraud",
  "otp-fraud",
  "phishing",
  "aadhaar-fraud",
  "sim-swap-attack",
  "qr-code-scam",
  "deepfake",
];

const POPULAR_TERMS: Term[] = POPULAR_SLUGS.map((slug) =>
  (dictionary as Term[]).find((d) => d.slug === slug),
).filter((t): t is Term => Boolean(t));

export function PopularTerms() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.06 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:px-16 md:py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-wrap items-end justify-between gap-4"
      >
        <div className="max-w-2xl">
          <span className="font-mono text-sm tracking-widest text-[var(--color-electric-400)]">
            // POPULAR TERMS
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            The scams targeting India, <span className="text-gradient">decoded</span>.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Real threats, explained in plain English. Tap any term for the full breakdown.
          </p>
        </div>
        <NavLink
          to="/dictionary"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--color-border-default)] px-4 py-2.5 text-sm font-semibold text-[var(--color-electric-300)] transition-all hover:border-[var(--color-border-glow)] hover:shadow-[var(--shadow-glow-sm)]"
        >
          Browse all 39 terms
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </NavLink>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {POPULAR_TERMS.map((t) => (
          <motion.div key={t.slug} variants={item}>
            <TermCard term={t.term} slug={t.slug} preview={t.preview} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

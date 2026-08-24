import { NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { BookOpen, BrainCircuit, BadgeCheck, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Step {
  Icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  cta: string;
}

const STEPS: Step[] = [
  {
    Icon: BookOpen,
    title: "Learn the terms",
    description:
      "Start with 39+ real threats decoded in plain English — phishing, UPI fraud, digital arrest and more.",
    to: "/dictionary",
    cta: "Open the dictionary",
  },
  {
    Icon: BrainCircuit,
    title: "Test yourself",
    description:
      "Take the 2-minute quiz to see exactly where you stand — then close the gaps.",
    to: "/quiz",
    cta: "Take the quiz",
  },
  {
    Icon: BadgeCheck,
    title: "Claim your ID",
    description:
      "Sign up free to get your CyberWallah member ID card and weekly safety tips.",
    to: "/signup",
    cta: "Create your free ID",
  },
];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:px-16 md:py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-2xl"
      >
        <span className="font-mono text-sm tracking-widest text-[var(--color-electric-400)]">
          // HOW IT WORKS
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          Go from zero to <span className="text-gradient">cyber-aware</span> in three steps.
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          No sign-up needed to start learning — the ID card is your reward when you're ready.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {/* Connector line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent md:block" />

        {STEPS.map(({ Icon, title, description, to, cta }, i) => (
          <motion.div key={title} variants={item} className="relative">
            <NavLink
              to={to}
              className="group flex h-full flex-col rounded-2xl border border-[var(--color-border-subtle)] bg-gradient-card p-6 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-glow)] hover:shadow-[var(--shadow-glow-md)]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-[var(--shadow-glow-sm)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className="font-mono text-4xl font-bold text-[var(--color-electric-950)] transition-colors duration-300 group-hover:text-[var(--color-electric-800)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-electric-400)] transition-colors group-hover:text-[var(--color-electric-300)]">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

import { NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Network, BookOpen, Search, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Badge } from "../ui/Badge";

interface LearnItem {
  Icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  tag: string;
}

const CARDS: LearnItem[] = [
  {
    Icon: ShieldCheck,
    title: "Ethical Hacking",
    description: "Learn how attackers think — and exactly how to stop them.",
    to: "/resources",
    tag: "Beginner",
  },
  {
    Icon: Network,
    title: "Network Security",
    description: "Understand firewalls, VPNs, and how your data travels safely.",
    to: "/dictionary",
    tag: "Core",
  },
  {
    Icon: BookOpen,
    title: "Cyber Dictionary",
    description: "Every term explained in plain, simple English. 39+ and growing.",
    to: "/dictionary",
    tag: "39+ terms",
  },
  {
    Icon: Search,
    title: "Real Case Studies",
    description: "Breakdowns of actual cyber attacks — with an Indian lens.",
    to: "/blog",
    tag: "India",
  },
];

export function LearnSection() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1 } },
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
          // WHAT YOU'LL LEARN
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          Topics built for <span className="text-gradient">beginners</span>, explained simply.
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">
          No jargon, no gatekeeping — just the fundamentals that actually keep you safe online.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CARDS.map(({ Icon, title, description, to, tag }) => (
          <motion.div key={title} variants={item}>
            <NavLink
              to={to}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-gradient-card p-6 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-glow)] hover:shadow-[var(--shadow-glow-md)]"
            >
              {/* hover sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white shadow-[var(--shadow-glow-sm)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <Badge variant="outline" size="sm">
                    {tag}
                  </Badge>
                </div>
                <h3 className="mt-5 flex items-center gap-1 font-display text-lg font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-electric-300)]">
                  {title}
                  <ArrowUpRight className="h-4 w-4 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {description}
                </p>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

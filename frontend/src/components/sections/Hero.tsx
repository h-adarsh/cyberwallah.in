import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Check, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthProvider";

const TERMINAL_LINES = [
  { prompt: "$", text: "whoami", type: "cmd" as const },
  { prompt: ">", text: "a curious beginner", type: "out" as const },
  { prompt: "$", text: "cyberwallah --learn", type: "cmd" as const },
  { prompt: "", text: "phishing · UPI fraud · digital arrest", type: "ok" as const },
  { prompt: "", text: "39+ terms decoded in plain English", type: "ok" as const },
  { prompt: "", text: "real case studies from India", type: "ok" as const },
  { prompt: ">", text: "ready when you are", type: "cursor" as const },
];

const TRUST = ["Students", "Professionals", "Parents", "Freshers"];

export function Hero() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { user, loading } = useAuth();
  const isAuthed = !loading && Boolean(user);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-4 pb-16 pt-16 sm:px-8 md:px-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
      {/* Left column */}
      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Badge */}
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-4 py-1.5 text-sm text-[var(--color-text-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-electric-500)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-electric-500)]" />
            </span>
            Free Cybersecurity Learning for India
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-7 font-display font-bold leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
        >
          <span className="text-[var(--color-text-primary)]">Learn </span>
          <span className="text-gradient-animated">Cybersecurity.</span>
          <br />
          <span className="text-[var(--color-text-primary)]">Start from </span>
          <span className="text-gradient">Zero</span>
          <span className="text-[var(--color-electric-400)]">.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]"
        >
          Free resources, real case studies, and weekly tips — decoded in plain English
          for students and professionals across India.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          {isAuthed ? (
            <Button size="lg" onClick={() => navigate("/dashboard")} icon={<LayoutDashboard />}>
              Go to Dashboard
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => navigate("/quiz")}
              icon={<ArrowRight />}
              iconPosition="right"
            >
              Take the Quiz
            </Button>
          )}
          <Button size="lg" variant="secondary" onClick={() => navigate("/dictionary")}>
            Browse Dictionary
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <ShieldCheck className="h-5 w-5 text-[var(--color-electric-400)]" />
            <span className="text-sm">
              <span className="font-semibold text-[var(--color-text-primary)]">5,000+</span> learners
            </span>
          </div>
          <div className="hidden h-4 w-px bg-[var(--color-border-default)] sm:block" />
          <div className="flex flex-wrap items-center gap-2">
            {TRUST.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/60 px-3 py-1 text-xs text-[var(--color-text-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right column — terminal window */}
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 26, scale: prefersReduced ? 1 : 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className="relative"
      >
        {/* Glow behind terminal */}
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-glow blur-2xl" />

        <div className="glass-strong relative overflow-hidden rounded-2xl border border-[var(--color-border-default)] shadow-[var(--shadow-elevated)]">
          {/* Scanline sweep — subtle CRT depth (complements the global background) */}
          {!prefersReduced && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 animate-scan bg-gradient-to-b from-transparent via-[var(--color-electric-500)]/[0.07] to-transparent" />
          )}

          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-[var(--color-text-dim)]">
              cyberwallah — zsh
            </span>
          </div>

          {/* Body */}
          <div className="space-y-2.5 p-5 font-mono text-sm sm:p-6">
            {TERMINAL_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: prefersReduced ? 0 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.28, ease: "easeOut" }}
                className="flex items-start gap-2 leading-relaxed"
              >
                {line.type === "cmd" && (
                  <>
                    <span className="text-[var(--color-electric-400)]">{line.prompt}</span>
                    <span className="text-[var(--color-text-primary)]">{line.text}</span>
                  </>
                )}
                {line.type === "out" && (
                  <span className="pl-5 text-[var(--color-text-muted)]">{line.text}</span>
                )}
                {line.type === "ok" && (
                  <>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-electric-400)]" />
                    <span className="text-[var(--color-text-secondary)]">{line.text}</span>
                  </>
                )}
                {line.type === "cursor" && (
                  <>
                    <span className="text-[var(--color-info)]">{line.prompt}</span>
                    <span className="text-[var(--color-text-primary)]">{line.text}</span>
                    <span className="inline-block h-[1.1em] w-[8px] translate-y-[0.1em] bg-[var(--color-electric-400)] animate-blink" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

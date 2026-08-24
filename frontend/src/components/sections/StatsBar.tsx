import { motion } from "framer-motion";
import { Users, BookOpen, BadgeIndianRupee, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCountUp } from "../../hooks/useReducedMotion";

interface Stat {
  end?: number;
  suffix?: string;
  text?: string;
  label: string;
  Icon: LucideIcon;
}

const STATS: Stat[] = [
  { end: 5000, suffix: "+", label: "Community Members", Icon: Users },
  { end: 50, suffix: "+", label: "Free Resources", Icon: BookOpen },
  { end: 100, suffix: "%", label: "Free, Always", Icon: BadgeIndianRupee },
  { text: "Weekly", label: "Newsletter", Icon: Mail },
];

function StatItem({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.end ?? 0);
  const display = stat.text ?? `${count.toLocaleString("en-IN")}${stat.suffix ?? ""}`;

  return (
    <div ref={ref} className="flex items-center gap-3.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-electric-950)]/50 text-[var(--color-electric-400)]">
        <stat.Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-display text-2xl font-bold tracking-tight text-gradient md:text-3xl">
          {display}
        </p>
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass grid grid-cols-2 gap-6 rounded-2xl border border-[var(--color-border-subtle)] px-6 py-7 shadow-[var(--shadow-glass)] sm:gap-8 sm:px-8 md:grid-cols-4 md:gap-4 md:px-10"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="relative flex items-center">
            <StatItem stat={stat} />
            {i < STATS.length - 1 && (
              <div className="absolute -right-3 hidden h-10 w-px bg-gradient-to-b from-transparent via-[var(--color-border-strong)] to-transparent md:block lg:-right-2" />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

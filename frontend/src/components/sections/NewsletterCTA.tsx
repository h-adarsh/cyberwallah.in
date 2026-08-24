import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BrainCircuit, ArrowRight, Clock, ListChecks, Trophy } from "lucide-react";
import { Button } from "../ui/Button";

const META = [
  { Icon: ListChecks, label: "10 questions" },
  { Icon: Clock, label: "~2 minutes" },
  { Icon: Trophy, label: "Instant score" },
];

export function NewsletterCTA() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-8 md:px-16 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border-gradient p-8 text-center shadow-[var(--shadow-glow-md)] sm:p-12 md:p-16"
      >
        {/* Ambient layers */}
        <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 bg-gradient-glow blur-2xl" />

        <div className="relative">
          <span className="mb-6 inline-grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-white shadow-[var(--shadow-glow-md)]">
            <BrainCircuit className="h-8 w-8" />
          </span>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            How <span className="text-gradient">cyber-safe</span> are you really?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-[var(--color-text-secondary)]">
            Take the quick quiz and find out where you stand — then learn exactly how to level up.
          </p>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {META.map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Icon className="h-4 w-4 text-[var(--color-electric-400)]" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Button size="xl" onClick={() => navigate("/quiz")} icon={<ArrowRight />} iconPosition="right">
              Start the Quiz
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

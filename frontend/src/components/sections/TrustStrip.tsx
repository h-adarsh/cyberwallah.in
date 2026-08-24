import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Real threats covered in the dictionary — honest "what we cover" signal, not fabricated press logos. */
const THREATS = [
  "Digital Arrest",
  "UPI Fraud",
  "OTP Fraud",
  "Phishing",
  "Aadhaar Fraud",
  "SIM Swap",
  "QR Code Scam",
  "Job Scam",
  "Fake Customer Care",
  "Pig Butchering",
  "Deepfake",
  "Vishing",
  "Smishing",
  "Ransomware",
];

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-[var(--color-text-muted)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-electric-500)]" />
      {label}
    </span>
  );
}

export function TrustStrip() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass flex flex-col gap-3 overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
          <ShieldAlert className="h-4 w-4 text-[var(--color-electric-400)]" />
          Decoding the scams targeting India
        </span>

        {prefersReduced ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {THREATS.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        ) : (
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="flex w-max animate-marquee gap-x-6">
              {THREATS.map((t) => (
                <Chip key={t} label={t} />
              ))}
              {THREATS.map((t) => (
                <Chip key={`dup-${t}`} label={t} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

import type { StatItem } from "../../types";

const STATS: StatItem[] = [
  { value: "5,000+", label: "Community Members" },
  { value: "50+", label: "Free Resources" },
  { value: "100%", label: "Free, Always" },
  { value: "Weekly", label: "Newsletter" },
];

export function StatsBar() {
  return (
    <section className="border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-10 grid grid-cols-2 md:flex md:items-center md:justify-between gap-6 md:gap-0">
        {STATS.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-8 md:gap-12">
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
            {i < STATS.length - 1 && (
              <div className="hidden md:block w-px h-10 bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
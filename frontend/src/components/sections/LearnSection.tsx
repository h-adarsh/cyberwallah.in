import type { LearnCard } from "../../types";

const CARDS: LearnCard[] = [
  {
    icon: "🛡️",
    title: "Ethical Hacking",
    description: "Learn how attackers think — and how to stop them.",
  },
  {
    icon: "🌐",
    title: "Network Security",
    description: "Understand firewalls, VPNs, and how data travels safely.",
  },
  {
    icon: "📖",
    title: "Cyber Dictionary",
    description: "Every term explained in plain, simple English.",
  },
  {
    icon: "🔍",
    title: "Real Case Studies",
    description: "Breakdowns of actual cyber attacks from around the world.",
  },
];

export function LearnSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-14 md:py-20">
      <h2 className="text-3xl font-bold mb-2">What You Will Learn</h2>
      <p className="text-gray-500 mb-10">
        Topics built for beginners, explained simply.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-blue-600/40 hover:bg-[#141414] transition-all group"
          >
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
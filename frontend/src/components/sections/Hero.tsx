import { useState } from "react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (email.trim()) setJoined(true);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-16 pt-20 pb-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-blue-300 text-sm">Free Cybersecurity Learning for India</span>
      </div>

      {/* Headline */}
      <h1 className="font-black leading-[1.0] tracking-[-3px] mb-8" style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
        <span className="text-slate-400">Learn </span>
        <span className="text-[#F8FAFC]">Cybersecurity.</span>
        <br />
        <span className="text-slate-400">Start from </span>
        <span className="text-[#F8FAFC]">Zero.</span>
      </h1>

      {/* Subtext */}
      <p className="text-[#475569] text-lg mb-10 leading-[1.7] max-w-xl">
        Free resources, real case studies, and weekly tips — for students and professionals.
      </p>

      {/* CTA */}
      {!joined ? (
        <div className="flex gap-3 max-w-xl mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            placeholder="Enter your email..."
            className="flex-1 bg-[#0D0D0D] border border-[#1E293B] rounded-xl px-5 text-[#F8FAFC] placeholder-[#475569] text-sm outline-none focus:border-blue-500 transition-colors"
            style={{ height: "52px" }}
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
            style={{ height: "52px" }}
          >
            Join Free →
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 max-w-xl mb-4 bg-green-950/40 border border-green-700/40 rounded-xl px-5 py-3">
          <span className="text-green-400">✓</span>
          <span className="text-green-300 text-sm">You're in! Welcome to CyberWallah.</span>
        </div>
      )}

      <p className="text-[#475569] text-sm flex items-center gap-2">
        <span className="text-green-500">✓</span>
        Join 5,000+ learners across India. Free, always.
      </p>
    </section>
  );
}
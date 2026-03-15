import { useState } from "react";
import { Badge } from "../ui/Badge";

export function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (email.trim()) setJoined(true);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-16 pt-20 pb-16">
      <Badge className="mb-8">Free Cybersecurity Learning for India</Badge>

      <h1 className="text-8xl md:text-9xl font-black leading-[1.0] tracking-tight mb-0">
        Learn Cybersecurity.
      </h1>
      <h1 className="text-8xl md:text-9xl font-black leading-[1.0] tracking-tight text-blue-500 mb-8">
        Start from Zero.
      </h1>

      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        Free resources, real case studies, and weekly tips — for students and professionals.
      </p>

      {!joined ? (
        <div className="flex max-w-2xl mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            placeholder="Enter your email..."
            className="flex-1 bg-[#141414] border border-white/10 rounded-l-xl px-5 h-14 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-14 rounded-r-xl text-sm font-semibold transition-colors whitespace-nowrap"
          >
            Join Free →
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 max-w-2xl mb-4 bg-green-950/40 border border-green-700/40 rounded-xl px-5 py-3">
          <span className="text-green-400">✓</span>
          <span className="text-green-300 text-sm">
            You're in! Welcome to CyberWallah.
          </span>
        </div>
      )}

      <p className="text-gray-500 text-sm flex items-center gap-2">
        <span className="text-green-500">✓</span>
        Join 5,000+ learners across India. Free, always.
      </p>
    </section>
  );
}
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

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

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/quiz")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Take the Quiz →
        </button>
        <button
          onClick={() => navigate("/dictionary")}
          className="border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors"
        >
          Browse Dictionary
        </button>
      </div>
    </section>
  );
}
import { useParams, useNavigate } from "react-router-dom";

import dictionaryData from "../data/dictionary.json";

export default function DictionaryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const term = dictionaryData.find((d) => d.slug === slug);

  if (!term) {
    return (
      <section className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="text-5xl mb-6">🔍</p>
        <h1 className="text-3xl font-bold mb-4">Term Not Found</h1>
        <p className="text-gray-500 mb-8">This term doesn't exist in our dictionary yet.</p>
        <button
          onClick={() => navigate("/dictionary")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          ← Back to Dictionary
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto px-16 py-16">
      {/* Back */}
      <button
        onClick={() => navigate("/dictionary")}
        className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-2 mb-10"
      >
        ← Back to Dictionary
      </button>

      {/* Letter badge */}
      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-6">
        {term.letter}
      </div>

      {/* Term heading */}
      <h1 className="text-5xl font-black mb-4">{term.term}</h1>

      {/* Divider */}
      <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Definition */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
            <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">
              What is it?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{term.definition}</p>
          </div>

          {/* Example */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
            <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">
              Real World Example
            </h2>
            <div className="flex gap-4">
              <div className="w-1 bg-blue-600 rounded-full shrink-0" />
              <p className="text-gray-300 text-base leading-relaxed italic">{term.example}</p>
            </div>
          </div>
        </div>

        {/* Tips sidebar */}
        <div className="bg-blue-950/30 border border-blue-800/30 rounded-2xl p-8 h-fit">
          <h2 className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-6">
            How to Stay Safe
          </h2>
          <div className="flex flex-col gap-4">
            {term.tips.map((tip, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related — next term */}
      <div className="mt-12 pt-8 border-t border-white/5">
        <p className="text-gray-600 text-sm mb-4">Continue Learning</p>
        <button
          onClick={() => navigate("/dictionary")}
          className="inline-flex items-center gap-2 bg-[#111] border border-white/5 hover:border-blue-600/40 hover:bg-[#141414] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all"
        >
          Browse All Terms →
        </button>
      </div>
    </section>
  );
}
import { useState, useMemo } from "react";
import { TermCard } from "../components/ui/TermCard";
import dictionaryData from "../data/dictionary.json";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Dictionary() {
  const [activeLetter, setActiveLetter] = useState<string>("A");
  const [search, setSearch] = useState("");

  const lettersWithData = useMemo(
    () => new Set(dictionaryData.map((d) => d.letter)),
    []
  );

  const filtered = useMemo(() => {
    if (search.trim()) {
      return dictionaryData.filter(
        (d) =>
          d.term.toLowerCase().includes(search.toLowerCase()) ||
          d.preview.toLowerCase().includes(search.toLowerCase())
      );
    }
    return dictionaryData.filter((d) => d.letter === activeLetter);
  }, [activeLetter, search]);

  return (
    <section className="max-w-[1400px] mx-auto px-16 py-16">
      <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-blue-300 text-sm">{dictionaryData.length}+ terms and growing</span>
      </div>
      <h1 className="text-5xl font-black mb-2">Cyber Dictionary</h1>
      <p className="text-gray-500 text-lg mb-10">
        Every cybersecurity term explained in plain, simple English.
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search terms... e.g. Phishing, VPN, Malware"
        className="w-full max-w-xl bg-[#141414] border border-white/10 focus:border-blue-500 rounded-xl px-5 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors mb-8"
      />

      {!search && (
        <div className="flex flex-wrap gap-2 mb-10">
          {ALPHABET.map((letter) => {
            const hasData = lettersWithData.has(letter);
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => hasData && setActiveLetter(letter)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white border border-blue-600"
                    : hasData
                    ? "bg-[#141414] text-gray-400 border border-white/10 hover:border-blue-600/50 hover:text-white cursor-pointer"
                    : "text-gray-700 border border-white/5 cursor-default"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      <p className="text-gray-600 text-sm mb-6">
        {search
          ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
          : `${filtered.length} term${filtered.length !== 1 ? "s" : ""} under "${activeLetter}"`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <TermCard
              key={item.slug}
              term={item.term}
              slug={item.slug}
              preview={item.preview}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">No terms found.</p>
          <p className="text-gray-600 text-sm mt-2">Try a different search or letter.</p>
        </div>
      )}
    </section>
  );
}
export default function CaseStudies() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-blue-300 text-sm">Coming Soon</span>
      </div>
      <h1 className="text-5xl font-black mb-4">Real World Cyber Attacks</h1>
      <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
        Breakdowns of actual cyber attacks — what happened, how it happened, and what we can learn.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-40 pointer-events-none select-none">
        {[
          { title: "The WannaCry Ransomware Attack", year: "2017", tag: "Ransomware" },
          { title: "Sony Pictures Data Breach", year: "2014", tag: "Data Breach" },
          { title: "Aadhaar Data Leak", year: "2018", tag: "Data Breach" },
          { title: "Colonial Pipeline Attack", year: "2021", tag: "Ransomware" },
          { title: "Twitter Bitcoin Scam", year: "2020", tag: "Social Engineering" },
          { title: "Zoom Bombing Incidents", year: "2020", tag: "Privacy" },
        ].map(({ title, year, tag }) => (
          <div key={title} className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <span className="text-xs text-blue-400 bg-blue-950/50 px-2 py-1 rounded-full">{tag}</span>
            <h3 className="text-white font-semibold mt-3 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{year} · Full breakdown coming soon</p>
          </div>
        ))}
      </div>
    </section>
  );
}
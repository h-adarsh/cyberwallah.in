export default function SecurityExplained() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-blue-300 text-sm">Coming Soon</span>
      </div>
      <h1 className="text-5xl font-black mb-4">Security Explained</h1>
      <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
        Breaking down cybersecurity concepts in a way that's easy to understand.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-40 pointer-events-none select-none">
        {[
          "How UPI Security Works",
          "How Does OAuth Work",
          "How HTTPS Protects You",
          "How Passwords Are Stored",
          "How Two-Factor Auth Works",
          "How End-to-End Encryption Works",
        ].map((topic) => (
          <div key={topic} className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">{topic}</h3>
            <p className="text-gray-600 text-sm">Explanation coming soon...</p>
          </div>
        ))}
      </div>
    </section>
  );
}

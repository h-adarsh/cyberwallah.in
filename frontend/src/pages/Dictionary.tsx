export default function Dictionary() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-blue-300 text-sm">Coming Soon</span>
      </div>
      <h1 className="text-5xl font-black mb-4">Cyber Dictionary</h1>
      <p className="text-gray-400 text-xl max-w-xl leading-relaxed">
        Every cybersecurity term explained in plain, simple English.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-40 pointer-events-none select-none">
        {["Phishing", "Malware", "Firewall", "VPN", "2FA", "Encryption"].map((term) => (
          <div key={term} className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-1">{term}</h3>
            <p className="text-gray-600 text-sm">Definition coming soon...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
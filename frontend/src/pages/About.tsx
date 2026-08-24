import SEO from "@/components/seo/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About CyberWallah"
        description="Learn about CyberWallah - India's free cybersecurity learning platform. Our mission, story, and team."
        canonical="https://cyberwallah.in/about"
      />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-electric-950)]/60 border border-[var(--color-border-default)] rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-electric-500)] animate-pulse" />
            <span className="text-[var(--color-electric-300)] text-sm">Free Cybersecurity Learning for India</span>
          </div>
          <h1 className="font-display text-5xl font-black mb-4 text-[var(--color-text-primary)]">About CyberWallah</h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
            Making cybersecurity accessible to every Indian — in languages they understand.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Our Mission</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Cybercrime in India is growing exponentially — from UPI fraud and digital arrest scams to phishing and identity theft. Yet, most cybersecurity resources are in complex technical English, leaving the majority of Indians vulnerable.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              CyberWallah exists to bridge this gap. We create free, practical cybersecurity content in English and Hinglish so that students, professionals, parents, and seniors can all learn to protect themselves online.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              No jargon. No gatekeeping. Just clear, actionable knowledge.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-primary)]">What We Do</h2>
            <div className="space-y-4">
              {[
                { title: "📖 Cyber Dictionary", desc: "100+ terms explained in plain English and Hinglish" },
                { title: "🧠 Interactive Quiz", desc: "Test your knowledge with real-world scenarios" },
                { title: "📝 Bilingual Blog", desc: "Scam breakdowns, guides, and awareness in EN + HI" },
                { title: "🎥 YouTube Channel", desc: "Video tutorials and case studies" },
                { title: "🔧 Curated Resources", desc: "Trusted tools, platforms, and learning paths" },
                { title: "📧 Weekly Newsletter", desc: "Practical tips delivered to your inbox" },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-5">
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="font-display text-3xl font-bold mb-4 text-center text-[var(--color-text-primary)]">Why "CyberWallah"?</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              <strong className="text-[var(--color-text-primary)]">Wallah (वाला)</strong> — a Hindi suffix meaning "the one who does" or "expert in."
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              A <em>chai-wallah</em> makes tea. A <em>sabzi-wallah</em> sells vegetables. A <strong className="text-[var(--color-text-primary)]">CyberWallah</strong> knows cybersecurity.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              It's approachable, distinctly Indian, and says exactly what we do.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "🇮🇳", title: "Made for India", desc: "Indian scams, Indian context, Indian languages" },
            { icon: "🆓", title: "Free Forever", desc: "No paywalls, no hidden costs — knowledge should be free" },
            { icon: "🤝", title: "Community First", desc: "Built with feedback from learners across India" },
          ].map((item, i) => (
            <div key={i} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2 text-[var(--color-text-primary)]">{item.title}</h3>
              <p className="text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-electric-950)]/30 border border-[var(--color-border-default)] rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-text-primary)]">Join the Movement</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
            Help us make India cyber-safe. Share our content, contribute terms, report scams, or just spread the word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/newsletter" className="bg-gradient-primary hover:shadow-[var(--shadow-glow-md)] transition-shadow text-white font-semibold px-8 py-3 rounded-xl">
              Subscribe to Newsletter
            </a>
            <a href="/contact" className="border border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] text-[var(--color-text-primary)] font-semibold px-8 py-3 rounded-xl transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
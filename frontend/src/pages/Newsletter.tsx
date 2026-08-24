import SEO from "@/components/seo/SEO";

export default function Newsletter() {
  return (
    <>
      <SEO
        title="Newsletter"
        description="Join the CyberWallah newsletter for practical cybersecurity updates and scam alerts."
        canonical="https://cyberwallah.in/newsletter"
      />
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="font-display text-5xl font-black mb-4 text-center text-[var(--color-text-primary)]">Join the Newsletter</h1>
        <p className="text-[var(--color-text-secondary)] text-lg text-center mb-10">
          Get simple and actionable cyber safety tips directly in your inbox.
        </p>
        <form
          className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4"
          action={import.meta.env.VITE_GOOGLE_SCRIPT_URL || undefined}
          method="POST"
          target="_blank"
        >
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-electric-500)] focus:shadow-[var(--shadow-glow-sm)] transition-all"
              placeholder="you@example.com"
            />
          </div>
          <button className="w-full bg-gradient-primary hover:shadow-[var(--shadow-glow-md)] transition-shadow text-white font-semibold rounded-xl px-4 py-3" type="submit">
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}

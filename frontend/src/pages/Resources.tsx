import SEO from "@/components/seo/SEO";
import { resources } from "@/data/resources";

export default function Resources() {
  return (
    <>
      <SEO
        title="Cybersecurity Resources"
        description="Curated cybersecurity tools and learning resources to improve your online safety."
        canonical="https://cyberwallah.in/resources"
      />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl font-black mb-4 text-[var(--color-text-primary)]">Resources</h1>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-3xl mb-10">
          A curated list of trusted platforms, tools, and learning paths. Some links may be affiliate links.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {resources.map((item) => (
            <article key={item.name} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-electric-950)]/60 text-[var(--color-electric-300)] font-semibold">
                  {item.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{item.free ? "Free" : "Paid"}</span>
              </div>
              <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">{item.name}</h2>
              <p className="text-[var(--color-text-secondary)] mb-4">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] font-semibold"
              >
                Visit Resource →
              </a>
              {item.affiliate && <p className="text-xs text-[var(--color-text-dim)] mt-3">Affiliate link</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

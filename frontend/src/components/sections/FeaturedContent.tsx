import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Youtube, Clock, Globe } from "lucide-react";
import { getBlogIndexEntries, getTranslation } from "../../data/blog-meta";

const YOUTUBE_CHANNEL = "https://youtube.com/@cyberwallah";

export function FeaturedContent() {
  const featured = getBlogIndexEntries()[0];
  if (!featured) return null;

  const hasHindi = Boolean(getTranslation(featured.slug, "en"));
  const date = new Date(featured.date).toLocaleDateString("en-IN", { dateStyle: "long" });

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 md:px-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 max-w-2xl"
      >
        <span className="font-mono text-sm tracking-widest text-[var(--color-electric-400)]">
          // LATEST GUIDE
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          Read it, or <span className="text-gradient">watch it</span>.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Featured guide */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-gradient p-8 shadow-[var(--shadow-glow-md)] sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-glow blur-2xl" />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--color-electric-500)]/15 px-2.5 py-1 text-xs font-semibold text-[var(--color-electric-300)]">
                EN
              </span>
              {hasHindi && (
                <span className="rounded-full bg-[var(--color-electric-950)]/60 px-2.5 py-1 text-xs font-semibold text-[var(--color-electric-300)]">
                  Hinglish available
                </span>
              )}
              {featured.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-border-subtle)] px-2.5 py-1 text-xs text-[var(--color-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold leading-tight text-[var(--color-text-primary)] md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">{featured.description}</p>
          </div>

          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-dim)]">
              <span>{date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {featured.readTime} min read
              </span>
            </div>
            <NavLink
              to={`/${featured.locale}/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-glow-md)]"
            >
              Read the guide
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </NavLink>
          </div>
        </motion.article>

        {/* YouTube CTA */}
        <motion.a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group flex flex-col justify-between rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-8 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-glow-md)]"
        >
          <div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-red-600/15 text-red-500 transition-transform duration-300 group-hover:scale-110">
              <Youtube className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-[var(--color-text-primary)]">
              Prefer to watch?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Scam breakdowns and safety tips in plain Hindi &amp; English — new videos on our YouTube channel.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-text-dim)]">
              <Globe className="h-3.5 w-3.5" /> Hindi &amp; English
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-red-400 transition-colors group-hover:text-red-300">
              Watch on YouTube
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

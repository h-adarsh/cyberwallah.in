import { useParams, useLocation } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { getPost, getTranslation } from "@/data/blog-meta";
import { getBlogIndexEntries } from "@/data/blog-meta";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  // Routes are registered as literal `en/blog/:slug` / `hi/blog/:slug`, so the
  // locale is a path segment (not a param) — derive it from the pathname.
  const currentLocale: "en" | "hi" = pathname.startsWith("/hi/") ? "hi" : "en";
  const post = slug ? getPost(slug, currentLocale) : null;
  const translation = slug ? getTranslation(slug, currentLocale) : null;
  const otherLocale = currentLocale === "en" ? "hi" : "en";

  if (!post) {
    return (
      <>
        <SEO
          title="Post Not Found"
          description="The blog post you're looking for doesn't exist."
          canonical={`https://cyberwallah.in/${currentLocale}/blog/${slug}`}
        />
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-4xl font-bold mb-4 text-[var(--color-text-primary)]">Post Not Found</h1>
          <p className="text-[var(--color-text-muted)] mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] underline">
            ← Back to Blog
          </a>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        keywords={post.tags.join(", ")}
        canonical={`https://cyberwallah.in/${currentLocale}/blog/${post.slug}`}
        alternateLocale={{
          locale: otherLocale,
          url: translation
            ? `https://cyberwallah.in/${otherLocale}/blog/${translation.slug}`
            : `https://cyberwallah.in/${otherLocale}/blog/${post.slug}`,
        }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Language switcher */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-2">
            <span className="text-xs text-[var(--color-text-dim)] uppercase tracking-wide">Language:</span>
            <a
              href={`/${currentLocale}/blog/${post.slug}`}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                currentLocale === "en"
                  ? "bg-gradient-primary text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-electric-500)]/10"
              }`}
            >
              EN
            </a>
            <a
              href={translation ? `/${otherLocale}/blog/${translation.slug}` : `/${otherLocale}/blog/${post.slug}`}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                currentLocale === "hi"
                  ? "bg-gradient-primary text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-electric-500)]/10"
              }`}
            >
              HI
            </a>
          </div>
        </div>

        {/* Post header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-[var(--color-electric-950)]/60 text-[var(--color-electric-300)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-[var(--color-text-primary)]">{post.title}</h1>
          <div className="flex items-center gap-4 text-[var(--color-text-dim)] text-sm">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        {/* Post content placeholder - replace with actual MDX content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-[var(--color-text-secondary)] mb-6 text-lg leading-relaxed">
            {post.description}
          </p>

          {/* TODO: Replace with actual MDX content rendering */}
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-8 mb-8">
            <p className="text-[var(--color-text-dim)] text-center">
              📝 <strong>Content coming soon!</strong> This post will be rendered from MDX files.
            </p>
            <p className="text-[var(--color-text-dim)] text-center mt-2">
              For now, visit <a href="https://youtube.com/@cyberwallah" target="_blank" rel="noopener noreferrer" className="text-[var(--color-electric-400)] hover:underline">YouTube</a> for video content on this topic.
            </p>
          </div>

          {/* Sample sections for structure */}
          <h2 className="font-display text-2xl font-bold mt-10 mb-4 text-[var(--color-text-primary)]">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--color-text-secondary)] mb-8">
            <li>How this scam works in the Indian context</li>
            <li>Red flags to watch out for</li>
            <li>Steps to protect yourself and others</li>
            <li>What to do if you've been targeted</li>
          </ul>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 text-[var(--color-text-primary)]">Key Takeaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { icon: "🛡️", title: "Stay Alert", desc: "Never share OTPs or personal info on calls" },
              { icon: "📞", title: "Verify Identity", desc: "Call back on official numbers only" },
              { icon: "🚨", title: "Report Immediately", desc: "Call 1930 (Cyber Crime Helpline)" },
              { icon: "🔒", title: "Secure Accounts", desc: "Enable 2FA on all important accounts" },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related posts */}
        <section className="mt-16 pt-8 border-t border-[var(--color-border-default)]">
          <h2 className="font-display text-2xl font-bold mb-6 text-[var(--color-text-primary)]">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getBlogIndexEntries()
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <a
                  key={related.slug}
                  href={`/${currentLocale}/blog/${related.slug}`}
                  className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-glow-sm)] transition-all"
                >
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-electric-400)] transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{related.description}</p>
                </a>
              ))}
          </div>
        </section>
      </article>
    </>
  );
}
import BlogCard from "@/components/blog/BlogCard";
import SEO from "@/components/seo/SEO";
import { getBlogIndexEntries, getTranslation } from "@/data/blog-meta";

export default function Blog() {
  const posts = getBlogIndexEntries();

  return (
    <>
      <SEO
        title="Cybersecurity Blog"
        description="Cyber scam breakdowns, practical safety guides, and awareness articles for India."
        canonical="https://cyberwallah.in/blog"
      />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="font-display text-5xl font-black mb-4 text-[var(--color-text-primary)]">CyberWallah Blog</h1>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-3xl mb-10">
          English-first posts with Hinglish translations so everyone can understand cybersecurity threats and stay safe.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={`${post.locale}-${post.slug}`} post={post} hasHindi={Boolean(getTranslation(post.slug, "en"))} />
          ))}
        </div>
      </section>
    </>
  );
}
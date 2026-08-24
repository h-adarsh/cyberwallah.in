import { Link } from "react-router-dom";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  hasHindi: boolean;
}

export default function BlogCard({ post, hasHindi }: BlogCardProps) {
  return (
    <article className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-6 hover:border-[var(--color-border-strong)] transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-electric-500)]/15 text-[var(--color-electric-300)] font-semibold">
          {post.locale.toUpperCase()}
        </span>
        {hasHindi && (
          <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-electric-950)]/60 text-[var(--color-electric-300)] font-semibold">
            Hinglish Available
          </span>
        )}
      </div>
      <h2 className="font-display text-2xl font-bold mb-2 text-[var(--color-text-primary)]">{post.title}</h2>
      <p className="text-[var(--color-text-secondary)] mb-4">{post.description}</p>
      <div className="text-xs text-[var(--color-text-muted)] mb-5">
        {new Date(post.date).toLocaleDateString("en-IN", { dateStyle: "long" })} · {post.readTime} min read
      </div>
      <Link
        to={`/${post.locale}/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] font-semibold"
      >
        Read Article →
      </Link>
    </article>
  );
}

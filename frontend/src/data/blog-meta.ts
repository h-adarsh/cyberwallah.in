import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "digital-arrest",
    locale: "en",
    title: "What Is Digital Arrest? The Truth Behind This Scam",
    description:
      "A clear breakdown of the Digital Arrest scam targeting people in India - how it works and how to stay safe.",
    date: "2025-06-01",
    tags: ["fraud", "india", "awareness"],
    readTime: 5,
    published: true,
  },
  {
    slug: "digital-arrest",
    locale: "hi",
    title: "Digital Arrest Kya Hai? Puri Sach Jaano",
    description:
      "India mein Digital Arrest scam ki poori explanation - kya hai, kaise kaam karta hai, aur kaise bachein.",
    date: "2025-06-01",
    tags: ["fraud", "india", "awareness"],
    readTime: 5,
    published: true,
  },
];

export function getPost(slug: string, locale: "en" | "hi") {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale && p.published);
}

export function getTranslation(slug: string, locale: "en" | "hi") {
  const other = locale === "en" ? "hi" : "en";
  return blogPosts.find((p) => p.slug === slug && p.locale === other && p.published);
}

export function getBlogIndexEntries() {
  const slugs = [...new Set(blogPosts.filter((p) => p.published).map((p) => p.slug))];
  return slugs
    .map((slug) => getPost(slug, "en") ?? getPost(slug, "hi")!)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

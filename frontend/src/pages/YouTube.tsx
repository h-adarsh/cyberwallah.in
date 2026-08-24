import SEO from "@/components/seo/SEO";
import { videos } from "@/data/videos";
import { format } from "date-fns";

export default function YouTube() {
  return (
    <>
      <SEO
        title="CyberWallah YouTube"
        description="Watch cybersecurity tutorials, scam breakdowns, and awareness videos in Hindi and English."
        canonical="https://cyberwallah.in/youtube"
      />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--color-electric-950)]/40 border border-[var(--color-border-default)] rounded-full px-4 py-2 mb-6">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              <path d="M10.03 16.697v-6.76l5.803 3.38-5.803 3.38z" />
            </svg>
            <span className="text-red-300 text-sm font-medium">YouTube Channel</span>
          </div>
          <h1 className="font-display text-5xl font-black mb-4 text-[var(--color-text-primary)]">CyberWallah on YouTube</h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-3xl mb-10">
            Practical cybersecurity tutorials, real scam breakdowns, and awareness content — in Hindi and English.
          </p>
        </header>

        {videos.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto text-[var(--color-text-dim)] mb-4" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              <path d="M10.03 16.697v-6.76l5.803 3.38-5.803 3.38z" />
            </svg>
            <p className="text-[var(--color-text-muted)] text-lg mb-2">No videos yet</p>
            <p className="text-[var(--color-text-dim)] text-sm">Videos will appear here once added to the data file.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-glow-sm)] transition-all group"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-[var(--color-bg-deep)] relative">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={`Watch: ${video.title}`}
                  >
                    <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600/40 transition-colors">
                      <svg className="w-8 h-8 text-red-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </a>
                  <div className="absolute bottom-2 right-2 bg-[var(--color-bg-deep)]/80 text-white text-xs px-2 py-1 rounded">
                    {format(new Date(video.date), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[var(--color-electric-950)]/60 border border-[var(--color-border-default)] rounded-full text-xs text-[var(--color-electric-300)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-electric-400)] transition-colors">
                    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                      {video.title}
                    </a>
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Watch on YouTube
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[var(--color-electric-950)]/30 border border-[var(--color-border-default)] rounded-3xl p-8 sm:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-[var(--color-text-primary)]">Subscribe for More</h2>
            <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              New videos every week on cybersecurity, scams, and digital safety.
            </p>
            <a
              href="https://youtube.com/@cyberwallah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-colors text-white font-semibold px-8 py-3 rounded-2xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <path d="M10.03 16.697v-6.76l5.803 3.38-5.803 3.38z" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
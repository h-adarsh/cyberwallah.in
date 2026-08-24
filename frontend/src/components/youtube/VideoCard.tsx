import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-5">
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">{video.title}</h2>
        <p className="text-[var(--color-text-secondary)] mb-3">{video.description}</p>
        <div className="text-xs text-[var(--color-text-muted)]">
          {new Date(video.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
        </div>
      </div>
    </article>
  );
}

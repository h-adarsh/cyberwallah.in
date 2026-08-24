import { useNavigate } from "react-router-dom";

interface TermCardProps {
  term: string;
  slug: string;
  preview: string;
}

export function TermCard({ term, slug, preview }: TermCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dictionary/${slug}`)}
      className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-2xl p-5 cursor-pointer hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-glow-sm)] transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[var(--color-text-primary)] font-bold text-base group-hover:text-[var(--color-electric-400)] transition-colors">
          {term}
        </h3>
        <span className="text-[var(--color-electric-500)] text-lg">→</span>
      </div>
      <p className="text-[var(--color-text-dim)] text-sm leading-relaxed line-clamp-2">{preview}</p>
    </div>
  );
}
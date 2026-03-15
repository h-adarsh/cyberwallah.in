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
      className="bg-[#111] border border-white/5 rounded-2xl p-5 cursor-pointer hover:border-blue-600/40 hover:bg-[#141414] transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-base group-hover:text-blue-400 transition-colors">
          {term}
        </h3>
        <span className="text-blue-500 text-lg">→</span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{preview}</p>
    </div>
  );
}
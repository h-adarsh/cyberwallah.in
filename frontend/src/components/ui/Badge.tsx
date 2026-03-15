import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 rounded-full px-4 py-2",
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span className="text-blue-300 text-sm">{children}</span>
    </div>
  );
}
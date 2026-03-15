import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-400">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full bg-[#141414] border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
}
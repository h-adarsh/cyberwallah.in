import type { ReactNode, HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
}

const variantStyles = {
  default:
    "glass border-[var(--color-border-default)] text-[var(--color-electric-400)]",
  success:
    "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-none",
  warning:
    "bg-gradient-to-r from-amber-500 to-orange-500 text-[var(--color-bg-deep)] border-none",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white border-none",
  outline:
    "bg-transparent border-[var(--color-border-default)] text-[var(--color-electric-400)] hover:border-[var(--color-border-glow)] hover:bg-[var(--color-electric-950)]",
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-base gap-2",
};

export const Badge = Object.assign(
  function Badge({
    children,
    variant = "default",
    size = "md",
    dot = false,
    dotColor,
    className,
    ...props
  }: BadgeProps) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-medium rounded-full transition-all duration-200",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "rounded-full animate-pulse",
              size === "sm" && "w-1.5 h-1.5",
              size === "md" && "w-2 h-2",
              size === "lg" && "w-2.5 h-2.5"
            )}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
  {
    displayName: "Badge",
  }
) as ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLSpanElement>>;
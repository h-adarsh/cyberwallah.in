import type { ButtonHTMLAttributes, ReactNode, ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

const variantStyles = {
  primary:
    "bg-gradient-primary text-white shadow-[var(--shadow-glow-sm)] hover:shadow-[var(--shadow-glow-md)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-electric-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
  secondary:
    "glass border border-[var(--color-border-strong)] text-[var(--color-electric-400)] hover:bg-[var(--color-electric-950)] hover:text-[var(--color-electric-300)] hover:border-[var(--color-border-glow)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-electric-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
  outline:
    "bg-transparent border border-[var(--color-border-default)] text-[var(--color-electric-400)] hover:bg-[var(--color-electric-950)] hover:border-[var(--color-border-strong)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-electric-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-electric-400)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--color-electric-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm h-8",
  md: "px-6 py-3 text-sm h-10",
  lg: "px-8 py-3.5 text-base h-12",
  xl: "px-10 py-4 text-lg h-14",
};

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

export const Button = Object.assign(
  function Button({
    variant = "primary",
    size = "md",
    children,
    loading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    className,
    disabled,
    ...props
  }: ButtonProps) {
    const prefersReduced = useReducedMotion();

    const isDisabled = disabled || loading;

    return (
      <motion.button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        whileHover={prefersReduced || isDisabled ? undefined : { scale: 1.01 }}
        whileTap={prefersReduced || isDisabled ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className={cn("animate-spin", iconSizes[size])}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className={cn("flex-shrink-0", iconSizes[size])} aria-hidden="true">
                {icon}
              </span>
            )}
            <span>{children}</span>
            {icon && iconPosition === "right" && (
              <span className={cn("flex-shrink-0", iconSizes[size])} aria-hidden="true">
                {icon}
              </span>
            )}
          </>
        )}
      </motion.button>
    );
  },
  {
    displayName: "Button",
  }
) as ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export default Button;
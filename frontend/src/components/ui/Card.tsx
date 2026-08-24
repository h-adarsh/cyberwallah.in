import type { ReactNode, HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CardProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  variant?: "default" | "glass" | "glow" | "interactive";
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const variantStyles = {
  default:
    "bg-gradient-card border-[var(--color-border-subtle)] shadow-[var(--shadow-elevated)]",
  glass:
    "glass shadow-[var(--shadow-glass)]",
  glow:
    "bg-gradient-card border-gradient shadow-[var(--shadow-glow-md)]",
  interactive:
    "bg-gradient-card border-[var(--color-border-subtle)] shadow-[var(--shadow-elevated)] cursor-pointer",
};

const hoverStyles = {
  default: "",
  glass: "",
  glow: "",
  interactive:
    "hover:border-[var(--color-border-glow)] hover:shadow-[var(--shadow-glow-lg)]",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export const Card = Object.assign(
  function Card({
    variant = "default",
    children,
    hover = false,
    padding = "md",
    className,
    ...props
  }: CardProps) {
    const prefersReduced = useReducedMotion();
    const isInteractive = variant === "interactive" && hover;

    return (
      <motion.div
        className={cn(
          "rounded-2xl transition-all duration-300",
          variantStyles[variant],
          hover && hoverStyles[variant],
          paddingStyles[padding],
          isInteractive && "hover:-translate-y-1",
          className
        )}
        whileHover={prefersReduced || !isInteractive ? undefined : { y: -4 }}
        whileTap={prefersReduced || !isInteractive ? undefined : { scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
  {
    displayName: "Card",
  }
) as ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

/**
 * Card sub-components for structured layouts
 */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = Object.assign(
  function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
      <div className={cn("mb-4", className)} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "CardHeader" }
);

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
}

export const CardTitle = Object.assign(
  function CardTitle({ children, as: Component = "h3", gradient = false, className, ...props }: CardTitleProps) {
    return (
      <Component
        className={cn(
          "font-display font-bold text-[var(--color-text-primary)]",
          gradient && "text-gradient",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
  { displayName: "CardTitle" }
);

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = Object.assign(
  function CardDescription({ children, className, ...props }: CardDescriptionProps) {
    return (
      <p className={cn("text-[var(--color-text-secondary)] mt-1", className)} {...props}>
        {children}
      </p>
    );
  },
  { displayName: "CardDescription" }
);

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = Object.assign(
  function CardContent({ children, className, ...props }: CardContentProps) {
    return (
      <div className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "CardContent" }
);

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = Object.assign(
  function CardFooter({ children, className, ...props }: CardFooterProps) {
    return (
      <div className={cn("mt-4 pt-4 border-t border-[var(--color-border-subtle)] flex items-center gap-2", className)} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "CardFooter" }
);

export default Card;
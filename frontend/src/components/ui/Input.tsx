import type { InputHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "../../lib/utils";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = Object.assign(
  function Input({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className,
    id: providedId,
    disabled,
    required,
    ...props
  }: InputProps) {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    const describedBy = [hasError && errorId, helperText && helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            {label}
            {required && <span className="text-[var(--color-danger)] ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            id={id}
            className={cn(
              "w-full bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] placeholder-[var(--color-text-dim)] rounded-xl outline-none transition-all duration-200",
              "border",
              hasError
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]"
                : "border-[var(--color-border-subtle)] focus:border-[var(--color-electric-500)] focus:ring-[var(--color-electric-500)]",
              "focus:ring-2 focus:ring-opacity-20",
              leftIcon ? "pl-12" : "px-4",
              rightIcon ? "pr-12" : "px-4",
              "py-3 text-sm",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            aria-required={required}
            {...props}
          />

          {rightIcon && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] pointer-events-none"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {hasError && (
          <p id={errorId} className="text-sm text-[var(--color-danger)] flex items-center gap-1" role="alert">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {!hasError && helperText && (
          <p id={helperId} className="text-sm text-[var(--color-text-dim)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
  {
    displayName: "Input",
  }
) as ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;
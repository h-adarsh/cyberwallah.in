import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Fixed, non-interactive ambient background used site-wide.
 * Layers: deep gradient base → faint grid → drifting green/cyan glow blobs → top mesh glow → vignette.
 */
export function Background() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg-deep)]"
    >
      {/* Deep vertical gradient base */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Faint tech grid, faded toward edges */}
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />

      {/* Top mesh glow */}
      <div className="absolute inset-x-0 -top-40 h-[60vh] bg-gradient-mesh" />

      {/* Drifting glow blobs */}
      <div
        className={`absolute -left-40 top-[-10%] h-[46rem] w-[46rem] rounded-full blur-[130px] ${
          prefersReduced ? "" : "animate-float"
        }`}
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.16), transparent 65%)" }}
      />
      <div
        className={`absolute -right-52 top-[35%] h-[42rem] w-[42rem] rounded-full blur-[140px] ${
          prefersReduced ? "" : "animate-float-slow"
        }`}
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.14), transparent 65%)" }}
      />
      <div
        className="absolute left-1/2 bottom-[-15%] h-[38rem] w-[70rem] -translate-x-1/2 rounded-full blur-[150px]"
        style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.10), transparent 70%)" }}
      />

      {/* Subtle top-down vignette to anchor content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_35%,rgba(3,7,6,0.55)_100%)]" />
    </div>
  );
}

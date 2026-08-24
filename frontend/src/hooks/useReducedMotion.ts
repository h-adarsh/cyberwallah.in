import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Hook to detect and respect user's reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/**
 * Hook for creating consistent transition objects for Framer Motion
 */
export function useTransition(
  duration: "fast" | "base" | "slow" = "base",
  type: "ease" | "spring" = "ease"
): { duration: number; ease: number[] } | { type: "spring"; stiffness: number; damping: number } {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return { duration: 0.01, ease: [0, 1] };
  }

  const durations = {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
  };

  if (type === "spring") {
    return {
      type: "spring",
      stiffness: 300,
      damping: 30,
    };
  }

  return {
    duration: durations[duration],
    ease: [0.16, 1, 0.3, 1],
  };
}

/**
 * Hook for creating staggered animation variants
 */
export function useStagger(
  staggerChildren = 0.08,
  delayChildren = 0
): {
  hidden: { opacity: number };
  visible: { opacity: number; transition: { staggerChildren: number; delayChildren: number } };
} {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

/**
 * Hook for creating slide-up animation variants
 */
export function useSlideUp(
  distance = 20,
  duration: "fast" | "base" | "slow" = "base"
): {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number; transition: { duration: number; ease: number[] } };
} {
  const prefersReduced = useReducedMotion();
  const transition = useTransition(duration);

  if (prefersReduced) {
    return {
      hidden: { opacity: 0, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.01, ease: [0, 1] } },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: transition as { duration: number; ease: number[] },
    },
  };
}

/**
 * Hook for creating scale animation variants
 */
export function useScale(
  duration: "fast" | "base" | "slow" = "fast"
): {
  hidden: { opacity: number; scale: number };
  visible: { opacity: number; scale: number; transition: { duration: number; ease: number[] } };
} {
  const prefersReduced = useReducedMotion();
  const transition = useTransition(duration);

  if (prefersReduced) {
    return {
      hidden: { opacity: 0, scale: 1 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.01, ease: [0, 1] } },
    };
  }

  return {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transition as { duration: number; ease: number[] },
    },
  };
}

/**
 * Hook for creating fade animation variants
 */
export function useFade(
  duration: "fast" | "base" | "slow" = "base"
): {
  hidden: { opacity: number };
  visible: { opacity: number; transition: { duration: number; ease: number[] } };
} {
  const prefersReduced = useReducedMotion();
  const transition = useTransition(duration);

  if (prefersReduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01, ease: [0, 1] } },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transition as { duration: number; ease: number[] },
    },
  };
}

/**
 * Hook for animated counter (count up animation)
 */
export function useCountUp(
  end: number,
  duration = 1500,
  startOnView = true
): { count: number; ref: (node: HTMLDivElement | null) => void; isInView: boolean } {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const prefersReduced = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (startOnView) {
            observerRef.current?.unobserve(node);
          }
        } else if (!startOnView) {
          setIsInView(false);
        }
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }
    );

    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [startOnView]);

  useEffect(() => {
    if (!startOnView || !isInView) return;
    if (prefersReduced) {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, startOnView, prefersReduced]);

  return { count, ref, isInView };
}
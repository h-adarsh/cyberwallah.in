// Design tokens exported for JavaScript/TypeScript usage
// These mirror the CSS custom properties in index.css

export const colors = {
  // Base layers
  bg: {
    deep: '#030706',
    base: '#06120d',
    elevated: '#0a1a14',
    glass: 'rgba(10, 26, 20, 0.7)',
  },

  // Borders
  border: {
    subtle: 'rgba(34, 197, 94, 0.08)',
    default: 'rgba(34, 197, 94, 0.15)',
    strong: 'rgba(34, 197, 94, 0.3)',
    glow: 'rgba(34, 197, 94, 0.5)',
  },

  // Electric green scale
  electric: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#22c65e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Semantic colors
  text: {
    primary: '#f0fdf4',
    secondary: '#86efac',
    muted: '#4ade80',
    dim: '#3f9e63',   // ~5.7:1 on bg — safe for readable microcopy (was #166534)
  },

  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',

  // Gradients (for JS usage - e.g., Framer Motion, Canvas)
  gradients: {
    primary: 'linear-gradient(135deg, #22c65e 0%, #06b6d4 100%)',
    hero: 'linear-gradient(135deg, #052e16 0%, #06120d 50%, #030706 100%)',
    card: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.03) 100%)',
    glow: 'radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)',
    border: 'linear-gradient(135deg, #22c65e, #06b6d4, #22c65e)',
    text: 'linear-gradient(135deg, #22c65e 0%, #34d399 50%, #06b6d4 100%)',
    mesh: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,197,94,0.15), transparent)',
  },

  // Shadows
  shadows: {
    glowSm: '0 0 20px rgba(34, 197, 94, 0.15)',
    glowMd: '0 0 40px rgba(34, 197, 94, 0.2)',
    glowLg: '0 0 60px rgba(34, 197, 94, 0.25)',
    elevated: '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
};

export const radius = {
  xs: '0.375rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const animation = {
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
  },
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const typography = {
  fonts: {
    display: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  sizes: {
    displayXl: 'clamp(4rem, 8vw, 7rem)',
    displayLg: 'clamp(3rem, 6vw, 5rem)',
    displayMd: 'clamp(2.25rem, 4vw, 3.5rem)',
    displaySm: 'clamp(1.75rem, 3vw, 2.5rem)',
    xl: '1.25rem',
    lg: '1.125rem',
    base: '1rem',
    sm: '0.875rem',
    xs: '0.75rem',
  },
};

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
};

export const zIndex = {
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
};

// Component-specific token groups
export const buttonTokens = {
  heights: {
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '56px',
  },
  variants: {
    primary: {
      bg: 'linear-gradient(135deg, #22c65e 0%, #06b6d4 100%)',
      text: '#ffffff',
      hoverShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
      activeScale: 0.97,
    },
    secondary: {
      bg: 'rgba(10, 26, 20, 0.7)',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '#22c65e',
      hoverBg: 'rgba(34, 197, 94, 0.1)',
      hoverText: '#34d399',
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '#22c65e',
      hoverBg: 'rgba(34, 197, 94, 0.1)',
    },
    ghost: {
      bg: 'transparent',
      text: '#86efac',
      hoverBg: 'rgba(255, 255, 255, 0.05)',
      hoverText: '#22c65e',
    },
    danger: {
      bg: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      text: '#ffffff',
      hoverShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
      activeScale: 0.97,
    },
  },
};

export const cardTokens = {
  variants: {
    default: {
      bg: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.03) 100%)',
      border: 'rgba(34, 197, 94, 0.08)',
      shadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
      hoverBorder: 'rgba(34, 197, 94, 0.3)',
      hoverShadow: '0 0 40px rgba(34, 197, 94, 0.2)',
      hoverTransform: 'translateY(-4px)',
    },
    glass: {
      bg: 'rgba(10, 26, 20, 0.7)',
      border: 'rgba(34, 197, 94, 0.15)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    glow: {
      bg: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.03) 100%)',
      border: 'linear-gradient(135deg, #22c65e, #06b6d4, #22c65e)',
      shadow: '0 0 40px rgba(34, 197, 94, 0.2)',
    },
    interactive: {
      bg: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.03) 100%)',
      border: 'rgba(34, 197, 94, 0.08)',
      shadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
      hoverBorder: 'rgba(34, 197, 94, 0.5)',
      hoverShadow: '0 0 60px rgba(34, 197, 94, 0.25)',
      hoverTransform: 'translateY(-4px)',
    },
  },
};

export const inputTokens = {
  base: {
    bg: '#0a1a14',
    border: 'rgba(34, 197, 94, 0.08)',
    text: '#f0fdf4',
    placeholder: '#166534',
  },
  focus: {
    border: '#22c65e',
    ring: 'rgba(34, 197, 94, 0.2)',
    shadow: '0 0 20px rgba(34, 197, 94, 0.15)',
  },
  error: {
    border: '#ef4444',
    ring: 'rgba(239, 68, 68, 0.2)',
  },
  label: {
    color: '#86efac',
    marginBottom: '0.375rem',
  },
  helper: {
    color: '#166534',
    marginTop: '0.375rem',
  },
};

export const badgeTokens = {
  variants: {
    default: {
      bg: 'rgba(10, 26, 20, 0.7)',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '#22c65e',
    },
    success: {
      bg: 'linear-gradient(135deg, #22c65e 0%, #16a34a 100%)',
      text: '#ffffff',
    },
    warning: {
      bg: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      text: '#030706',
    },
    danger: {
      bg: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
      text: '#ffffff',
    },
    outline: {
      bg: 'transparent',
      border: 'rgba(34, 197, 94, 0.3)',
      text: '#22c65e',
    },
  },
};

// Helper to get CSS custom property value
export function getCSSVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Motion variants for Framer Motion
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  pageTransition: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
  },
};

// Export all tokens as a single object for convenience
export const designTokens = {
  colors,
  radius,
  animation,
  typography,
  breakpoints,
  zIndex,
  buttonTokens,
  cardTokens,
  inputTokens,
  badgeTokens,
  motionVariants,
};

export default designTokens;
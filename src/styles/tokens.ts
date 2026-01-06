/**
 * Design Tokens - "Golden Noir" Theme
 * Forsythia Yellow (#F4D000) as the signature accent
 * Warm, sophisticated, and distinctively crafted
 */

export const colors = {
  // Backgrounds - Deep charcoal with warm undertones
  bg: '#0a0a0a',
  surface: '#121212',
  surface2: '#1a1a1a',
  surfaceGlow: 'rgba(244, 208, 0, 0.03)',

  // Text - Warm whites
  text: '#fafafa',
  muted: '#a3a3a3',
  faint: '#737373',

  // Border
  border: '#262626',
  borderGlow: 'rgba(244, 208, 0, 0.15)',

  // Primary accent - Forsythia Yellow (signature color)
  accent: {
    primary: '#F4D000',
    primaryGlow: 'rgba(244, 208, 0, 0.4)',
    secondary: '#D4A000', // Amber gold - deeper, harmonious
    secondaryGlow: 'rgba(212, 160, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #F4D000 0%, #E8B800 50%, #D4A000 100%)',
    gradientHover: 'linear-gradient(135deg, #FFE566 0%, #F4D000 50%, #E8B800 100%)',
    // Solid fallbacks
    solid: '#F4D000',
    solidHover: '#FFE566',
  },

  // Semantic colors
  highlight: '#E8B800', // Golden amber for special highlights
  cyan: '#F4D000', // Using primary for consistency
  success: '#4ade80',
} as const;

export const typography = {
  fontFamily: {
    // Syne for display - geometric, bold, distinctive
    display: '"Syne", "Pretendard Variable", sans-serif',
    // Pretendard for body - excellent CJK support
    sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    // JetBrains Mono for code
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  },

  // Bolder type scale for impact
  h1: {
    size: 'clamp(2.5rem, 6vw, 4rem)', // 40-64px responsive
    lineHeight: 1.05,
    weight: 800,
    letterSpacing: '-0.03em',
  },
  h2: {
    size: 'clamp(1.75rem, 4vw, 2.5rem)', // 28-40px responsive
    lineHeight: 1.1,
    weight: 700,
    letterSpacing: '-0.02em',
  },
  h3: {
    size: '1.25rem', // 20px
    lineHeight: 1.25,
    weight: 600,
    letterSpacing: '-0.01em',
  },
  body: {
    size: '1rem', // 16px
    lineHeight: 1.7,
    weight: 400,
  },
  small: {
    size: '0.875rem', // 14px
    lineHeight: 1.6,
    weight: 400,
  },
  caption: {
    size: '0.75rem', // 12px
    lineHeight: 1.5,
    weight: 500,
    letterSpacing: '0.02em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const;

export const layout = {
  maxWidth: '860px',
  proseWidth: '68ch',
  containerPadding: 'clamp(1rem, 5vw, 2rem)',
  navHeight: '56px',
} as const;

export const transition = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const;

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
} as const;

// Gradient text mixin (for use in css template literals)
export const gradientText = `
  background: ${colors.accent.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const gradientTextHover = `
  background: ${colors.accent.gradientHover};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// Electric glow effect
export const glowEffect = `
  text-shadow: 0 0 20px ${colors.accent.primaryGlow},
               0 0 40px ${colors.accent.primaryGlow};
`;

// Noise background overlay
export const noiseOverlay = `
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }
`;

// Animation keyframes as strings
export const animations = {
  fadeInUp: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  glow: `
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px ${colors.accent.primaryGlow};
      }
      50% {
        box-shadow: 0 0 40px ${colors.accent.primaryGlow}, 0 0 60px ${colors.accent.secondaryGlow};
      }
    }
  `,
};

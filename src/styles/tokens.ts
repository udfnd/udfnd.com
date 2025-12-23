/**
 * Design Tokens - Palette B (Charcoal + Paper)
 * Gradient accent color
 */

export const colors = {
  // Backgrounds
  bg: '#111111',
  surface: '#171717',
  surface2: '#1E1E1E',

  // Text
  text: '#F2F2F2',
  muted: '#B9B9B9',
  faint: '#8A8A8A',

  // Border
  border: '#2A2A2A',

  // Accent gradient
  accent: {
    from: '#F4D000', // forsythia yellow
    to: '#FF6B35', // warm orange
    gradient: 'linear-gradient(135deg, #F4D000 0%, #FF6B35 100%)',
    gradientHover: 'linear-gradient(135deg, #FFE066 0%, #FF8855 100%)',
    // Solid fallbacks
    solid: '#F4D000',
    solidHover: '#FFE066',
  },
} as const;

export const typography = {
  fontFamily: {
    sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  },

  // Type scale per spec
  h1: {
    size: '2.5rem', // 40px
    lineHeight: 1.15,
    weight: 750,
  },
  h2: {
    size: '1.75rem', // 28px
    lineHeight: 1.2,
    weight: 700,
  },
  h3: {
    size: '1.25rem', // 20px
    lineHeight: 1.3,
    weight: 650,
  },
  body: {
    size: '1rem', // 16px
    lineHeight: 1.65,
    weight: 450,
  },
  small: {
    size: '0.875rem', // 14px
    lineHeight: 1.6,
    weight: 450,
  },
  caption: {
    size: '0.75rem', // 12px
    lineHeight: 1.5,
    weight: 500,
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

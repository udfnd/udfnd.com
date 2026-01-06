'use client';

import { css, keyframes } from '@emotion/css';
import { colors } from '@/styles/tokens';

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(10%, 15%) scale(1.1); }
  50% { transform: translate(-5%, 10%) scale(0.95); }
  75% { transform: translate(15%, -10%) scale(1.05); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-15%, -10%) scale(1.05); }
  50% { transform: translate(10%, -15%) scale(1.1); }
  75% { transform: translate(-10%, 5%) scale(0.95); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20%, 10%) scale(1.15); }
  66% { transform: translate(-15%, -20%) scale(0.9); }
`;

const containerStyles = css`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

const gradientOrbStyles = css`
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  will-change: transform;
`;

const orb1Styles = css`
  ${gradientOrbStyles}
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, ${colors.accent.primary} 0%, transparent 70%);
  top: -200px;
  right: -200px;
  animation: ${float1} 20s ease-in-out infinite;
  opacity: 0.15;
`;

const orb2Styles = css`
  ${gradientOrbStyles}
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, ${colors.accent.secondary} 0%, transparent 70%);
  bottom: -150px;
  left: -150px;
  animation: ${float2} 25s ease-in-out infinite;
  opacity: 0.12;
`;

const orb3Styles = css`
  ${gradientOrbStyles}
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, ${colors.cyan} 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${float3} 30s ease-in-out infinite;
  opacity: 0.08;
`;

const gridOverlayStyles = css`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(${colors.border} 1px, transparent 1px),
    linear-gradient(90deg, ${colors.border} 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 20%, transparent 100%);
`;

export default function AnimatedBackground() {
  return (
    <div className={containerStyles} aria-hidden="true">
      <div className={orb1Styles} />
      <div className={orb2Styles} />
      <div className={orb3Styles} />
      <div className={gridOverlayStyles} />
    </div>
  );
}

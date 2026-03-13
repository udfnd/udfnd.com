'use client';

import { useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { colors } from '@/styles/tokens';

const containerStyles = css`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
`;

const bgImageStyles = css`
  position: absolute;
  inset: 0;
  background: url('/images/background.webp') center center / contain no-repeat;
`;

const overlayStyles = css`
  position: absolute;
  inset: 0;
  background: black;
  will-change: -webkit-mask-image;
  -webkit-mask-image: radial-gradient(circle 160px at -9999px -9999px, rgba(0,0,0,0.6) 20%, black 70%);
  mask-image: radial-gradient(circle 160px at -9999px -9999px, rgba(0,0,0,0.6) 20%, black 70%);
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const LERP = 0.12;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;

      const gradient = `radial-gradient(circle 160px at ${cur.x}px ${cur.y}px, rgba(0,0,0,0.6) 20%, black 70%)`;
      overlay.style.webkitMaskImage = gradient;
      overlay.style.maskImage = gradient;

      if (activeRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (!activeRef.current) {
        activeRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onMove = (x: number, y: number) => {
      if (currentRef.current.x === -9999) {
        currentRef.current = { x, y };
      }
      targetRef.current = { x, y };
      startLoop();
    };

    const handleMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={containerStyles} aria-hidden="true">
      <div className={bgImageStyles} />
      <div ref={overlayRef} className={overlayStyles} />
      <div className={gridOverlayStyles} />
    </div>
  );
}

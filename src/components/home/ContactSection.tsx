'use client';

import { css, keyframes } from '@emotion/css';
import { colors, typography, layout, spacing, radius } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const sectionStyles = css`
  padding: ${spacing[24]} ${layout.containerPadding};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 40% at 50% 100%, rgba(244, 208, 0, 0.08) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

const labelStyles = css`
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.caption.size};
  color: ${colors.accent.primary};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: ${spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[3]};

  &::before,
  &::after {
    content: '';
    width: 24px;
    height: 1px;
    background: ${colors.accent.primary};
  }
`;

const titleStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  line-height: ${typography.h2.lineHeight};
  letter-spacing: ${typography.h2.letterSpacing};
  color: ${colors.text};
  margin-bottom: ${spacing[6]};
`;

const descriptionStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: 600px;
  margin: 0 auto ${spacing[10]};
`;

const ctaContainerStyles = css`
  display: inline-block;
  position: relative;
`;

const emailStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[3]};
  font-family: ${typography.fontFamily.display};
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  text-decoration: none;
  color: ${colors.bg};
  background: ${colors.accent.gradient};
  background-size: 200% auto;
  padding: ${spacing[5]} ${spacing[8]};
  border-radius: ${radius.lg};
  position: relative;
  overflow: hidden;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 3s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px ${colors.accent.primaryGlow}, 0 0 0 2px ${colors.accent.primary};
    animation: ${shimmer} 1.5s ease-in-out infinite;
  }

  &:active {
    transform: translateY(0);
  }
`;

const arrowStyles = css`
  transition: transform 300ms ease;
  
  ${ctaContainerStyles}:hover & {
    transform: translateX(4px);
  }
`;

const statusStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  margin-top: ${spacing[8]};
  font-size: ${typography.small.size};
  color: ${colors.faint};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.success};
    animation: ${pulse} 2s ease-in-out infinite;
    box-shadow: 0 0 8px ${colors.success};
  }
`;

export default function ContactSection() {
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section id="contact" className={sectionStyles}>
      <div className={containerStyles}>
        <p className={labelStyles}>Get in Touch</p>
        <h2 className={titleStyles}>{t.contact.title}</h2>
        <p className={descriptionStyles}>{t.contact.description}</p>
        <div className={ctaContainerStyles}>
          <a href="mailto:hsm9300@naver.com" className={emailStyles}>
            <span>hsm9300@naver.com</span>
            <svg className={arrowStyles} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

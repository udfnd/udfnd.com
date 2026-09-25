'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const sectionStyles = css`
  padding: ${spacing[20]} ${layout.containerPadding};
  background: ${colors.surface};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, ${colors.surfaceGlow} 0%, transparent 50%);
    pointer-events: none;
  }
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  position: relative;
`;

const headerStyles = css`
  margin-bottom: ${spacing[12]};
`;

const titleStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  line-height: ${typography.h2.lineHeight};
  letter-spacing: ${typography.h2.letterSpacing};
  color: ${colors.text};
  display: flex;
  align-items: center;
  gap: ${spacing[4]};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, ${colors.border} 0%, transparent 100%);
  }
`;

const languageGridStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[6]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const languageCardStyles = css`
  padding: ${spacing[6]};
  background: ${colors.bg};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  position: relative;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${radius.lg};
    background: ${colors.accent.gradient};
    opacity: 0;
    z-index: -1;
    transition: opacity 300ms ease;
  }

  &:hover {
    border-color: transparent;
    transform: translateY(-2px);
    
    &::after {
      opacity: 0.1;
    }
  }
`;

const languageNameStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  color: ${colors.text};
  margin-bottom: ${spacing[2]};
`;

const languageLevelStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.accent.primary};
  font-weight: 500;
  margin-bottom: ${spacing[2]};
`;

const certificationStyles = css`
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.caption.size};
  color: ${colors.faint};
  letter-spacing: 0.02em;
`;

export default function LanguagesSection() {
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <h2 className={titleStyles}>{t.languages.title}</h2>
        </header>
        <div className={languageGridStyles}>
          {t.languages.items.map((lang) => (
            <div key={lang.language} className={languageCardStyles}>
              <h3 className={languageNameStyles}>{lang.language}</h3>
              <p className={languageLevelStyles}>{lang.level}</p>
              <p className={certificationStyles}>{lang.certification}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

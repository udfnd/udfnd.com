'use client';

import { css } from '@emotion/css';
import Image from 'next/image';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const sectionStyles = css`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(${layout.navHeight} + ${spacing[8]}) ${layout.containerPadding} ${spacing[16]};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

const headerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
  margin-bottom: ${spacing[12]};

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    gap: ${spacing[8]};
  }
`;

const profileImageContainerStyles = css`
  flex-shrink: 0;
  width: 180px;
  aspect-ratio: 3 / 4;
  border-radius: ${radius.lg};
  overflow: hidden;
  background: ${colors.surface};
  border: 1px solid ${colors.border};

  @media (min-width: 640px) {
    width: 220px;
  }
`;

const profileImageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const headerTextStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const roleStyles = css`
  font-size: ${typography.small.size};
  font-weight: 500;
  ${gradientText}
  margin-bottom: ${spacing[1]};
`;

const nameStyles = css`
  font-size: ${typography.h1.size};
  font-weight: ${typography.h1.weight};
  line-height: ${typography.h1.lineHeight};
  color: ${colors.text};
  margin-bottom: ${spacing[3]};
`;

const locationStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.faint};
  margin-bottom: ${spacing[2]};
`;

const shortBioStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: 600px;
`;

const interestsTextStyles = css`
  font-size: ${typography.small.size};
  line-height: ${typography.small.lineHeight};
  color: ${colors.faint};
  margin-top: ${spacing[2]};
  font-style: italic;
`;

const linksStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  margin-top: ${spacing[4]};
  font-size: ${typography.small.size};
  flex-wrap: wrap;

  a {
    color: ${colors.muted};
    transition: color 0.2s ease;

    &:hover {
      ${gradientText}
    }
  }
`;

const focusContainerStyles = css`
  margin-top: ${spacing[4]};
`;

const focusSectionTitleStyles = css`
  font-size: ${typography.caption.size};
  font-weight: 500;
  color: ${colors.faint};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${spacing[3]};
`;

const focusListStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]} ${spacing[4]};
`;

const focusItemStyles = css`
  font-size: ${typography.small.size};
  line-height: ${typography.small.lineHeight};
  color: ${colors.muted};

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.accent.gradient};
    margin-right: ${spacing[2]};
    vertical-align: middle;
  }
`;

export default function HeroSection() {
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <div className={profileImageContainerStyles}>
            <Image
              src="/images/profileImage.jpeg"
              alt={t.hero.name}
              width={293}
              height={391}
              className={profileImageStyles}
              priority
            />
          </div>
          <div className={headerTextStyles}>
            <p className={roleStyles}>{t.hero.role}</p>
            <h1 className={nameStyles}>{t.hero.name}</h1>
            <p className={locationStyles}>{t.hero.location}</p>
            <p className={shortBioStyles}>{t.hero.bio}</p>
            <p className={interestsTextStyles}>{t.hero.interests}</p>
            <div className={linksStyles}>
              <a href="https://github.com/udfnd" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/hsm9300/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:hsm9300@naver.com">Email</a>
            </div>

            <div className={focusContainerStyles}>
              <p className={focusSectionTitleStyles}>{t.hero.focusTitle}</p>
              <div className={focusListStyles}>
                {t.hero.focuses.map((focus) => (
                  <span key={focus} className={focusItemStyles}>
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}

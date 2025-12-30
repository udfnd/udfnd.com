'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const sectionStyles = css`
  padding: ${spacing[16]} ${layout.containerPadding};
  background: ${colors.surface};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const headerStyles = css`
  margin-bottom: ${spacing[10]};
`;

const titleStyles = css`
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  line-height: ${typography.h2.lineHeight};
  color: ${colors.text};
`;

const gridStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[8]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const categoryStyles = css`
  padding: ${spacing[5]};
  background: ${colors.bg};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
`;

const categoryTitleStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  color: ${colors.text};
  margin-bottom: ${spacing[4]};
`;

const skillListStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

const skillItemStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.muted};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${colors.accent.gradient};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const subsectionStyles = css`
  margin-top: ${spacing[16]};
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
  padding: ${spacing[5]};
  background: ${colors.bg};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
`;

const languageNameStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  color: ${colors.text};
  margin-bottom: ${spacing[2]};
`;

const languageLevelStyles = css`
  font-size: ${typography.small.size};
  ${gradientText}
  margin-bottom: ${spacing[2]};
`;

const certificationStyles = css`
  font-size: ${typography.caption.size};
  color: ${colors.faint};
`;

export default function SkillsSection() {
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        {/* Skills */}
        <header className={headerStyles}>
          <h2 className={titleStyles}>{t.skills.title}</h2>
        </header>
        <div className={gridStyles}>
          {t.skills.categories.map((category) => (
            <div key={category.title} className={categoryStyles}>
              <h3 className={categoryTitleStyles}>{category.title}</h3>
              <ul className={skillListStyles}>
                {category.skills.map((skill) => (
                  <li key={skill} className={skillItemStyles}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className={subsectionStyles}>
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
      </div>
    </section>
  );
}

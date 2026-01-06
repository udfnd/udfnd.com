'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const sectionStyles = css`
  padding: ${spacing[20]} ${layout.containerPadding};
  position: relative;
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
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

const listStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  position: relative;

  /* Timeline line */
  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(180deg, ${colors.accent.primary} 0%, ${colors.accent.secondary} 50%, ${colors.border} 100%);
    border-radius: 1px;

    @media (min-width: 640px) {
      left: 11px;
    }
  }
`;

const itemStyles = css`
  position: relative;
  padding-left: ${spacing[8]};
  padding-bottom: ${spacing[8]};
  transition: all 300ms ease;

  @media (min-width: 640px) {
    padding-left: ${spacing[10]};
  }

  /* Timeline dot */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${colors.bg};
    border: 3px solid ${colors.accent.primary};
    z-index: 1;
    transition: all 300ms ease;

    @media (min-width: 640px) {
      width: 24px;
      height: 24px;
      border-width: 4px;
    }
  }

  &:hover::before {
    background: ${colors.accent.primary};
    box-shadow: 0 0 20px ${colors.accent.primaryGlow};
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const itemContentStyles = css`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: ${spacing[5]};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${colors.accent.secondary};
    transform: translateX(4px);
    box-shadow: -4px 0 0 ${colors.accent.primary};
  }
`;

const itemHeaderStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
  margin-bottom: ${spacing[2]};

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
`;

const companyStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const periodStyles = css`
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.caption.size};
  color: ${colors.faint};
  letter-spacing: 0.02em;
`;

const roleStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.accent.primary};
  font-weight: 500;
  margin-bottom: ${spacing[1]};
`;

const locationStyles = css`
  font-size: ${typography.caption.size};
  color: ${colors.faint};
  margin-bottom: ${spacing[3]};
`;

const descriptionStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: ${layout.proseWidth};
`;

const tagsStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-top: ${spacing[4]};
`;

const tagStyles = css`
  font-family: ${typography.fontFamily.mono};
  font-size: 11px;
  color: ${colors.accent.secondary};
  padding: ${spacing[1]} ${spacing[3]};
  background: rgba(196, 181, 253, 0.1);
  border: 1px solid rgba(196, 181, 253, 0.2);
  border-radius: ${radius.sm};
  transition: all 200ms ease;

  &:hover {
    background: rgba(196, 181, 253, 0.2);
    border-color: ${colors.accent.secondary};
  }
`;

const subsectionStyles = css`
  margin-top: ${spacing[20]};
`;

const educationItemStyles = css`
  ${itemStyles}
`;

const schoolStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const degreeStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.accent.primary};
  font-weight: 500;
  margin-bottom: ${spacing[1]};
`;

const projectItemStyles = css`
  ${itemStyles}
`;

const projectNameStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const organizationStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.faint};
  margin-bottom: ${spacing[2]};
`;

const awardItemStyles = css`
  ${itemStyles}
`;

const awardNameStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const issuerStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.accent.primary};
  font-weight: 500;
  margin-bottom: ${spacing[1]};
`;

export default function ExperienceSection() {
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section id="experience" className={sectionStyles}>
      <div className={containerStyles}>
        {/* Experience */}
        <header className={headerStyles}>
          <h2 className={titleStyles}>{t.experience.title}</h2>
        </header>
        <div className={listStyles}>
          {t.experience.items.map((exp, index) => (
            <article key={index} className={itemStyles}>
              <div className={itemContentStyles}>
                <div className={itemHeaderStyles}>
                  <h3 className={companyStyles}>{exp.company}</h3>
                  <span className={periodStyles}>{exp.period}</span>
                </div>
                <p className={roleStyles}>{exp.role}</p>
                <p className={locationStyles}>{exp.location}</p>
                <p className={descriptionStyles}>{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div className={tagsStyles}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className={tagStyles}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Education */}
        <div className={subsectionStyles}>
          <header className={headerStyles}>
            <h2 className={titleStyles}>{t.education.title}</h2>
          </header>
          <div className={listStyles}>
            {t.education.items.map((edu, index) => (
              <article key={index} className={itemStyles}>
                <div className={itemContentStyles}>
                  <div className={itemHeaderStyles}>
                    <h3 className={schoolStyles}>{edu.school}</h3>
                    <span className={periodStyles}>{edu.period}</span>
                  </div>
                  {'degree' in edu && edu.degree && (
                    <p className={degreeStyles}>{edu.degree}</p>
                  )}
                  {'description' in edu && edu.description && (
                    <p className={descriptionStyles}>{edu.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className={subsectionStyles}>
          <header className={headerStyles}>
            <h2 className={titleStyles}>{t.projects.title}</h2>
          </header>
          <div className={listStyles}>
            {t.projects.items.map((project, index) => (
              <article key={index} className={itemStyles}>
                <div className={itemContentStyles}>
                  <div className={itemHeaderStyles}>
                    <h3 className={projectNameStyles}>{project.name}</h3>
                    <span className={periodStyles}>{project.period}</span>
                  </div>
                  <p className={organizationStyles}>{project.organization}</p>
                  <p className={descriptionStyles}>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className={subsectionStyles}>
          <header className={headerStyles}>
            <h2 className={titleStyles}>{t.awards.title}</h2>
          </header>
          <div className={listStyles}>
            {t.awards.items.map((award, index) => (
              <article key={index} className={itemStyles}>
                <div className={itemContentStyles}>
                  <div className={itemHeaderStyles}>
                    <h3 className={awardNameStyles}>{award.name}</h3>
                    <span className={periodStyles}>{award.year}</span>
                  </div>
                  <p className={issuerStyles}>{award.issuer}</p>
                  <p className={descriptionStyles}>{award.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

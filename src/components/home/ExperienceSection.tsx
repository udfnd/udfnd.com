'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const sectionStyles = css`
  padding: ${spacing[16]} ${layout.containerPadding};
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

const listStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[8]};
`;

const itemStyles = css`
  padding-bottom: ${spacing[8]};
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
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
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const periodStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.faint};
`;

const roleStyles = css`
  font-size: ${typography.small.size};
  ${gradientText}
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
  font-size: ${typography.caption.size};
  color: ${colors.faint};
  padding: ${spacing[1]} ${spacing[2]};
  background: ${colors.surface};
  border-radius: ${radius.sm};
`;

const subsectionStyles = css`
  margin-top: ${spacing[16]};
`;

const educationItemStyles = css`
  padding-bottom: ${spacing[6]};
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const schoolStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const degreeStyles = css`
  font-size: ${typography.small.size};
  ${gradientText}
  margin-bottom: ${spacing[1]};
`;

const projectItemStyles = css`
  padding-bottom: ${spacing[6]};
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const projectNameStyles = css`
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
  padding-bottom: ${spacing[6]};
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const awardNameStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
`;

const issuerStyles = css`
  font-size: ${typography.small.size};
  ${gradientText}
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
              <article key={index} className={educationItemStyles}>
                <div className={itemHeaderStyles}>
                  <h3 className={schoolStyles}>{edu.school}</h3>
                  <span className={periodStyles}>{edu.period}</span>
                </div>
                <p className={degreeStyles}>{edu.degree}</p>
                {edu.description && (
                  <p className={descriptionStyles}>{edu.description}</p>
                )}
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
              <article key={index} className={projectItemStyles}>
                <div className={itemHeaderStyles}>
                  <h3 className={projectNameStyles}>{project.name}</h3>
                  <span className={periodStyles}>{project.period}</span>
                </div>
                <p className={organizationStyles}>{project.organization}</p>
                <p className={descriptionStyles}>{project.description}</p>
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
              <article key={index} className={awardItemStyles}>
                <div className={itemHeaderStyles}>
                  <h3 className={awardNameStyles}>{award.name}</h3>
                  <span className={periodStyles}>{award.year}</span>
                </div>
                <p className={issuerStyles}>{award.issuer}</p>
                <p className={descriptionStyles}>{award.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

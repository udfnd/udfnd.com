'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius } from '@/styles/tokens';

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

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React / Next.js', 'TypeScript', 'HTML / CSS', 'Vue.js'],
  },
  {
    title: 'Design',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping'],
  },
  {
    title: 'Tools',
    skills: ['Git / GitHub', 'Storybook', 'CI/CD', 'Testing'],
  },
];

export default function SkillsSection() {
  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <h2 className={titleStyles}>Skills</h2>
        </header>

        <div className={gridStyles}>
          {skillCategories.map((category) => (
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
      </div>
    </section>
  );
}

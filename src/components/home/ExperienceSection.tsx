'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';

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

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    company: 'Company Name',
    role: 'Senior Frontend Designer',
    period: '2022 - Present',
    description:
      '사용자 중심의 웹 애플리케이션을 설계하고 개발합니다. 디자인 시스템을 구축하고 팀의 프론트엔드 개발 문화를 이끌고 있습니다.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Figma'],
  },
  {
    company: 'Previous Company',
    role: 'Frontend Developer',
    period: '2020 - 2022',
    description:
      '다양한 B2B 프로젝트에서 프론트엔드 개발을 담당했습니다. 사용자 경험 개선과 성능 최적화에 집중했습니다.',
    technologies: ['Vue.js', 'JavaScript', 'SCSS', 'Storybook'],
  },
  {
    company: 'First Company',
    role: 'UI Developer',
    period: '2018 - 2020',
    description:
      '웹 퍼블리싱과 UI 개발로 커리어를 시작했습니다. 반응형 웹과 크로스 브라우저 호환성에 대한 깊은 이해를 쌓았습니다.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={sectionStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <h2 className={titleStyles}>Experience</h2>
        </header>

        <div className={listStyles}>
          {experiences.map((exp, index) => (
            <article key={index} className={itemStyles}>
              <div className={itemHeaderStyles}>
                <h3 className={companyStyles}>{exp.company}</h3>
                <span className={periodStyles}>{exp.period}</span>
              </div>
              <p className={roleStyles}>{exp.role}</p>
              <p className={descriptionStyles}>{exp.description}</p>
              <div className={tagsStyles}>
                {exp.technologies.map((tech) => (
                  <span key={tech} className={tagStyles}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

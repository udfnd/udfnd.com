'use client';

import { css } from '@emotion/css';
import Image from 'next/image';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';

const sectionStyles = css`
  min-height: 100vh;
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

const shortBioStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: 400px;
`;

const linksStyles = css`
  display: flex;
  gap: ${spacing[4]};
  margin-top: ${spacing[4]};
  font-size: ${typography.small.size};

  a {
    color: ${colors.muted};
  }
`;

const interestsContainerStyles = css`
  margin-top: ${spacing[4]};
`;

const interestsSectionTitleStyles = css`
  font-size: ${typography.caption.size};
  font-weight: 500;
  color: ${colors.faint};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${spacing[3]};
`;

const interestsListStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]} ${spacing[4]};
`;

const interestItemStyles = css`
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

const interests = [
  'Design Systems',
  'Interactive UI',
  'Web Performance',
  'Accessibility',
  'Typography',
  'Developer Experience',
];

export default function HeroSection() {
  return (
    <section className={sectionStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <div className={profileImageContainerStyles}>
            <Image
              src="/images/profileImage.jpeg"
              alt="Seungmok profile"
              width={293}
              height={391}
              className={profileImageStyles}
              priority
            />
          </div>
          <div className={headerTextStyles}>
            <p className={roleStyles}>Frontend Designer</p>
            <h1 className={nameStyles}>Seungmok</h1>
            <p className={shortBioStyles}>
              디지털 경험을 설계하고 구현합니다. 사용자 중심의 인터페이스와
              깔끔한 코드를 통해 가치 있는 제품을 만드는 것을 좋아합니다.
            </p>
            <div className={linksStyles}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:hello@udfnd.com">Email</a>
            </div>

            <div className={interestsContainerStyles}>
              <p className={interestsSectionTitleStyles}>What I Focus On</p>
              <div className={interestsListStyles}>
                {interests.map((interest) => (
                  <span key={interest} className={interestItemStyles}>
                    {interest}
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

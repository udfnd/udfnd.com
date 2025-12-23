'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, gradientText, gradientTextHover } from '@/styles/tokens';

const sectionStyles = css`
  padding: ${spacing[16]} ${layout.containerPadding};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const titleStyles = css`
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  line-height: ${typography.h2.lineHeight};
  color: ${colors.text};
  margin-bottom: ${spacing[4]};
`;

const descriptionStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: ${layout.proseWidth};
  margin-bottom: ${spacing[6]};
`;

const emailStyles = css`
  font-size: ${typography.h3.size};
  text-decoration: none;
  ${gradientText}

  &:hover {
    ${gradientTextHover}
  }
`;

export default function ContactSection() {
  return (
    <section id="contact" className={sectionStyles}>
      <div className={containerStyles}>
        <h2 className={titleStyles}>Contact</h2>
        <p className={descriptionStyles}>
          새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면
          언제든지 연락해 주세요.
        </p>
        <a href="mailto:hello@udfnd.com" className={emailStyles}>
          hello@udfnd.com
        </a>
      </div>
    </section>
  );
}

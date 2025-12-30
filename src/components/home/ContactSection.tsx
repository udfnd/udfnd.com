'use client';

import { css } from '@emotion/css';
import { colors, typography, layout, spacing, gradientText, gradientTextHover } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

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
  const language = useAppStore((state) => state.language);
  const t = useTranslation(language);

  return (
    <section id="contact" className={sectionStyles}>
      <div className={containerStyles}>
        <h2 className={titleStyles}>{t.contact.title}</h2>
        <p className={descriptionStyles}>{t.contact.description}</p>
        <a href="mailto:hsm9300@naver.com" className={emailStyles}>
          hsm9300@naver.com
        </a>
      </div>
    </section>
  );
}

'use client';

import { css } from '@emotion/css';
import { PasswordGate, PostForm } from '@/components/blog';
import { colors, typography, spacing, layout } from '@/styles/tokens';

const mainStyles = css`
  min-height: 100vh;
  padding: calc(${layout.navHeight} + ${spacing[8]}) ${layout.containerPadding} ${spacing[16]};
  background: ${colors.bg};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const headerStyles = css`
  margin-bottom: ${spacing[8]};
`;

const titleStyles = css`
  font-size: ${typography.h1.size};
  font-weight: ${typography.h1.weight};
  line-height: ${typography.h1.lineHeight};
  color: ${colors.text};
`;

export default function WritePage() {
  return (
    <PasswordGate>
      <main className={mainStyles}>
        <div className={containerStyles}>
          <header className={headerStyles}>
            <h1 className={titleStyles}>새 글 작성</h1>
          </header>
          <PostForm mode="create" />
        </div>
      </main>
    </PasswordGate>
  );
}

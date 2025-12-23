'use client';

import { css } from '@emotion/css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, layout, spacing, radius, gradientText } from '@/styles/tokens';

const mainStyles = css`
  min-height: 100vh;
  padding: calc(${layout.navHeight} + ${spacing[8]}) ${layout.containerPadding} ${spacing[16]};
`;

const containerStyles = css`
  max-width: 720px;
  margin: 0 auto;
`;

const backLinkStyles = css`
  display: inline-block;
  font-size: ${typography.small.size};
  color: ${colors.faint};
  margin-bottom: ${spacing[8]};
`;

const headerStyles = css`
  margin-bottom: ${spacing[10]};
`;

const metaStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[3]};
  font-size: ${typography.small.size};
`;

const categoryStyles = css`
  ${gradientText}
`;

const dateStyles = css`
  color: ${colors.faint};
`;

const titleStyles = css`
  font-size: ${typography.h1.size};
  font-weight: ${typography.h1.weight};
  line-height: ${typography.h1.lineHeight};
  color: ${colors.text};
  margin-bottom: ${spacing[4]};
`;

const tagsStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
`;

const tagStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.faint};
`;

const contentStyles = css`
  h2 {
    font-size: ${typography.h2.size};
    font-weight: ${typography.h2.weight};
    line-height: ${typography.h2.lineHeight};
    color: ${colors.text};
    margin: ${spacing[10]} 0 ${spacing[4]};
  }

  h3 {
    font-size: ${typography.h3.size};
    font-weight: ${typography.h3.weight};
    line-height: ${typography.h3.lineHeight};
    color: ${colors.text};
    margin: ${spacing[8]} 0 ${spacing[3]};
  }

  p {
    font-size: ${typography.body.size};
    line-height: ${typography.body.lineHeight};
    color: ${colors.muted};
    margin-bottom: ${spacing[5]};
    max-width: ${layout.proseWidth};
  }

  ul,
  ol {
    margin-bottom: ${spacing[5]};
    padding-left: ${spacing[5]};
  }

  li {
    font-size: ${typography.body.size};
    line-height: ${typography.body.lineHeight};
    color: ${colors.muted};
    margin-bottom: ${spacing[2]};
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  code {
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.small.size};
    background: ${colors.surface};
    padding: 0.15em 0.3em;
    border-radius: ${radius.sm};
    color: ${colors.text};
  }

  pre {
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.md};
    padding: ${spacing[4]};
    margin-bottom: ${spacing[5]};
    overflow-x: auto;

    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 2px solid;
    border-image: ${colors.accent.gradient} 1;
    padding-left: ${spacing[4]};
    margin: ${spacing[6]} 0;

    p {
      color: ${colors.faint};
      font-style: italic;
    }
  }
`;

interface PostData {
  title: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
}

const samplePostData: Record<string, PostData> = {
  'design-system-principles': {
    title: '디자인 시스템을 구축할 때 고려해야 할 것들',
    date: '2024-03-15',
    category: 'Design',
    tags: ['디자인시스템', 'UI/UX', 'Figma'],
    content: `
      <p>디자인 시스템은 단순한 컴포넌트 라이브러리가 아닙니다.
      제품 전체의 일관성을 보장하고, 팀의 효율성을 높이며,
      사용자에게 일관된 경험을 제공하는 핵심 인프라입니다.</p>

      <h2>왜 디자인 시스템인가?</h2>
      <p>여러 프로젝트를 진행하면서 반복되는 문제들이 있었습니다.
      같은 버튼인데 페이지마다 스타일이 달랐고, 색상 값이 하드코딩되어 있어서
      테마 변경이 어려웠습니다.</p>

      <h2>핵심 원칙들</h2>

      <h3>1. 토큰 기반 설계</h3>
      <p>모든 시각적 요소를 추상화된 토큰으로 정의합니다.
      색상, 타이포그래피, 스페이싱 등을 변수로 관리하면
      일관성을 유지하면서도 유연하게 변경할 수 있습니다.</p>

      <h3>2. 컴포지션 우선</h3>
      <p>작은 단위의 컴포넌트를 조합해서 복잡한 UI를 구성합니다.
      이렇게 하면 재사용성이 높아지고, 유지보수가 쉬워집니다.</p>

      <h3>3. 접근성 내장</h3>
      <p>접근성은 나중에 추가하는 것이 아니라, 처음부터 시스템에 녹아있어야 합니다.
      모든 컴포넌트가 기본적으로 접근 가능해야 합니다.</p>

      <blockquote>
        <p>좋은 디자인 시스템은 제약을 주면서도 창의성을 해치지 않는다.</p>
      </blockquote>

      <h2>마치며</h2>
      <p>디자인 시스템 구축은 긴 여정입니다. 완벽함을 추구하기보다는,
      팀의 실제 요구에 맞춰 점진적으로 발전시켜 나가는 것이 중요합니다.</p>
    `,
  },
};

const defaultPost: PostData = {
  title: 'Post Not Found',
  date: new Date().toISOString().split('T')[0] ?? '',
  category: 'Unknown',
  tags: [],
  content: '<p>요청하신 글을 찾을 수 없습니다.</p>',
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post: PostData = samplePostData[slug] ?? defaultPost;

  return (
    <main className={mainStyles}>
      <article className={containerStyles}>
        <Link href="/blog" className={backLinkStyles}>
          &larr; Back to Blog
        </Link>

        <header className={headerStyles}>
          <div className={metaStyles}>
            <span className={categoryStyles}>{post.category}</span>
            <span className={dateStyles}>&middot;</span>
            <time className={dateStyles} dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className={titleStyles}>{post.title}</h1>
          <div className={tagsStyles}>
            {post.tags.map((tag: string) => (
              <span key={tag} className={tagStyles}>
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className={contentStyles}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

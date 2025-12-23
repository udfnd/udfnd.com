'use client';

import { css } from '@emotion/css';
import { useState } from 'react';
import { BlogPostCard, BlogPost } from '@/components/blog';
import { colors, typography, layout, spacing, transition, radius } from '@/styles/tokens';

const mainStyles = css`
  min-height: 100vh;
  padding: calc(${layout.navHeight} + ${spacing[8]}) ${layout.containerPadding} ${spacing[16]};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const headerStyles = css`
  margin-bottom: ${spacing[10]};
`;

const titleStyles = css`
  font-size: ${typography.h1.size};
  font-weight: ${typography.h1.weight};
  line-height: ${typography.h1.lineHeight};
  color: ${colors.text};
  margin-bottom: ${spacing[3]};
`;

const descriptionStyles = css`
  font-size: ${typography.body.size};
  line-height: ${typography.body.lineHeight};
  color: ${colors.muted};
  max-width: ${layout.proseWidth};
`;

const filtersStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[8]};
`;

const filterButtonStyles = css`
  font-size: ${typography.small.size};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${radius.sm};
  background: transparent;
  color: ${colors.muted};
  border: 1px solid ${colors.border};
  transition: all ${transition.fast};
  cursor: pointer;

  &:hover {
    border-color: ${colors.faint};
    color: ${colors.text};
  }
`;

const filterButtonActiveStyles = css`
  background: ${colors.accent.gradient};
  color: ${colors.bg};
  border-color: transparent;

  &:hover {
    background: ${colors.accent.gradientHover};
    border-color: transparent;
    color: ${colors.bg};
  }
`;

const postsGridStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[4]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const emptyStateStyles = css`
  text-align: center;
  padding: ${spacing[12]} 0;
  color: ${colors.faint};
`;

const samplePosts: BlogPost[] = [
  {
    slug: 'design-system-principles',
    title: '디자인 시스템을 구축할 때 고려해야 할 것들',
    excerpt:
      '효과적인 디자인 시스템은 일관성 있는 사용자 경험을 제공하고 개발 효율성을 높입니다.',
    date: '2024-03-15',
    category: 'Design',
    tags: ['디자인시스템', 'UI/UX'],
  },
  {
    slug: 'nextjs-app-router',
    title: 'Next.js App Router로 마이그레이션하기',
    excerpt: 'Pages Router에서 App Router로 전환하면서 겪은 경험과 새로운 패턴들.',
    date: '2024-03-08',
    category: 'Frontend',
    tags: ['Next.js', 'React'],
  },
  {
    slug: 'css-animation-performance',
    title: 'CSS 애니메이션 성능 최적화',
    excerpt: '부드러운 60fps 애니메이션을 구현하기 위한 CSS 최적화 기법.',
    date: '2024-02-28',
    category: 'Frontend',
    tags: ['CSS', 'Performance'],
  },
  {
    slug: 'accessibility-basics',
    title: '웹 접근성, 어디서부터 시작해야 할까?',
    excerpt: '모든 사용자를 위한 웹을 만들기 위해 알아야 할 접근성 기초.',
    date: '2024-02-15',
    category: 'Frontend',
    tags: ['접근성', 'A11y'],
  },
];

const categories = ['All', 'Frontend', 'Design'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? samplePosts
      : samplePosts.filter((post) => post.category === activeCategory);

  return (
    <main className={mainStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <h1 className={titleStyles}>Writing</h1>
          <p className={descriptionStyles}>
            프론트엔드 개발과 디자인에 대한 생각들을 기록합니다.
          </p>
        </header>

        <div className={filtersStyles} role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              className={`${filterButtonStyles} ${activeCategory === category ? filterButtonActiveStyles : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className={postsGridStyles}>
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className={emptyStateStyles}>해당 카테고리의 글이 없습니다.</p>
        )}
      </div>
    </main>
  );
}

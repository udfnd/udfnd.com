'use client';

import { css } from '@emotion/css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog';
import { colors, typography, layout, spacing, transition, radius } from '@/styles/tokens';
import type { PostListItem, PostCategory } from '@/types/post';

const mainStyles = css`
  min-height: 100vh;
  padding: calc(${layout.navHeight} + ${spacing[8]}) ${layout.containerPadding} ${spacing[16]};
`;

const containerStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing[10]};
  gap: ${spacing[4]};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const headerLeftStyles = css``;

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

const writeButtonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${typography.small.size};
  font-weight: 600;
  color: ${colors.bg};
  background: ${colors.accent.gradient};
  border: none;
  border-radius: ${radius.md};
  text-decoration: none;
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    background: ${colors.accent.gradientHover};
  }
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

const loadingStyles = css`
  text-align: center;
  padding: ${spacing[12]} 0;
  color: ${colors.muted};
`;

const categories = ['All', 'Tech', 'Life', 'Rambling'];

// PostListItem을 BlogPost 형식으로 변환
function toBlogPost(post: PostListItem) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    date: post.created_at,
    category: post.category,
    tags: post.tags,
  };
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const categoryParam =
          activeCategory !== 'All' ? `?category=${activeCategory}` : '';
        const response = await fetch(`/api/posts${categoryParam}`);
        if (response.ok) {
          const { posts } = await response.json();
          setPosts(posts || []);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [activeCategory]);

  return (
    <main className={mainStyles}>
      <div className={containerStyles}>
        <header className={headerStyles}>
          <div className={headerLeftStyles}>
            <h1 className={titleStyles}>Blog</h1>
          </div>
          <Link href="/blog/write" className={writeButtonStyles}>
            + 새 글 작성
          </Link>
        </header>

        <div className={filtersStyles} role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              className={`${filterButtonStyles} ${activeCategory === category ? filterButtonActiveStyles : ''}`}
              onClick={() => setActiveCategory(category as PostCategory | 'All')}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className={loadingStyles}>불러오는 중...</p>
        ) : posts.length > 0 ? (
          <div className={postsGridStyles}>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={toBlogPost(post)} />
            ))}
          </div>
        ) : (
          <p className={emptyStateStyles}>
            {activeCategory === 'All'
              ? '아직 작성된 글이 없습니다.'
              : '해당 카테고리의 글이 없습니다.'}
          </p>
        )}
      </div>
    </main>
  );
}

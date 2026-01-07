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

const filterDividerStyles = css`
  width: 1px;
  height: 24px;
  background: ${colors.border};
  margin: 0 ${spacing[2]};
`;

const draftFilterStyles = css`
  font-size: ${typography.small.size};
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${radius.sm};
  background: transparent;
  color: ${colors.muted};
  border: 1px dashed ${colors.border};
  transition: all ${transition.fast};
  cursor: pointer;

  &:hover {
    border-color: ${colors.faint};
    color: ${colors.text};
  }
`;

const draftFilterActiveStyles = css`
  background: ${colors.surface2};
  color: ${colors.text};
  border-color: ${colors.accent.solid};
  border-style: solid;
`;

const categories = ['All', 'Tech', 'Music', 'Life', 'Etc'];

// PostListItem을 BlogPost 형식으로 변환
function toBlogPost(post: PostListItem) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    date: post.created_at,
    category: post.category,
    tags: post.tags,
    thumbnail_url: post.thumbnail_url,
    is_published: post.is_published,
  };
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  // 관리자 여부 확인
  useEffect(() => {
    const password = sessionStorage.getItem('blog_admin_password');
    setIsAdmin(!!password);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'All') {
          params.set('category', activeCategory);
        }
        if (showDrafts && isAdmin) {
          params.set('includeUnpublished', 'true');
        }
        const queryString = params.toString();
        const response = await fetch(`/api/posts${queryString ? `?${queryString}` : ''}`);
        if (response.ok) {
          const { posts } = await response.json();
          // 임시저장 모드일 때는 비공개 글만 필터링
          if (showDrafts && isAdmin) {
            setPosts((posts || []).filter((p: PostListItem) => !p.is_published));
          } else {
            setPosts(posts || []);
          }
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [activeCategory, showDrafts, isAdmin]);

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
              className={`${filterButtonStyles} ${activeCategory === category && !showDrafts ? filterButtonActiveStyles : ''}`}
              onClick={() => {
                setActiveCategory(category as PostCategory | 'All');
                setShowDrafts(false);
              }}
              aria-pressed={activeCategory === category && !showDrafts}
            >
              {category}
            </button>
          ))}
          {isAdmin && (
            <>
              <div className={filterDividerStyles} />
              <button
                className={`${draftFilterStyles} ${showDrafts ? draftFilterActiveStyles : ''}`}
                onClick={() => setShowDrafts(!showDrafts)}
                aria-pressed={showDrafts}
              >
                임시저장
              </button>
            </>
          )}
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
            {showDrafts
              ? '임시저장된 글이 없습니다.'
              : activeCategory === 'All'
                ? '아직 작성된 글이 없습니다.'
                : '해당 카테고리의 글이 없습니다.'}
          </p>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, layout, spacing, radius, gradientText, transition } from '@/styles/tokens';
import type { Post } from '@/types/post';

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
  text-decoration: none;
  transition: color ${transition.fast};

  &:hover {
    color: ${colors.text};
  }
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
    margin: ${spacing[12]} 0 ${spacing[5]};
  }

  h3 {
    font-size: ${typography.h3.size};
    font-weight: ${typography.h3.weight};
    line-height: ${typography.h3.lineHeight};
    color: ${colors.text};
    margin: ${spacing[10]} 0 ${spacing[4]};
  }

  p {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #d4d4d4;
    margin-bottom: ${spacing[6]};
    max-width: ${layout.proseWidth};
    min-height: 1.5em;
  }

  ul,
  ol {
    margin-bottom: ${spacing[6]};
    padding-left: ${spacing[5]};
  }

  li {
    font-size: 1.125rem;
    line-height: 1.75;
    color: #d4d4d4;
    margin-bottom: ${spacing[3]};
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
    padding: ${spacing[5]};
    margin-bottom: ${spacing[6]};
    overflow-x: auto;
    font-size: 0.9375rem;
    line-height: 1.65;

    code {
      background: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid;
    border-image: ${colors.accent.gradient} 1;
    padding: ${spacing[4]} ${spacing[5]};
    margin: ${spacing[8]} 0;
    background: ${colors.surface};
    border-radius: 0 ${radius.md} ${radius.md} 0;

    p {
      color: ${colors.muted};
      font-style: italic;
      font-size: 1.0625rem;
      margin-bottom: 0;
    }
  }

  a {
    color: ${colors.accent.solid};
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${radius.md};
    margin: ${spacing[8]} 0;
    display: block;
  }

  figure {
    margin: ${spacing[8]} 0;

    img {
      margin: 0;
    }

    figcaption {
      font-size: ${typography.small.size};
      color: ${colors.faint};
      text-align: center;
      margin-top: ${spacing[3]};
    }
  }
`;

const actionsStyles = css`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[10]};
  padding-top: ${spacing[6]};
  border-top: 1px solid ${colors.border};
`;

const editButtonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${typography.small.size};
  color: ${colors.muted};
  background: transparent;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  text-decoration: none;
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    border-color: ${colors.faint};
    color: ${colors.text};
  }
`;

const loadingStyles = css`
  text-align: center;
  padding: ${spacing[12]} 0;
  color: ${colors.muted};
`;

const errorStyles = css`
  text-align: center;
  padding: ${spacing[12]} 0;
  color: #ef4444;
`;

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}?incrementView=true`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const { post } = await response.json();
        setPost(post);
      } catch {
        setError('글을 찾을 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <main className={mainStyles}>
        <div className={containerStyles}>
          <p className={loadingStyles}>불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className={mainStyles}>
        <div className={containerStyles}>
          <Link href="/blog" className={backLinkStyles}>
            &larr; Back to Blog
          </Link>
          <p className={errorStyles}>{error || '글을 찾을 수 없습니다.'}</p>
        </div>
      </main>
    );
  }

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
            <time className={dateStyles} dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className={dateStyles}>&middot;</span>
            <span className={dateStyles}>조회 {post.view_count}</span>
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

        <div className={actionsStyles}>
          <Link href={`/blog/edit/${post.id}`} className={editButtonStyles}>
            수정
          </Link>
        </div>
      </article>
    </main>
  );
}

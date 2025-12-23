'use client';

import { css } from '@emotion/css';
import Link from 'next/link';
import { colors, typography, spacing, transition, radius, gradientText } from '@/styles/tokens';

const cardStyles = css`
  display: block;
  padding: ${spacing[5]};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  text-decoration: none;
  transition: border-color ${transition.normal};

  &:hover {
    border-color: ${colors.faint};

    h3 {
      ${gradientText}
    }
  }
`;

const metaStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[2]};
`;

const categoryStyles = css`
  font-size: ${typography.caption.size};
  font-weight: 500;
  ${gradientText}
`;

const dateStyles = css`
  font-size: ${typography.caption.size};
  color: ${colors.faint};
`;

const titleStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  line-height: ${typography.h3.lineHeight};
  color: ${colors.text};
  margin-bottom: ${spacing[2]};
  transition: all ${transition.normal};
`;

const excerptStyles = css`
  font-size: ${typography.small.size};
  line-height: ${typography.small.lineHeight};
  color: ${colors.muted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const tagsStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  margin-top: ${spacing[3]};
`;

const tagStyles = css`
  font-size: ${typography.caption.size};
  color: ${colors.faint};
`;

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={cardStyles}>
      <div className={metaStyles}>
        <span className={categoryStyles}>{post.category}</span>
        <time className={dateStyles} dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <h3 className={titleStyles}>{post.title}</h3>
      <p className={excerptStyles}>{post.excerpt}</p>
      <div className={tagsStyles}>
        {post.tags.map((tag) => (
          <span key={tag} className={tagStyles}>
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

'use client';

import { css } from '@emotion/css';
import Link from 'next/link';
import { colors, typography, spacing, transition, radius, gradientText } from '@/styles/tokens';

const cardStyles = css`
  display: flex;
  gap: ${spacing[4]};
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

const contentStyles = css`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
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

const thumbnailStyles = css`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: ${radius.sm};
  overflow: hidden;
  background: ${colors.surface2};

  @media (min-width: 640px) {
    width: 160px;
    height: 160px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${transition.normal};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const draftBadgeStyles = css`
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  background: ${colors.surface2};
  color: ${colors.muted};
  border: 1px dashed ${colors.border};
  border-radius: ${radius.sm};
  margin-right: ${spacing[2]};
`;

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  thumbnail_url?: string | null;
  is_published?: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // 임시저장 글은 편집 페이지로 연결
  const href = post.is_published === false && post.id
    ? `/blog/edit/${post.id}`
    : `/blog/${post.slug}`;

  return (
    <Link href={href} className={cardStyles}>
      <div className={contentStyles}>
        <div className={metaStyles}>
          {post.is_published === false && (
            <span className={draftBadgeStyles}>임시저장</span>
          )}
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
      </div>
      {post.thumbnail_url && (
        <div className={thumbnailStyles}>
          <img src={post.thumbnail_url} alt="" loading="lazy" />
        </div>
      )}
    </Link>
  );
}

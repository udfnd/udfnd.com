'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { css } from '@emotion/css';
import { PasswordGate, PostForm } from '@/components/blog';
import { colors, typography, spacing, layout } from '@/styles/tokens';
import type { Post } from '@/types/post';

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

export default function EditPage() {
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const { post } = await response.json();
        setPost(post);
      } catch {
        setError('글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <PasswordGate>
      <main className={mainStyles}>
        <div className={containerStyles}>
          <header className={headerStyles}>
            <h1 className={titleStyles}>글 수정</h1>
          </header>

          {isLoading && <p className={loadingStyles}>불러오는 중...</p>}
          {error && <p className={errorStyles}>{error}</p>}
          {post && <PostForm mode="edit" post={post} />}
        </div>
      </main>
    </PasswordGate>
  );
}

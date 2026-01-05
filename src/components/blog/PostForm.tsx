'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@emotion/css';
import { colors, typography, spacing, radius, transition, layout } from '@/styles/tokens';
import TiptapEditor from './TiptapEditor';
import CategorySelect from './CategorySelect';
import TagInput from './TagInput';
import type { Post, PostCategory, PostCreateInput, PostUpdateInput } from '@/types/post';

const formStyles = css`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
`;

const fieldGroupStyles = css`
  margin-bottom: ${spacing[5]};
`;

const labelStyles = css`
  display: block;
  font-size: ${typography.small.size};
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: ${spacing[2]};
`;

const inputStyles = css`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.body.size};
  color: ${colors.text};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  outline: none;
  transition: border-color ${transition.fast};

  &:focus {
    border-color: ${colors.accent.solid};
  }

  &::placeholder {
    color: ${colors.faint};
  }
`;

const titleInputStyles = css`
  ${inputStyles}
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  padding: ${spacing[4]} ${spacing[4]};
`;

const rowStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[4]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const actionsStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing[3]};
  margin-top: ${spacing[8]};
  padding-top: ${spacing[6]};
  border-top: 1px solid ${colors.border};
`;

const buttonBaseStyles = css`
  padding: ${spacing[3]} ${spacing[6]};
  font-size: ${typography.body.size};
  font-weight: 600;
  border-radius: ${radius.md};
  cursor: pointer;
  transition: all ${transition.fast};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const primaryButtonStyles = css`
  ${buttonBaseStyles}
  color: ${colors.bg};
  background: ${colors.accent.gradient};
  border: none;

  &:hover:not(:disabled) {
    background: ${colors.accent.gradientHover};
  }
`;

const secondaryButtonStyles = css`
  ${buttonBaseStyles}
  color: ${colors.text};
  background: transparent;
  border: 1px solid ${colors.border};

  &:hover:not(:disabled) {
    border-color: ${colors.faint};
  }
`;

const errorStyles = css`
  font-size: ${typography.small.size};
  color: #ef4444;
  margin-top: ${spacing[3]};
`;

const successStyles = css`
  font-size: ${typography.small.size};
  color: #22c55e;
  margin-top: ${spacing[3]};
`;

const checkboxLabelStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  font-size: ${typography.body.size};
  color: ${colors.text};
  cursor: pointer;
`;

const checkboxStyles = css`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${colors.accent.solid};
`;

interface PostFormProps {
  post?: Post;
  mode: 'create' | 'edit';
}

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState<PostCategory>(post?.category || 'Tech');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [isPublished, setIsPublished] = useState(post?.is_published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getAdminPassword = (): string | null => {
    if (typeof window === 'undefined') return null;
    // 세션 스토리지에서 인증 여부 확인하고, 입력된 비밀번호를 사용
    // 실제로는 비밀번호를 다시 입력받거나 토큰을 사용하는 것이 좋음
    // 여기서는 간단하게 처리
    return sessionStorage.getItem('blog_admin_password') || '';
  };

  const handleSubmit = async (publish: boolean) => {
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      setError('내용을 입력해주세요.');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const password = getAdminPassword();

      if (mode === 'create') {
        const postData: PostCreateInput = {
          title: title.trim(),
          content,
          category,
          tags,
          is_published: publish,
        };

        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password || '',
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to create post');
        }

        const { post: newPost } = await response.json();
        setSuccess(publish ? '글이 발행되었습니다!' : '임시저장되었습니다!');

        setTimeout(() => {
          if (publish) {
            router.push(`/blog/${newPost.slug}`);
          } else {
            router.push('/blog');
          }
        }, 1000);
      } else {
        const updateData: PostUpdateInput = {
          title: title.trim(),
          content,
          category,
          tags,
          is_published: publish,
        };

        const response = await fetch(`/api/posts/${post!.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password || '',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to update post');
        }

        const { post: updatedPost } = await response.json();
        setSuccess('글이 수정되었습니다!');

        setTimeout(() => {
          router.push(`/blog/${updatedPost.slug}`);
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    if (!confirm('정말 이 글을 삭제하시겠습니까?')) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const password = getAdminPassword();

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/blog');
    } catch {
      setError('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={formStyles}>
      <div className={fieldGroupStyles}>
        <input
          type="text"
          className={titleInputStyles}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={rowStyles}>
        <div className={fieldGroupStyles}>
          <label className={labelStyles}>카테고리</label>
          <CategorySelect value={category} onChange={setCategory} />
        </div>

        <div className={fieldGroupStyles}>
          <label className={labelStyles}>태그</label>
          <TagInput tags={tags} onChange={setTags} />
        </div>
      </div>

      <div className={fieldGroupStyles}>
        <label className={labelStyles}>내용</label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div className={fieldGroupStyles}>
        <label className={checkboxLabelStyles}>
          <input
            type="checkbox"
            className={checkboxStyles}
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          즉시 발행
        </label>
      </div>

      {error && <p className={errorStyles}>{error}</p>}
      {success && <p className={successStyles}>{success}</p>}

      <div className={actionsStyles}>
        {mode === 'edit' && (
          <button
            type="button"
            className={secondaryButtonStyles}
            onClick={handleDelete}
            disabled={isSubmitting}
            style={{ color: '#ef4444', borderColor: '#ef4444' }}
          >
            삭제
          </button>
        )}
        <button
          type="button"
          className={secondaryButtonStyles}
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="button"
          className={secondaryButtonStyles}
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '임시저장'}
        </button>
        <button
          type="button"
          className={primaryButtonStyles}
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? '발행 중...' : '발행하기'}
        </button>
      </div>
    </div>
  );
}

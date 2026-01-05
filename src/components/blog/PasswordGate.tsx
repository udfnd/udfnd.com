'use client';

import { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { colors, typography, spacing, radius, transition, layout } from '@/styles/tokens';

const containerStyles = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${layout.containerPadding};
`;

const formStyles = css`
  width: 100%;
  max-width: 400px;
  padding: ${spacing[8]};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
`;

const titleStyles = css`
  font-size: ${typography.h2.size};
  font-weight: ${typography.h2.weight};
  color: ${colors.text};
  margin-bottom: ${spacing[2]};
  text-align: center;
`;

const descriptionStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.muted};
  text-align: center;
  margin-bottom: ${spacing[6]};
`;

const inputStyles = css`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.body.size};
  color: ${colors.text};
  background: ${colors.bg};
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

const buttonStyles = css`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.body.size};
  font-weight: 600;
  color: ${colors.bg};
  background: ${colors.accent.gradient};
  border: none;
  border-radius: ${radius.md};
  cursor: pointer;
  transition: all ${transition.fast};
  margin-top: ${spacing[4]};

  &:hover {
    background: ${colors.accent.gradientHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const errorStyles = css`
  font-size: ${typography.small.size};
  color: #ef4444;
  text-align: center;
  margin-top: ${spacing[3]};
`;

const AUTH_KEY = 'blog_admin_authenticated';
const PASSWORD_KEY = 'blog_admin_password';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 세션 스토리지에서 인증 상태 확인
    const authenticated = sessionStorage.getItem(AUTH_KEY);
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem(PASSWORD_KEY, password);
        setIsAuthenticated(true);
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setError('인증 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <div className={containerStyles}>
        <p style={{ color: colors.muted }}>Loading...</p>
      </div>
    );
  }

  // 인증되지 않은 경우 비밀번호 입력 폼 표시
  if (!isAuthenticated) {
    return (
      <div className={containerStyles}>
        <form className={formStyles} onSubmit={handleSubmit}>
          <h1 className={titleStyles}>Admin Access</h1>
          <p className={descriptionStyles}>
            글쓰기 페이지에 접근하려면 비밀번호를 입력하세요.
          </p>
          <input
            type="password"
            className={inputStyles}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className={buttonStyles}
            disabled={isSubmitting || !password}
          >
            {isSubmitting ? '확인 중...' : '확인'}
          </button>
          {error && <p className={errorStyles}>{error}</p>}
        </form>
      </div>
    );
  }

  // 인증된 경우 children 렌더링
  return <>{children}</>;
}

// 인증된 비밀번호 가져오기 (API 호출 시 사용)
export function getStoredPassword(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_KEY) === 'true' ? 'authenticated' : null;
}

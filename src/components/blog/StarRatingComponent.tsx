'use client';

import { useState } from 'react';
import { css } from '@emotion/css';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { colors, spacing, radius, typography, transition } from '@/styles/tokens';

const wrapperStyles = css`
  display: inline-flex;
  vertical-align: middle;
  user-select: none;
  margin: 0 ${spacing[2]};
`;

const starsContainerStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const starRowStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const starStyles = css`
  position: relative;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
  transition: transform ${transition.fast};

  &:hover {
    transform: scale(1.15);
  }
`;

const scoreStyles = css`
  font-size: ${typography.small.size};
  color: ${colors.muted};
  margin-right: ${spacing[1]};
  font-weight: 600;
  min-width: 40px;
`;

const STAR_COLOR = '#F4D000';
const EMPTY_COLOR = '#404040';

function StarIcon({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  if (fill === 'full') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={STAR_COLOR}
          stroke={STAR_COLOR}
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (fill === 'half') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor={STAR_COLOR} />
            <stop offset="50%" stopColor={EMPTY_COLOR} />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#half-star)"
          stroke="none"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={EMPTY_COLOR}
        stroke={EMPTY_COLOR}
        strokeWidth="1"
      />
    </svg>
  );
}

function getStarFill(starIndex: number, score: number): 'full' | 'half' | 'empty' {
  if (score >= starIndex + 1) return 'full';
  if (score >= starIndex + 0.5) return 'half';
  return 'empty';
}

function getScoreFromClick(starIndex: number, e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const isLeftHalf = x < rect.width / 2;
  return isLeftHalf ? starIndex + 0.5 : starIndex + 1;
}

export function StarRatingComponent({ node, updateAttributes, selected }: NodeViewProps) {
  const score = node.attrs.score ?? 0;
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const displayScore = hoverScore ?? score;

  const selectedStyles = selected
    ? css`outline: 2px solid ${colors.accent.solid}; outline-offset: 2px;`
    : '';

  return (
    <NodeViewWrapper className={`${wrapperStyles} ${selectedStyles}`}>
      <div className={starsContainerStyles}>
        <span className={scoreStyles}>{score.toFixed(1)}</span>
        <div
          className={starRowStyles}
          onMouseLeave={() => setHoverScore(null)}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={starStyles}
              onMouseMove={(e) => setHoverScore(getScoreFromClick(i, e))}
              onClick={(e) => updateAttributes({ score: getScoreFromClick(i, e) })}
            >
              <StarIcon fill={getStarFill(i, displayScore)} />
            </div>
          ))}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

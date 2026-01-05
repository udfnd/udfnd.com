'use client';

import { css } from '@emotion/css';
import { colors, typography, spacing, radius, transition } from '@/styles/tokens';
import type { PostCategory } from '@/types/post';

const selectStyles = css`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  font-size: ${typography.body.size};
  color: ${colors.text};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  outline: none;
  cursor: pointer;
  transition: border-color ${transition.fast};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238A8A8A' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${spacing[3]} center;
  padding-right: ${spacing[8]};

  &:focus {
    border-color: ${colors.accent.solid};
  }

  option {
    background: ${colors.surface};
    color: ${colors.text};
  }
`;

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'Tech', label: 'Tech' },
  { value: 'Life', label: 'Life' },
  { value: 'Rambling', label: 'Rambling' },
];

interface CategorySelectProps {
  value: PostCategory;
  onChange: (value: PostCategory) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <select
      className={selectStyles}
      value={value}
      onChange={(e) => onChange(e.target.value as PostCategory)}
    >
      {CATEGORIES.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}

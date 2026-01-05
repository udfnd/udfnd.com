'use client';

import { useState, KeyboardEvent } from 'react';
import { css } from '@emotion/css';
import { colors, typography, spacing, radius, transition } from '@/styles/tokens';

const containerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  min-height: 48px;
  align-items: center;
  transition: border-color ${transition.fast};

  &:focus-within {
    border-color: ${colors.accent.solid};
  }
`;

const tagStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  padding: ${spacing[1]} ${spacing[2]};
  font-size: ${typography.small.size};
  color: ${colors.text};
  background: ${colors.surface2};
  border-radius: ${radius.sm};
`;

const removeButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 14px;
  color: ${colors.muted};
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all ${transition.fast};

  &:hover {
    color: ${colors.text};
    background: ${colors.border};
  }
`;

const inputStyles = css`
  flex: 1;
  min-width: 120px;
  padding: ${spacing[1]} 0;
  font-size: ${typography.body.size};
  color: ${colors.text};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${colors.faint};
  }
`;

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = '태그 입력 후 Enter',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
    }
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={containerStyles}>
      {tags.map((tag, index) => (
        <span key={tag} className={tagStyles}>
          #{tag}
          <button
            type="button"
            className={removeButtonStyles}
            onClick={() => removeTag(index)}
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        className={inputStyles}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </div>
  );
}

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { css } from '@emotion/css';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { colors, radius } from '@/styles/tokens';

const wrapperStyles = css`
  display: inline-block;
  position: relative;
  max-width: 100%;
  margin: 1rem 0;

  &.selected {
    outline: 2px solid ${colors.accent.solid};
    outline-offset: 2px;
  }
`;

const imageStyles = css`
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: ${radius.md};
  cursor: pointer;
`;

const handleStyles = css`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${colors.accent.solid};
  border: 2px solid ${colors.bg};
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;

  .selected & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const handlePositions = {
  topLeft: css`
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  `,
  topRight: css`
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  `,
  bottomLeft: css`
    bottom: -6px;
    left: -6px;
    cursor: sw-resize;
  `,
  bottomRight: css`
    bottom: -6px;
    right: -6px;
    cursor: se-resize;
  `,
};

const MIN_WIDTH = 100;
const MAX_WIDTH_RATIO = 1.0; // 100% of editor width

export function ResizableImage({ node, updateAttributes, selected }: NodeViewProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { src, alt, width } = node.attrs;

  const handleMouseDown = useCallback((e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!imageRef.current) return;

    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(imageRef.current.offsetWidth);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !wrapperRef.current) return;

    const editorWidth = wrapperRef.current.parentElement?.offsetWidth || 800;
    const maxWidth = editorWidth * MAX_WIDTH_RATIO;

    const deltaX = e.clientX - startX;
    let newWidth = startWidth + deltaX;

    // Apply constraints
    newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, maxWidth));

    updateAttributes({ width: Math.round(newWidth) });
  }, [isResizing, startX, startWidth, updateAttributes]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      className={`${wrapperStyles} ${selected ? 'selected' : ''}`}
      data-drag-handle
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt || ''}
        className={imageStyles}
        style={{ width: width ? `${width}px` : 'auto' }}
        draggable={false}
      />

      {/* Resize handles - only show when selected */}
      <div
        className={`${handleStyles} ${handlePositions.topLeft}`}
        onMouseDown={(e) => handleMouseDown(e, 'topLeft')}
      />
      <div
        className={`${handleStyles} ${handlePositions.topRight}`}
        onMouseDown={(e) => handleMouseDown(e, 'topRight')}
      />
      <div
        className={`${handleStyles} ${handlePositions.bottomLeft}`}
        onMouseDown={(e) => handleMouseDown(e, 'bottomLeft')}
      />
      <div
        className={`${handleStyles} ${handlePositions.bottomRight}`}
        onMouseDown={(e) => handleMouseDown(e, 'bottomRight')}
      />
    </NodeViewWrapper>
  );
}

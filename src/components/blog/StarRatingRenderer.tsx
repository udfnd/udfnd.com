'use client';

import { useEffect } from 'react';

const STAR_COLOR = '#F4D000';
const EMPTY_COLOR = '#404040';

function createStarSVG(fillType: 'full' | 'half' | 'empty', index: number): string {
  const size = 20;
  const path = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

  if (fillType === 'full') {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="${path}" fill="${STAR_COLOR}" stroke="${STAR_COLOR}" stroke-width="1"/></svg>`;
  }
  if (fillType === 'half') {
    const gradientId = `half-star-${index}`;
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><defs><linearGradient id="${gradientId}"><stop offset="50%" stop-color="${STAR_COLOR}"/><stop offset="50%" stop-color="${EMPTY_COLOR}"/></linearGradient></defs><path d="${path}" fill="url(#${gradientId})" stroke="none"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="${path}" fill="${EMPTY_COLOR}" stroke="${EMPTY_COLOR}" stroke-width="1"/></svg>`;
}

function renderStars(score: number): string {
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (score >= i + 1) html += createStarSVG('full', i);
    else if (score >= i + 0.5) html += createStarSVG('half', i);
    else html += createStarSVG('empty', i);
  }
  return html;
}

export function useStarRatingRenderer(post: unknown) {
  useEffect(() => {
    if (!post) return;

    const ratings = document.querySelectorAll<HTMLElement>('[data-type="star-rating"]');

    ratings.forEach((el) => {
      const score = parseFloat(el.dataset.score || '0');

      el.innerHTML = `
        <span style="color:#a3a3a3;font-size:14px;font-weight:600;margin-right:4px;">${score.toFixed(1)}</span>
        <span style="display:inline-flex;align-items:center;gap:2px;">${renderStars(score)}</span>
      `;
    });
  }, [post]);
}

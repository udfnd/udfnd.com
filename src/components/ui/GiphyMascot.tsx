'use client';

import { useState, useEffect, useCallback } from 'react';
import { css, keyframes } from '@emotion/css';
import { radius, transition } from '@/styles/tokens';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const bubbleBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const wrapperStyles = css`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    bottom: 24px;
    right: 24px;
  }
`;

const speechBubbleWrapperStyles = css`
  position: relative;
  animation: ${bubbleBounce} 2s ease-in-out infinite;
`;

const speechBubbleStyles = css`
  position: relative;
  background: #ffffff;
  color: #000000;
  padding: 8px 12px;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  line-height: 1.4;
  letter-spacing: 0;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 8px;
    padding: 10px 14px;
  }

  /* 8bit pixel tail */
  &::before {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 9px solid #ffffff;
    z-index: 1;
  }
`;

const containerStyles = css`
  width: 64px;
  height: 64px;
  cursor: pointer;
  border-radius: ${radius.md};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform ${transition.fast}, box-shadow ${transition.fast};

  @media (min-width: 768px) {
    width: 96px;
    height: 96px;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    animation: ${bounce} 0.5s ease-in-out;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const loadingStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 10px;
`;

interface GiphyGif {
  id: string;
  images: {
    fixed_width: {
      url: string;
    };
    fixed_height: {
      url: string;
    };
    // 저화질 옵션 (100px) - fallback용
    fixed_width_small: {
      url: string;
    };
    fixed_height_small: {
      url: string;
    };
  };
}

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const SEARCH_QUERY = 'bocchi the rock nijika';

export default function GiphyMascot() {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [currentGif, setCurrentGif] = useState<GiphyGif | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  // GIF 목록 가져오기
  useEffect(() => {
    const fetchGifs = async () => {
      if (!GIPHY_API_KEY) {
        console.warn('GIPHY API key is not set');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(SEARCH_QUERY)}&limit=50&rating=g`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setGifs(data.data);
          // 첫 번째 랜덤 GIF 선택
          const randomIndex = Math.floor(Math.random() * data.data.length);
          setCurrentGif(data.data[randomIndex]);
          setUsedIndices(new Set([randomIndex]));
        }
      } catch (error) {
        console.error('Failed to fetch GIPHY:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGifs();
  }, []);

  // 다른 GIF로 변경
  const changeGif = useCallback(() => {
    if (gifs.length === 0) return;

    // 모든 GIF를 사용했으면 리셋
    let newUsedIndices = usedIndices;
    if (usedIndices.size >= gifs.length) {
      newUsedIndices = new Set();
    }

    // 사용하지 않은 GIF 중 랜덤 선택
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * gifs.length);
    } while (newUsedIndices.has(randomIndex) && newUsedIndices.size < gifs.length);

    newUsedIndices.add(randomIndex);
    setUsedIndices(new Set(newUsedIndices));
    setCurrentGif(gifs[randomIndex] ?? null);
  }, [gifs, usedIndices]);

  // API 키가 없으면 렌더링하지 않음
  if (!GIPHY_API_KEY) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={wrapperStyles}>
        <div className={speechBubbleWrapperStyles}>
          <div className={speechBubbleStyles}>Click me!</div>
        </div>
        <div className={containerStyles}>
          <div className={loadingStyles}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!currentGif) {
    return null;
  }

  // 고화질 우선 사용 (200px), fallback으로 저화질 (100px)
  const gifUrl = currentGif.images.fixed_width?.url ||
                 currentGif.images.fixed_height?.url ||
                 currentGif.images.fixed_width_small?.url ||
                 currentGif.images.fixed_height_small?.url;

  return (
    <div className={wrapperStyles}>
      <div className={speechBubbleWrapperStyles}>
          <div className={speechBubbleStyles}>Click me!</div>
        </div>
      <div
        className={containerStyles}
        onClick={changeGif}
        title="Click to change!"
      >
        <img
          src={gifUrl}
          alt="Nijika from Bocchi the Rock"
          className={imageStyles}
          loading="lazy"
        />
      </div>
    </div>
  );
}

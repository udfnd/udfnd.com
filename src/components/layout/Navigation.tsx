'use client';

import { css } from '@emotion/css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { colors, typography, layout, spacing, transition, radius, gradientText } from '@/styles/tokens';
import { useAppStore, Language } from '@/stores/useAppStore';
import { useTranslation } from '@/i18n/translations';

const navStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${layout.navHeight};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${layout.containerPadding};
  background: rgba(8, 8, 12, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${colors.border};
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const navContainerStyles = css`
  width: 100%;
  max-width: ${layout.maxWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const logoStyles = css`
  font-family: ${typography.fontFamily.display};
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${colors.text};
  text-decoration: none;
  transition: all 200ms ease;

  &:hover {
    color: ${colors.accent.primary};
    text-shadow: 0 0 20px ${colors.accent.primaryGlow};
  }
`;

const menuStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[6]};
`;

const menuItemStyles = css`
  font-size: ${typography.small.size};
  font-weight: 500;
  color: ${colors.muted};
  text-decoration: none;
  position: relative;
  padding: ${spacing[2]} 0;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${colors.accent.primary};
    transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: ${colors.text};
    
    &::after {
      width: 100%;
    }
  }
`;

const activeMenuItemStyles = css`
  color: ${colors.accent.primary};
  
  &::after {
    width: 100%;
    background: ${colors.accent.primary};
  }
`;

const languageDropdownContainerStyles = css`
  position: relative;
`;

const languageButtonStyles = css`
  font-size: ${typography.small.size};
  font-weight: 500;
  color: ${colors.muted};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  padding: ${spacing[2]} ${spacing[3]};
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: ${spacing[2]};

  &:hover {
    border-color: ${colors.accent.primary};
    color: ${colors.text};
    background: rgba(244, 208, 0, 0.05);
  }
`;

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + ${spacing[2]});
  right: 0;
  background: rgba(15, 15, 20, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  padding: ${spacing[2]};
  min-width: 140px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 200;
  animation: dropdownFade 150ms ease-out;

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const dropdownItemStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  width: 100%;
  padding: ${spacing[2]} ${spacing[3]};
  font-size: ${typography.small.size};
  font-weight: 500;
  color: ${colors.muted};
  background: transparent;
  border: none;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: all 150ms ease;
  text-align: left;

  &:hover {
    background: rgba(244, 208, 0, 0.1);
    color: ${colors.text};
  }
`;

const dropdownItemActiveStyles = css`
  background: rgba(244, 208, 0, 0.15);
  color: ${colors.accent.primary};
`;

const flagStyles = css`
  font-size: 1.2em;
  line-height: 1;
`;

const chevronStyles = css`
  width: 12px;
  height: 12px;
  transition: transform ${transition.normal};
`;

const chevronOpenStyles = css`
  transform: rotate(180deg);
`;

interface LanguageOption {
  code: Language;
  flag: string;
  label: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
];

export default function Navigation() {
  const pathname = usePathname();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const t = useTranslation(language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languageOptions.find((opt) => opt.code === language)!;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const menuItems = [
    { href: '/', label: t.nav.home },
    { href: '/blog', label: t.nav.blog },
  ];

  return (
    <nav className={navStyles} role="navigation" aria-label="Main navigation">
      <div className={navContainerStyles}>
        <Link href="/" className={logoStyles}>
          udfnd
        </Link>

        <ul className={menuStyles}>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${menuItemStyles} ${isActive ? activeMenuItemStyles : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <div className={languageDropdownContainerStyles} ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={languageButtonStyles}
                aria-label="Select language"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                <span className={flagStyles}>{currentLanguage.flag}</span>
                <span>{currentLanguage.label}</span>
                <svg
                  className={`${chevronStyles} ${isOpen ? chevronOpenStyles : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {isOpen && (
                <div className={dropdownMenuStyles} role="listbox" aria-label="Language options">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageSelect(option.code)}
                      className={`${dropdownItemStyles} ${language === option.code ? dropdownItemActiveStyles : ''}`}
                      role="option"
                      aria-selected={language === option.code}
                    >
                      <span className={flagStyles}>{option.flag}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

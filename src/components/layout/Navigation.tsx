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
  background: ${colors.bg};
  border-bottom: 1px solid ${colors.border};
`;

const navContainerStyles = css`
  width: 100%;
  max-width: ${layout.maxWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const logoStyles = css`
  font-size: ${typography.h3.size};
  font-weight: ${typography.h3.weight};
  color: ${colors.text};
  text-decoration: none;

  &:hover {
    color: ${colors.text};
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
  transition: all ${transition.normal};

  &:hover {
    ${gradientText}
  }
`;

const activeMenuItemStyles = css`
  ${gradientText}
`;

const languageDropdownContainerStyles = css`
  position: relative;
`;

const languageButtonStyles = css`
  font-size: ${typography.small.size};
  font-weight: 500;
  color: ${colors.muted};
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.sm};
  padding: ${spacing[1]} ${spacing[3]};
  cursor: pointer;
  transition: all ${transition.normal};
  display: flex;
  align-items: center;
  gap: ${spacing[2]};

  &:hover {
    border-color: ${colors.accent.solid};
    color: ${colors.text};
  }
`;

const dropdownMenuStyles = css`
  position: absolute;
  top: calc(100% + ${spacing[2]});
  right: 0;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  padding: ${spacing[2]};
  min-width: 140px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 200;
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
  transition: all ${transition.normal};
  text-align: left;

  &:hover {
    background: ${colors.border};
    color: ${colors.text};
  }
`;

const dropdownItemActiveStyles = css`
  background: ${colors.border};
  color: ${colors.text};
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

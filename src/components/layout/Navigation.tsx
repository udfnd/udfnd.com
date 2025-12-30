'use client';

import { css } from '@emotion/css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors, typography, layout, spacing, transition, radius, gradientText } from '@/styles/tokens';
import { useAppStore } from '@/stores/useAppStore';
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
  gap: ${spacing[1]};

  &:hover {
    border-color: ${colors.accent.solid};
    color: ${colors.text};
  }
`;

export default function Navigation() {
  const pathname = usePathname();
  const language = useAppStore((state) => state.language);
  const toggleLanguage = useAppStore((state) => state.toggleLanguage);
  const t = useTranslation(language);

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
            <button
              onClick={toggleLanguage}
              className={languageButtonStyles}
              aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              {language === 'ko' ? 'EN' : '한국어'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

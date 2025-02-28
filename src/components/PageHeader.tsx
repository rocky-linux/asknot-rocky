/**
 * PageHeader Component
 *
 * A header component that displays the Rocky Linux logo and page title.
 * Supports both standard and 404 error page layouts.
 *
 * @component
 * @example
 * // Regular header
 * <PageHeader />
 *
 * // 404 error page header
 * <PageHeader is404={true} />
 */

import React from 'react';

import { Button } from './Button';
import Logo from './Logo';

import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Props for the PageHeader component
 * @interface PageHeaderProps
 * @property {boolean} [is404=false] - Whether to render the 404 error page layout
 * @property {React.ReactNode} [children] - Optional child elements to render
 */
interface PageHeaderProps {
  is404?: boolean;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ is404 = false }) => {
  const { translations, language } = useLanguage();

  console.log('PageHeader rendering with language:', language);

  if (is404) {
    return (
      <header className="flex flex-col items-center space-y-8 md:space-y-12">
        <Logo />
        <div className="text-center space-y-2 md:space-y-4">
          <h2 className="text-base md:text-2xl text-white/80 font-normal font-red-hat tracking-wide px-4">
            {translations[404].subtitle}
          </h2>
          <h1 className="text-xl md:text-4xl font-bold text-white font-red-hat tracking-tight px-4">
            {translations[404].title}
          </h1>
          <p className="text-white/80 mt-4">{translations[404].message}</p>
          <Button
            href="/"
            variant="ghost"
            className="mt-6"
            aria-label={translations[404].returnHome}
          >
            {translations[404].returnHome}
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex flex-col items-center space-y-8 md:space-y-12" role="banner">
      <Logo />
      <div className="text-center space-y-2 md:space-y-4">
        <h2 className="text-base md:text-2xl text-white/80 font-normal font-red-hat tracking-wide px-4">
          {translations.home.subtitle}
        </h2>
        <h1 className="text-xl md:text-4xl font-bold text-white font-red-hat tracking-tight px-4">
          {translations.home.areaOfInterest}
        </h1>
      </div>
    </header>
  );
};

export default PageHeader;

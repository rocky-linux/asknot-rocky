/**
 * Footer Component
 *
 * A responsive footer component that displays attribution information
 * and includes a language selector for internationalization.
 *
 * @component
 * @example
 * <Footer />
 */

import React from 'react';

import { LanguageSelector } from './LanguageSelector';

import { useLanguage } from '@/i18n/LanguageContext';

const Footer: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <footer className="text-center py-4" role="contentinfo">
      <p className="text-white/60 text-sm mb-4">
        {translations.footer.generatedBy}{' '}
        <a
          href="https://github.com/rocky-linux/asknot-rocky"
          className="underline hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="asknot-rocky GitHub repository"
        >
          asknot-rocky
        </a>
        . {translations.footer.inspiredBy}{' '}
        <a
          href="https://github.com/fedora-infra/asknot-ng"
          className="underline hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="asknot-ng GitHub repository"
        >
          asknot-ng
        </a>
        .
      </p>
      <LanguageSelector />
    </footer>
  );
};

export default Footer;

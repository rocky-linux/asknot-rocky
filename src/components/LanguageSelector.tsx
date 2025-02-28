/**
 * LanguageSelector Component
 *
 * A component that provides language selection functionality for the application.
 * Supports switching between available languages and persists the selection.
 */

import React from 'react';

import { useLanguage } from '@/i18n/LanguageContext';

/**
 * Available languages in the application
 * Add new languages here to support additional translations
 */
const languages = {
  en: 'English',
  es: 'Español',
} as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as keyof typeof languages;
    setLanguage(newLang);
  };

  return (
    <div className="flex justify-center py-4 text-white">
      <div className="relative inline-flex items-center">
        <svg
          className="absolute left-3 w-5 h-5 text-white/70"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-white/15 text-white text-sm pl-10 pr-8 py-2 rounded-lg appearance-none cursor-pointer hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Select language"
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code} className="bg-[#111827] text-white">
              {name}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2.5 w-4 h-4 text-white/70 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Translation Types
 *
 * This module defines TypeScript types for the application's translation system.
 * These types ensure consistency across different language files and provide
 * type safety when accessing translations.
 */

/**
 * Response options for user interactions
 */
interface ResponseOptions {
  positive: string[];
  negative: string[];
}

/**
 * Home page translations
 */
interface HomeTranslations {
  title: string;
  description: string;
  areaOfInterest: string;
  subtitle: string;
  noscript: {
    title: string;
    description: string;
    link: string;
    suffix: string;
  };
  endFlow: {
    title: string;
    description: string;
    startOver: string;
    notFound: string;
    mattermost: string;
    help: string;
  };
  responses: ResponseOptions;
}

/**
 * Error page translations
 */
interface ErrorTranslations {
  title: string;
  description: string;
  subtitle: string;
  message: string;
  returnHome: string;
}

/**
 * Footer translations
 */
interface FooterTranslations {
  generatedBy: string;
  inspiredBy: string;
}

/**
 * Language selector translations
 */
interface LanguageSelectorTranslations {
  label: string;
}

/**
 * Question option translations
 */
interface QuestionOption {
  title: string;
  subtitle: string;
}

/**
 * Question category translations
 */
interface QuestionCategory {
  title: string;
  subtitle: string;
  options: Record<string, QuestionOption>;
}

/**
 * Complete translations structure
 */
export interface Translations {
  home: HomeTranslations;
  404: ErrorTranslations;
  footer: FooterTranslations;
  languageSelector: LanguageSelectorTranslations;
  questions: Record<string, QuestionCategory>;
}

/**
 * Supported language codes
 */
export type LanguageCode = 'en' | 'es';

/**
 * Language display names
 */
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
} as const;

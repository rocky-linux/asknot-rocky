/**
 * Language Context Implementation
 *
 * This module provides a robust internationalization (i18n) system using nanostores
 * for state management. It supports multiple languages, persists language preferences,
 * and provides a React hook for easy integration.
 *
 * @module LanguageContext
 */

import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

import en from './en.json';
import es from './es.json';
import { LANGUAGE_NAMES } from './types';

import type { Translations, LanguageCode } from './types';

/**
 * Map of language codes to their translation data
 * @const languages
 */
const languages: Record<LanguageCode, Translations> = {
  en,
  es,
} as const;

/**
 * Default language to use when no preference is stored
 * @const DEFAULT_LANGUAGE
 */
const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * Storage key for persisting language preference
 * @const STORAGE_KEY
 */
const STORAGE_KEY = 'preferred-language';

/**
 * Detects the user's preferred language from browser settings
 * @returns {LanguageCode} The detected language code or default language
 */
function detectBrowserLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    // Get browser languages
    const browserLangs = navigator.languages || [navigator.language];

    // Find the first supported language
    for (const lang of browserLangs) {
      const code = lang.split('-')[0].toLowerCase();
      if (code in languages) {
        return code as LanguageCode;
      }
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Gets the initial language based on stored preference or browser settings
 * @returns {LanguageCode} The initial language code
 */
function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    // Try to get stored preference
    const storedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
    if (storedLang && storedLang in languages) {
      return storedLang;
    }

    // Fall back to browser language
    return detectBrowserLanguage();
  } catch (error) {
    console.warn('Failed to get initial language:', error);
    return DEFAULT_LANGUAGE;
  }
}

// Create stores for reactive state management
export const languageStore = atom<LanguageCode>(DEFAULT_LANGUAGE);
export const translationsStore = atom<Translations>(en);

// Initialize language and translations
if (typeof window !== 'undefined') {
  const initialLang = getInitialLanguage();
  try {
    languageStore.set(initialLang);
    translationsStore.set(languages[initialLang]);
  } catch (error) {
    console.error('Failed to initialize translations:', error);
    // Fallback to default language
    languageStore.set(DEFAULT_LANGUAGE);
    translationsStore.set(languages[DEFAULT_LANGUAGE]);
  }
}

/**
 * Sets the current language and updates translations
 * @param {LanguageCode} lang - The language code to set
 * @throws {Error} If the language is not supported
 */
export function setLanguage(lang: LanguageCode) {
  if (!(lang in languages)) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  try {
    languageStore.set(lang);
    translationsStore.set(languages[lang]);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  } catch (error) {
    console.error('Failed to set language:', error);
    // Fallback to default language
    languageStore.set(DEFAULT_LANGUAGE);
    translationsStore.set(languages[DEFAULT_LANGUAGE]);
  }
}

/**
 * React hook for accessing language context
 * @returns {Object} Language context object containing current language, translations, and setter
 * @property {LanguageCode} language - Current language code
 * @property {Translations} translations - Current language translations
 * @property {Function} setLanguage - Function to change the current language
 * @property {Record<LanguageCode, string>} availableLanguages - Map of available language codes to their display names
 */
export function useLanguage() {
  const language = useStore(languageStore);
  const translations = useStore(translationsStore);

  return {
    language,
    translations,
    setLanguage,
    availableLanguages: LANGUAGE_NAMES,
  };
}

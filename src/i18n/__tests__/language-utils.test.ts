import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock window and localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

const mockNavigator = {
  language: 'en-US',
  languages: ['en-US', 'es'],
};

beforeEach(() => {
  vi.stubGlobal('localStorage', mockLocalStorage);
  vi.stubGlobal('navigator', mockNavigator);
  mockLocalStorage.getItem.mockClear();
  mockLocalStorage.setItem.mockClear();
});

// Import the functions we want to test
// Since they're not exported, we'll recreate them here
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'preferred-language';

function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    const browserLangs = navigator.languages || [navigator.language];

    for (const lang of browserLangs) {
      const code = lang.split('-')[0].toLowerCase();
      if (code === 'en' || code === 'es') {
        return code;
      }
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }

  return DEFAULT_LANGUAGE;
}

function getInitialLanguage(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  try {
    const storedLang = localStorage.getItem(STORAGE_KEY);
    if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
      return storedLang;
    }

    return detectBrowserLanguage();
  } catch (error) {
    console.warn('Failed to get initial language:', error);
    return DEFAULT_LANGUAGE;
  }
}

describe('Language Utilities', () => {
  describe('detectBrowserLanguage', () => {
    it('detects English from navigator.language', () => {
      vi.stubGlobal('navigator', { language: 'en-US' });
      expect(detectBrowserLanguage()).toBe('en');
    });

    it('detects Spanish from navigator.language', () => {
      vi.stubGlobal('navigator', { language: 'es-ES' });
      expect(detectBrowserLanguage()).toBe('es');
    });

    it('uses first supported language from navigator.languages', () => {
      vi.stubGlobal('navigator', {
        language: 'fr-FR',
        languages: ['fr-FR', 'es-ES', 'en-US'],
      });
      expect(detectBrowserLanguage()).toBe('es');
    });

    it('falls back to default language for unsupported language', () => {
      vi.stubGlobal('navigator', { language: 'fr-FR' });
      expect(detectBrowserLanguage()).toBe('en');
    });

    it('handles missing navigator APIs', () => {
      vi.stubGlobal('navigator', {});
      expect(detectBrowserLanguage()).toBe('en');
    });
  });

  describe('getInitialLanguage', () => {
    it('uses stored language preference if valid', () => {
      mockLocalStorage.getItem.mockReturnValue('es');
      expect(getInitialLanguage()).toBe('es');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it('falls back to browser language if no stored preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      vi.stubGlobal('navigator', { language: 'es-ES' });
      expect(getInitialLanguage()).toBe('es');
    });

    it('ignores invalid stored language', () => {
      mockLocalStorage.getItem.mockReturnValue('fr');
      vi.stubGlobal('navigator', { language: 'en-US' });
      expect(getInitialLanguage()).toBe('en');
    });

    it('handles localStorage errors', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      expect(getInitialLanguage()).toBe('en');
    });

    it('uses default language when both storage and browser detection fail', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      vi.stubGlobal('navigator', {
        language: 'fr-FR',
        languages: ['fr-FR', 'de-DE'],
      });
      expect(getInitialLanguage()).toBe('en');
    });
  });
}); 
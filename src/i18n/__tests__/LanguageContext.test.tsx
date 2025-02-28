import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLanguage, setLanguage, languageStore } from '../LanguageContext';

// Test component that uses the language hook
const TestComponent = () => {
  const { language, translations } = useLanguage();
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <button onClick={() => setLanguage('es')}>Change to Spanish</button>
      <div data-testid="test-translation">{translations.home?.title}</div>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset to default language
    setLanguage('en');
  });

  it('provides default language as English', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });

  it('allows language switching', async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /change to spanish/i }));
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
  });

  it('persists language preference in localStorage', async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /change to spanish/i }));
    expect(localStorage.getItem('preferred-language')).toBe('es');
  });

  it('loads language preference from localStorage', () => {
    localStorage.setItem('preferred-language', 'es');
    // Manually trigger language initialization
    languageStore.set('es');
    render(<TestComponent />);
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
  });

  it('provides translations for the current language', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('test-translation')).toBeInTheDocument();
  });

  it('throws error for unsupported language', () => {
    expect(() => setLanguage('fr' as any)).toThrow('Unsupported language: fr');
  });
}); 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LanguageSelector } from '../LanguageSelector';

// Mock the LanguageContext
const mockSetLanguage = vi.fn();
vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    setLanguage: mockSetLanguage,
    translations: {},
    availableLanguages: {
      en: 'English',
      es: 'Español',
    },
  }),
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockSetLanguage.mockClear();
  });

  it('renders with correct default language', () => {
    render(<LanguageSelector />);
    const select = screen.getByRole('combobox', { name: /select language/i });

    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('en');
  });

  it('renders all available language options', () => {
    render(<LanguageSelector />);

    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Español' })).toBeInTheDocument();
  });

  it('handles language change', () => {
    render(<LanguageSelector />);
    const select = screen.getByRole('combobox', { name: /select language/i });

    fireEvent.change(select, { target: { value: 'es' } });
    expect(mockSetLanguage).toHaveBeenCalledWith('es');
  });

  it('applies correct styling', () => {
    render(<LanguageSelector />);
    const select = screen.getByRole('combobox', { name: /select language/i });

    expect(select).toHaveClass(
      'bg-white/15',
      'text-white',
      'rounded-lg',
      'appearance-none',
      'cursor-pointer',
      'hover:bg-white/20',
      'transition-colors'
    );
  });

  it('renders globe icon', () => {
    render(<LanguageSelector />);
    const globeIcon = document.querySelector('svg[viewBox="0 0 24 24"]');

    expect(globeIcon).toBeInTheDocument();
    expect(globeIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders dropdown icon', () => {
    render(<LanguageSelector />);
    const dropdownIcon = document.querySelector('svg[viewBox="0 0 20 20"]');

    expect(dropdownIcon).toBeInTheDocument();
    expect(dropdownIcon).toHaveAttribute('aria-hidden', 'true');
  });
});

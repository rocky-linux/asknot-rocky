import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PageHeader from '../PageHeader';

// Mock the LanguageContext
vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    translations: {
      home: {
        subtitle: 'Welcome to Rocky Linux',
        areaOfInterest: 'What interests you?',
      },
      404: {
        subtitle: 'Page Not Found',
        title: '404 Error',
        message: 'The page you are looking for does not exist.',
        returnHome: 'Return to Home',
      },
    },
    language: 'en',
  }),
}));

describe('PageHeader', () => {
  it('renders the default header correctly', () => {
    render(<PageHeader />);

    // Check if Logo is rendered
    expect(screen.getByRole('img', { name: /rocky linux/i })).toBeInTheDocument();

    // Check if titles are rendered
    expect(screen.getByText('Welcome to Rocky Linux')).toBeInTheDocument();
    expect(screen.getByText('What interests you?')).toBeInTheDocument();

    // Check if banner role is present
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the 404 error page header correctly', () => {
    render(<PageHeader is404={true} />);

    // Check if Logo is rendered
    expect(screen.getByRole('img', { name: /rocky linux/i })).toBeInTheDocument();

    // Check if 404 specific content is rendered
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('404 Error')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();

    // Check if return home button is rendered
    const returnButton = screen.getByRole('link', { name: /return to home/i });
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toHaveAttribute('href', '/');
  });

  it('applies correct styling classes', () => {
    render(<PageHeader />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex', 'flex-col', 'items-center');

    const subtitle = screen.getByText('Welcome to Rocky Linux');
    expect(subtitle).toHaveClass('text-base', 'md:text-2xl', 'text-white/80');

    const title = screen.getByText('What interests you?');
    expect(title).toHaveClass('text-xl', 'md:text-4xl', 'font-bold', 'text-white');
  });
});

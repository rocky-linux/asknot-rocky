import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { QuestionNode } from '../QuestionNode';

import type { ComponentProps, PropsWithChildren } from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: PropsWithChildren<ComponentProps<'div'>>) => (
      <div {...props}>{children}</div>
    ),
    a: ({ children, ...props }: PropsWithChildren<ComponentProps<'a'>>) => (
      <a {...props}>{children}</a>
    ),
  },
  AnimatePresence: ({ children }: PropsWithChildren) => children,
}));

type ButtonMockProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  [key: string]: unknown;
};

// Mock the Button component
vi.mock('../Button', () => ({
  Button: ({ children, onClick, href, ...props }: ButtonMockProps) => {
    if (href) {
      return (
        <a href={href} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }
    return (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    );
  },
}));

// Mock the translations
const mockTranslations = {
  home: {
    responses: {
      positive: ['Yes!'],
      negative: ['No!'],
    },
    endFlow: {
      title: 'End of Flow',
      description: 'Description',
      startOver: 'Start Over',
      notFound: 'Not Found',
      mattermost: 'Mattermost',
      help: 'Help',
    },
  },
  questions: {
    root: {
      title: 'Root Question',
      subtitle: 'Root Subtitle',
      options: {
        option1: {
          title: 'Option 1',
          subtitle: 'Option 1 Subtitle',
        },
      },
    },
    option1: {
      title: 'Option 1',
      subtitle: 'Option 1 Subtitle',
      options: {
        suboption1: {
          title: 'Suboption 1',
          subtitle: 'Suboption 1 Subtitle',
        },
      },
    },
  },
};

// Mock the question tree
vi.mock('@/questions/questions', () => ({
  questionTree: {
    id: 'root',
    options: [
      {
        id: 'option1',
        options: [
          {
            id: 'suboption1',
            link: 'https://example.com',
          },
        ],
      },
    ],
  },
}));

// Mock the LanguageContext
vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    translations: mockTranslations,
  }),
}));

describe('QuestionNode', () => {
  beforeEach(() => {
    // Mock window.location.hash
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
      },
      writable: true,
    });
  });

  it('renders initial question', () => {
    render(<QuestionNode />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 1 Subtitle')).toBeInTheDocument();
  });

  it('renders yes/no buttons with responses', () => {
    render(<QuestionNode />);

    const yesButton = screen.getByText('Yes!');
    const noButton = screen.getByText('No!');

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  it('navigates to next option when clicking No', async () => {
    render(<QuestionNode />);

    const noButton = screen.getByText('No!');
    await fireEvent.click(noButton);

    // Should show start over screen since we're at the last option
    expect(screen.getByText('End of Flow')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('handles start over functionality', async () => {
    render(<QuestionNode />);

    // Navigate to end
    const noButton = screen.getByText('No!');
    await fireEvent.click(noButton);

    // Click start over
    const startOverButton = screen.getByText('Start Over');
    await fireEvent.click(startOverButton);

    // Should be back at the beginning
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 1 Subtitle')).toBeInTheDocument();
  });

  it('loads correct node from URL hash', () => {
    // Set hash
    window.location.hash = '#suboption1';

    render(<QuestionNode />);

    expect(screen.getByText('Suboption 1')).toBeInTheDocument();
    expect(screen.getByText('Suboption 1 Subtitle')).toBeInTheDocument();
  });

  it('renders Mattermost link in end flow', async () => {
    render(<QuestionNode />);

    // Navigate to end
    const noButton = screen.getByText('No!');
    await fireEvent.click(noButton);

    const mattermostLink = screen.getByText('Mattermost');
    expect(mattermostLink).toHaveAttribute('href', 'https://chat.rockylinux.org');
    expect(mattermostLink).toHaveAttribute('target', '_blank');
    expect(mattermostLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

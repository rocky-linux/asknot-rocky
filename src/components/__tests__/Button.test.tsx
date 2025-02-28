import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Button } from '../Button';

describe('Button', () => {
  it('renders as a button by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(<Button href="/some-path">Go somewhere</Button>);
    const link = screen.getByRole('link', { name: /go somewhere/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/some-path');
  });

  it('adds noopener noreferrer for external links', () => {
    render(<Button href="https://example.com">External Link</Button>);
    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies different variant styles correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[#111827]');

    rerender(<Button variant="negative">Negative</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[#DC2626]');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white/15');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Button">
        Click me
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom Button');
  });

  it('applies custom className correctly', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('has proper focus styles', () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2', 'focus:ring-white/50');
  });
});

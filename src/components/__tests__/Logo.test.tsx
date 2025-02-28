import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Logo from '../Logo';

describe('Logo', () => {
  it('renders with default props', () => {
    render(<Logo />);
    const logo = screen.getByRole('img', { name: /rocky linux logo/i });

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo-white.svg');
    expect(logo).toHaveAttribute('width', '180');
    expect(logo).toHaveAttribute('height', '48');
    expect(logo).toHaveClass('h-8', 'md:h-12', 'w-auto');
  });

  it('accepts custom dimensions', () => {
    render(<Logo width={240} height={64} />);
    const logo = screen.getByRole('img', { name: /rocky linux logo/i });

    expect(logo).toHaveAttribute('width', '240');
    expect(logo).toHaveAttribute('height', '64');
  });

  it('accepts custom className', () => {
    const customClass = 'my-custom-class';
    render(<Logo className={customClass} />);
    const logo = screen.getByRole('img', { name: /rocky linux logo/i });

    expect(logo).toHaveClass(customClass);
    expect(logo).not.toHaveClass('h-8', 'md:h-12', 'w-auto');
  });

  it('has proper loading and decoding attributes', () => {
    render(<Logo />);
    const logo = screen.getByRole('img', { name: /rocky linux logo/i });

    expect(logo).toHaveAttribute('loading', 'eager');
    expect(logo).toHaveAttribute('decoding', 'async');
  });
});

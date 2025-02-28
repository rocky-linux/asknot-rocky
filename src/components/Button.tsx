/**
 * Button Component
 *
 * A reusable button component that supports multiple variants and can render
 * as either a button or anchor tag. Includes motion animations and styling variants.
 *
 * @example
 * // As a button
 * <Button variant="primary" onClick={() => {}}>Click me</Button>
 *
 * // As a link
 * <Button variant="ghost" href="/some-path">Go somewhere</Button>
 */

import { motion } from 'framer-motion';

import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Base properties for the Button component
 */
type ButtonBaseProps = {
  /** The visual style variant of the button */
  variant?: 'primary' | 'negative' | 'ghost';
  /** The content to be rendered inside the button */
  children: ReactNode;
  /** Additional CSS classes to be applied */
  className?: string;
};

/**
 * Properties specific to button elements
 */
type ButtonAsButtonProps = ButtonBaseProps & {
  href?: never;
} & HTMLMotionProps<'button'>;

/**
 * Properties specific to anchor elements
 */
type ButtonAsAnchorProps = ButtonBaseProps & {
  href: string;
} & HTMLMotionProps<'a'>;

/**
 * Union type of all possible Button props
 */
type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export function Button({
  variant = 'primary',
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium text-white rounded-full transition-colors shadow-lg font-red-hat cursor-pointer inline-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50';

  const variantStyles = {
    primary: 'bg-[#111827] hover:bg-[#1f2937] focus:bg-[#1f2937]',
    negative: 'bg-[#DC2626] hover:bg-[#B91C1C] focus:bg-[#B91C1C]',
    ghost: 'bg-white/15 hover:bg-white/20 focus:bg-white/20',
  };

  // Common motion props for consistent animation
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...(props as HTMLMotionProps<'a'>)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      {...motionProps}
      className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
      {...(props as HTMLMotionProps<'button'>)}
    >
      {children}
    </motion.button>
  );
}

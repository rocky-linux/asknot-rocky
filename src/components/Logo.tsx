/**
 * Logo Component
 *
 * A responsive logo component that displays the Rocky Linux logo.
 * Supports customizable dimensions and styling through props.
 *
 * @component
 * @example
 * // Default usage
 * <Logo />
 *
 * // Custom dimensions
 * <Logo width={240} height={64} />
 *
 * // Custom styling
 * <Logo className="my-custom-class" />
 */

import React from 'react';

/**
 * Props for the Logo component
 * @interface LogoProps
 * @property {string} [className] - Additional CSS classes to apply to the image
 * @property {number} [width] - Width of the logo in pixels
 * @property {number} [height] - Height of the logo in pixels
 */
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = 'h-8 md:h-12 w-auto',
  width = 180,
  height = 48,
}) => {
  return (
    <img
      src="/images/logo-white.svg"
      alt="Rocky Linux Logo"
      width={width}
      height={height}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;

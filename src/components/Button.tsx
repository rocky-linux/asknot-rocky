import { motion } from "framer-motion"
import type { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<typeof motion.button> {
  variant?: 'primary' | 'negative' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium text-white rounded-full transition-colors shadow-lg font-red-hat cursor-pointer inline-block"
  
  const variantStyles = {
    primary: "bg-[#111827] hover:bg-[#1f2937]",
    negative: "bg-[#DC2626] hover:bg-[#B91C1C]",
    ghost: "bg-white/15 hover:bg-white/20"
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  )
} 
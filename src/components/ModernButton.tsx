import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ModernButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  glow?: boolean;
}

export default function ModernButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  glow = true
}: ModernButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-300 overflow-hidden group
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-amber-500 to-orange-600 text-white
      hover:from-amber-400 hover:to-orange-500
      shadow-lg hover:shadow-xl
    `,
    secondary: `
      bg-gradient-to-r from-purple-500 to-blue-600 text-white
      hover:from-purple-400 hover:to-blue-500
      shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-amber-500 text-amber-400 bg-transparent
      hover:bg-amber-500 hover:text-white
    `,
    ghost: `
      text-gray-300 bg-white/5 backdrop-blur-sm
      hover:bg-white/10 hover:text-white
    `
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <Component
      {...props}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={disabled ? {} : { 
        scale: 1.05,
        boxShadow: glow ? '0 0 30px rgba(245, 158, 11, 0.6)' : undefined
      }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      data-cursor-hover
      disabled={disabled}
    >
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Glow Effect */}
      {glow && !disabled && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/50 to-orange-500/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
    </Component>
  );
}

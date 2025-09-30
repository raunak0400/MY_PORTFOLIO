import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  glow = false 
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20' : ''}
        ${glow ? 'shadow-2xl' : 'shadow-xl'}
        transition-all duration-500
        ${className}
      `}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: glow 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 20px 40px -12px rgba(0, 0, 0, 0.3)'
      } : {}}
      data-cursor-hover
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      
      {/* Inner Glow */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

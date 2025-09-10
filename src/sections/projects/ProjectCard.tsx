import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from './projectsData';

interface ProjectCardProps extends Project {
  stars?: number;
  forks?: number;
  language?: string;
  lastUpdated?: string;
  isFromGitHub?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  techStack, 
  github, 
  demo,
}) => {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Container */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl sm:text-3xl md:text-4xl text-white/30 font-bold">{title.charAt(0)}</div>
        </div>
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="bg-cyan-500/20 text-cyan-300 text-xs px-2 sm:px-3 py-1 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2 sm:gap-4">
          <motion.a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 text-center py-2 px-3 sm:px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
          {demo && (
            <motion.a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 text-center py-2 px-3 sm:px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Glowing border effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        whileHover={{ opacity: 0.2 }}
      />
    </motion.div>
  );
};

export default ProjectCard; 
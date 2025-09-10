import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaCalendarAlt, FaGithub } from 'react-icons/fa';
import type { TransformedRepo } from './githubApi';
import { getLanguageColor } from './githubApi';

interface GitHubProjectCardProps extends TransformedRepo {}

const GitHubProjectCard: React.FC<GitHubProjectCardProps> = ({ 
  title, 
  description, 
  techStack, 
  github, 
  demo, 
  stars, 
  forks, 
  language, 
  lastUpdated 
}) => {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group relative"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* GitHub Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center gap-1 sm:gap-2 text-white text-xs">
          <FaGithub className="text-cyan-400" />
          <span className="hidden sm:inline">GitHub</span>
          <span className="sm:hidden">GH</span>
        </div>
      </div>

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
        
        {/* GitHub Stats */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCodeBranch className="text-blue-400" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-green-400" />
            <span className="hidden sm:inline">{lastUpdated}</span>
            <span className="sm:hidden">{lastUpdated.split(' ')[0]}</span>
          </div>
        </div>

        {/* Language Indicator */}
        {language && (
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div 
              className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(language) }}
            />
            <span className="text-xs text-gray-300">{language}</span>
          </div>
        )}
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {techStack.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="bg-cyan-500/20 text-cyan-300 text-xs px-2 sm:px-3 py-1 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="bg-gray-500/20 text-gray-300 text-xs px-2 sm:px-3 py-1 rounded-full">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-2 sm:gap-4">
          <motion.a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 text-center py-2 px-3 sm:px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-1 sm:gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <span className="hidden sm:inline">GitHub</span>
            <span className="sm:hidden">GH</span>
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

export default GitHubProjectCard; 
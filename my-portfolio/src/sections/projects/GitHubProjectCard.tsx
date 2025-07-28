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
      className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group relative"
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* GitHub Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-white text-xs">
          <FaGithub className="text-cyan-400" />
          <span>GitHub</span>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl text-white/30 font-bold">{title.charAt(0)}</div>
        </div>
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* GitHub Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
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
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Language Indicator */}
        {language && (
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(language) }}
            />
            <span className="text-xs text-gray-300">{language}</span>
          </div>
        )}
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="bg-gray-500/20 text-gray-300 text-xs px-3 py-1 rounded-full">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <motion.a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            GitHub
          </motion.a>
          {demo && (
            <motion.a 
              href={demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Glowing border effect */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        whileHover={{ opacity: 0.2 }}
      />
    </motion.div>
  );
};

export default GitHubProjectCard; 
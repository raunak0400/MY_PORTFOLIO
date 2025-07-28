import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';

interface ProjectFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  availableFilters: string[];
  isGitHubMode: boolean;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeFilter,
  onFilterChange,
  availableFilters,
  isGitHubMode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      {/* All Projects Filter */}
      <motion.button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
          activeFilter === 'all'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
            : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaFilter className="text-xs" />
        All {isGitHubMode ? 'Repos' : 'Projects'}
      </motion.button>

      {/* Technology Filters */}
      {availableFilters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter}
        </motion.button>
      ))}

      {/* Clear Filter Button */}
      {activeFilter !== 'all' && (
        <motion.button
          onClick={() => onFilterChange('all')}
          className="px-3 py-2 rounded-full text-sm font-semibold bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <FaTimes className="text-xs" />
          Clear
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProjectFilters; 
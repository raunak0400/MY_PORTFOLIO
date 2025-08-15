import { motion } from 'framer-motion';
import { skillCategories } from './skillsData';

interface SkillCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SkillCategoryTabs({ activeCategory, onCategoryChange }: SkillCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-2">
      {skillCategories.map((category, index) => (
        <motion.button
          key={category.value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.07, type: 'spring', stiffness: 180 }}
          whileHover={{ scale: 1.10, y: -2, background: 'linear-gradient(90deg, #06b6d4 0%, #2563eb 100%)', color: '#fff', boxShadow: '0 4px 24px #06b6d4aa' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onCategoryChange(category.value)}
          className={`relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300
                     border-2 backdrop-blur-sm overflow-hidden group focus:outline-none
                     ${activeCategory === category.value
                       ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/25'
                       : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:border-white/40 hover:text-white'}`}
        >
          {/* Animated Active Indicator */}
          {activeCategory === category.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            />
          )}
          {/* Animated Underline */}
          {activeCategory === category.value && (
            <motion.div
              layoutId={`tab-underline-${category.value}`}
              className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 rounded-full bg-cyan-400 group-hover:bg-white"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '60%', opacity: 1 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            />
          )}
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from './skillsData';
import SkillCard from './SkillCard';

interface SkillGridProps {
  skills: Skill[];
  activeCategory: string;
}

export default function SkillGrid({ skills, activeCategory }: SkillGridProps) {
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={`${skill.name}-${activeCategory}`} 
              skill={skill} 
              index={index} 
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center py-8 sm:py-12"
        >
          <div className="text-gray-400 text-base sm:text-lg font-medium">
            No skills found in this category
          </div>
          <div className="text-gray-500 text-xs sm:text-sm mt-2">
            Try selecting a different category
          </div>
        </motion.div>
      )}
    </div>
  );
}

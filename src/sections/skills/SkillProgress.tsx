import { motion } from 'framer-motion';
import type { Skill } from './skillsData';

interface SkillProgressProps {
  skills: Skill[];
  activeCategory: string;
}

const CATEGORIES = [
  'Programming Languages', 'Frontend Development', 'Backend Development', 'AI/ML',
  'Databases', 'Data Visualization', 'DevOps', 'BaaS', 'Frameworks', 'Software', 'Testing'
];

export default function SkillProgress({ skills, activeCategory }: SkillProgressProps) {
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const averageLevel = filteredSkills.length > 0 
    ? Math.round(filteredSkills.reduce((sum, skill) => sum + skill.level, 0) / filteredSkills.length)
    : 0;

  const skillLevels = {
    beginner: filteredSkills.filter(skill => skill.level < 50).length,
    intermediate: filteredSkills.filter(skill => skill.level >= 50 && skill.level < 80).length,
    advanced: filteredSkills.filter(skill => skill.level >= 80).length
  };

  return (
    <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
        {/* Average Proficiency */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-2 drop-shadow-lg">{averageLevel}%</div>
          <div className="text-sm sm:text-base text-gray-200 font-semibold">Average Proficiency</div>
          <div className="mt-2 sm:mt-3">
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${averageLevel}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Skills Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="text-3xl sm:text-4xl font-extrabold text-green-400 mb-2 drop-shadow-lg">{filteredSkills.length}</div>
          <div className="text-sm sm:text-base text-gray-200 font-semibold">Total Skills</div>
          <div className="mt-2 sm:mt-3 flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="text-green-400 font-bold">{skillLevels.advanced} <span className="font-normal text-gray-300">Advanced</span></span>
            <span className="text-yellow-400 font-bold">{skillLevels.intermediate} <span className="font-normal text-gray-300">Intermediate</span></span>
            <span className="text-red-400 font-bold">{skillLevels.beginner} <span className="font-normal text-gray-300">Beginner</span></span>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 mb-1 drop-shadow-lg">
            {activeCategory === 'all' ? 'All' : activeCategory}
          </div>
          <div className="text-sm sm:text-base text-gray-200 mb-2 sm:mb-3">Current Category</div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-700/40 scrollbar-track-transparent px-2">
            <div className="flex gap-3 sm:gap-6 min-w-[400px] sm:min-w-[600px] justify-center">
              {CATEGORIES.map((cat) => {
                const count = skills.filter(skill => skill.category === cat).length;
                const total = skills.length;
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={cat} className="flex flex-col items-center group w-16 sm:w-20">
                    <div 
                      className="w-1.5 sm:w-2 h-8 sm:h-12 md:h-16 rounded-full bg-gray-700 relative overflow-hidden mb-1"
                      title={`${cat}: ${count} skills`}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + Math.random() * 0.5 }}
                        className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-cyan-400 to-blue-500"
                      />
                      {/* Tooltip */}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-6 sm:-top-7 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-xs text-white px-2 py-1 rounded shadow-lg z-20 whitespace-nowrap">
                        {count} skill{count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 mt-1 text-center leading-tight truncate w-full" title={cat}>{cat}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}




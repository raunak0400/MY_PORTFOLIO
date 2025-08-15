import { useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { skillsData } from './skills/skillsData';
import SkillCategoryTabs from './skills/SkillCategoryTabs';
import SkillGrid from './skills/SkillGrid';
import SkillProgress from './skills/SkillProgress';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(skillsRef, { once: true });
  
  if (isInView) controls.start('visible');

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 bg-black overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" } }
          }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, type: "spring" } }
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 gradient-shimmer"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8, type: "spring" } }
            }}
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4"
          >
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and tools.
          </motion.p>
        </motion.div>

        {/* Skills Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, type: "spring" } }
          }}
        >
          <SkillProgress skills={skillsData} activeCategory={activeCategory} />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, type: "spring" } }
          }}
        >
          <SkillCategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.8, type: "spring" } }
          }}
        >
          <SkillGrid skills={skillsData} activeCategory={activeCategory} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.8, type: "spring" } }
          }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.p
            className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Always learning and expanding my skill set
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 32px #38bdf8, 0 0 80px #2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold 
                     hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg text-sm sm:text-base"
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View Projects
          </motion.button>
        </motion.div>
      </div>
      <style>{`
        .gradient-shimmer {
          background-size: 200% 100%;
          animation: shimmerMove 3s linear infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 0% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </section>
  );
} 
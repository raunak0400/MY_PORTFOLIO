import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGithub, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import ProjectCard from './projects/ProjectCard';
import GitHubProjectCard from './projects/GitHubProjectCard';
import ProjectFilters from './projects/ProjectFilters';
import { projectsData } from './projects/projectsData';
import { fetchGitHubRepos, transformGitHubRepo, type TransformedRepo } from './projects/githubApi';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(projectsRef, { once: true });
  
  const [isGitHubMode, setIsGitHubMode] = useState(false);
  const [githubProjects, setGitHubProjects] = useState<TransformedRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  if (isInView) controls.start('visible');

  useEffect(() => {
    if (isGitHubMode && githubProjects.length === 0) {
      fetchGitHubProjects();
    }
  }, [isGitHubMode]);

  const fetchGitHubProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const repos = await fetchGitHubRepos();
      const transformedRepos = repos.map(transformGitHubRepo);
      setGitHubProjects(transformedRepos);
    } catch (err) {
      setError('Failed to fetch GitHub projects. Please try again later.');
      console.error('Error fetching GitHub projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get available filters based on current projects
  const availableFilters = useMemo(() => {
    const currentProjects = isGitHubMode ? githubProjects : projectsData;
    const allTechStacks = currentProjects.flatMap(project => project.techStack);
    const uniqueTechStacks = [...new Set(allTechStacks)];
    return uniqueTechStacks.slice(0, 8); // Limit to 8 filters for UI
  }, [isGitHubMode, githubProjects]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    const currentProjects = isGitHubMode ? githubProjects : projectsData;
    if (activeFilter === 'all') return currentProjects;
    
    return currentProjects.filter(project => 
      project.techStack.some(tech => 
        tech.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
  }, [isGitHubMode, githubProjects, activeFilter]);

  // Reset filter when switching modes
  useEffect(() => {
    setActiveFilter('all');
  }, [isGitHubMode]);

  return (
    <section
      id="projects"
      ref={projectsRef}
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
            style={{ background: 'linear-gradient(90deg, #06b6d4, #2563eb, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8, type: "spring" } }
            }}
            className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4"
          >
            A showcase of my latest work and technical projects, demonstrating my skills in full-stack development and modern web technologies.
          </motion.p>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, type: "spring" } }
          }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20">
            <motion.button
              onClick={() => setIsGitHubMode(false)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                !isGitHubMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Featured Projects
            </motion.button>
            <motion.button
              onClick={() => setIsGitHubMode(true)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                isGitHubMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              <span className="hidden sm:inline">GitHub Repos</span>
              <span className="sm:hidden">GitHub</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Project Filters */}
        {!isLoading && !error && (
          <ProjectFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            availableFilters={availableFilters}
            isGitHubMode={isGitHubMode}
          />
        )}

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, type: "spring" } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {isLoading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl h-64 sm:h-80 flex items-center justify-center"
              >
                <div className="flex items-center gap-3 text-cyan-400">
                  <FaSpinner className="animate-spin text-lg sm:text-xl" />
                  <span className="text-sm sm:text-base">Loading...</span>
                </div>
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-8 sm:py-12">
              <div className="flex items-center justify-center gap-3 text-red-400 mb-4">
                <FaExclamationTriangle className="text-xl sm:text-2xl" />
                <span className="text-base sm:text-lg font-semibold">Error Loading Projects</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">{error}</p>
              <motion.button
                onClick={fetchGitHubProjects}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          ) : filteredProjects.length === 0 ? (
            // No projects found
            <div className="col-span-full text-center py-8 sm:py-12">
              <div className="text-gray-400 text-base sm:text-lg mb-4">
                No projects found with the selected filter
              </div>
              <motion.button
                onClick={() => setActiveFilter('all')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Projects
              </motion.button>
            </div>
          ) : (
            // Projects grid
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      delay: 0.8 + (index * 0.1), 
                      duration: 0.8, 
                      type: "spring" 
                    } 
                  }
                }}
              >
                {isGitHubMode ? (
                  <GitHubProjectCard {...project as any} />
                ) : (
                  <ProjectCard {...project} />
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.8, type: "spring" } }
          }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.p
            className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Always building and learning new technologies
          </motion.p>
          <motion.a
            href="https://github.com/raunak0400"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: "0 0 32px #38bdf8, 0 0 80px #2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold 
                     hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            <FaGithub />
            <span className="hidden sm:inline">View More on GitHub</span>
            <span className="sm:hidden">View GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
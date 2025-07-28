import { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGithub, FaCalendarAlt, FaFire } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';

const ContributionGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(graphRef, { once: true });

  if (isInView) controls.start('visible');

  return (
    <section
      id="contributions"
      ref={graphRef}
      className="relative min-h-screen flex flex-col justify-center py-16 bg-black overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" } }
          }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, type: "spring" } }
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 gradient-shimmer"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #2563eb, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}
          >
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Contribution Graph</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8, type: "spring" } }
            }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A visual representation of my coding activity and contributions over the past year, showcasing my dedication to continuous learning and development.
          </motion.p>
        </motion.div>

        {/* Contribution Graph Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, type: "spring" } }
          }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          {/* GitHub Stats Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, type: "spring" } }
            }}
            className="flex flex-wrap justify-center gap-8 mb-8"
          >
            <div className="flex items-center gap-3 text-cyan-400">
              <FaGithub className="text-2xl" />
              <div className="text-center">
                <div className="text-2xl font-bold">raunak0400</div>
                <div className="text-sm text-gray-400">GitHub Profile</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <FaCalendarAlt className="text-2xl" />
              <div className="text-center">
                <div className="text-2xl font-bold">365</div>
                <div className="text-sm text-gray-400">Days Active</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-orange-400">
              <FaFire className="text-2xl" />
              <div className="text-center">
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-gray-400">Total Contributions</div>
              </div>
            </div>
          </motion.div>

          {/* Actual GitHub Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1, transition: { delay: 1.0, duration: 0.8, type: "spring" } }
            }}
            className="bg-black/30 rounded-2xl p-8 border border-white/10"
          >
            <div className="flex justify-center">
              <GitHubCalendar
                username="raunak0400"
                blockSize={12}
                blockMargin={4}
                fontSize={15}
                theme={{
                  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
                style={{
                  filter: 'brightness(1.2) contrast(1.1)',
                }}
              />
            </div>
          </motion.div>

          {/* Legend - now matching actual GitHub colors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.8, type: "spring" } }
            }}
            className="flex justify-center items-center gap-6 mt-8 text-sm text-gray-400"
          >
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#161b22' }}></div>
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#0e4429' }}></div>
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#006d32' }}></div>
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#26a641' }}></div>
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#39d353' }}></div>
            </div>
            <span>More</span>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1.6, duration: 0.8, type: "spring" } }
          }}
          className="text-center mt-12"
        >
          <motion.p
            className="text-gray-400 text-lg mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Consistent coding and continuous improvement
          </motion.p>
          <motion.a
            href="https://github.com/raunak0400"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: "0 0 32px #38bdf8, 0 0 80px #2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold 
                     hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
          >
            <FaGithub />
            View Full Profile
          </motion.a>
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

        /* Custom styling for the GitHub calendar */
        .react-activity-calendar {
          color: #9ca3af;
        }

        .react-activity-calendar .react-activity-calendar__label {
          color: #9ca3af;
        }

        .react-activity-calendar .react-activity-calendar__legend-colors {
          margin-top: 8px;
        }

        .react-activity-calendar .react-activity-calendar__legend-colors > div {
          border-radius: 2px;
        }
      `}</style>
    </section>
  );
};

export default ContributionGraph;
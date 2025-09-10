import { motion } from 'framer-motion';
import { FaSchool, FaUniversity, FaFilePdf } from 'react-icons/fa';

const educationData = [
  {
    title: 'Chaitanya School, Lekawada, Gandhinagar',
    description: 'Passed with Central Board of Secondary Education with 96%',
    year: '2022',
    pdf: '/assets/10.pdf',
    icon: <FaSchool className="text-cyan-400" />,
  },
  {
    title: 'Omlandmark School, Mota Chiloda, Gandhinagar',
    description: 'Passed with Central Board of Secondary Education with 87% (Science stream)',
    year: '2024',
    pdf: '/assets/12.pdf',
    icon: <FaSchool className="text-fuchsia-400" />,
  },
  {
    title: 'Gandhinagar Institute of Technology',
    description: 
      "Bachelor's of Computer Science and Engineering",
    year: 'Aug, 2024 - Aug, 2028',
    icon: <FaUniversity className="text-blue-400" />,
  },
  {
    title: 'Indian Institute of Technology Guwahati',
    description: 'Minor degree in computer science domain.',
    year: 'Sep, 2024 - Sep, 2025',
    icon: <FaUniversity className="text-yellow-400" />,
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 80 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, bounce: 0.4, duration: 0.9 + i * 0.1 },
  }),
};

export default function Education() {
  return (
    <section id="education" className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 gradient-shimmer"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #2563eb, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Education Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            A timeline of my academic achievements and learning milestones.
          </motion.p>
        </motion.div>
        {/* Timeline */}
        <div className="relative flex flex-col gap-6 sm:gap-10 before:content-[''] before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 sm:before:w-1 before:bg-gradient-to-b before:from-cyan-400/40 before:to-fuchsia-400/40 before:-translate-x-1/2">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.title}
              className={`relative flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 py-6 sm:py-8 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl ${i % 2 === 0 ? 'md:self-start' : 'md:self-end'}`}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
              variants={cardVariants}
            >
              <div className="flex flex-col items-center md:items-start gap-2 min-w-[50px] sm:min-w-[60px]">
                <span className="text-2xl sm:text-3xl">{edu.icon}</span>
                <span className="block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 animate-pulse" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{edu.title}</h3>
                <p className="text-gray-300 mb-2 text-base sm:text-lg">{edu.description}</p>
                <p className="text-gray-400 mb-2 text-xs sm:text-sm font-mono">{edu.year}</p>
                {edu.pdf && (
                  <a
                    href={edu.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mt-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-full font-semibold shadow-lg hover:from-cyan-400 hover:to-fuchsia-400 transition-all duration-300 text-sm sm:text-base"
                  >
                    <FaFilePdf className="text-red-400 text-lg sm:text-xl" />
                    <span className="hidden sm:inline">View Certificate</span>
                    <span className="sm:hidden">Certificate</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
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
import { motion } from 'framer-motion';
import type { Skill } from './skillsData';
import { 
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiMongodb, SiPostgresql, SiMysql,
  SiGit, SiGithub, SiFigma, SiDocker, SiSolidity, SiEthereum,
  SiAngular, SiBootstrap, SiNextdotjs, SiNestjs, SiDotnet,
  SiPytorch, SiNumpy, SiD3Dotjs, SiPlotly,
  SiAmazon, SiGooglecloud, SiJenkins, SiKubernetes,
  SiFirebase, SiNetlify, SiVercel, SiDjango, SiFastapi, SiFramer,
  SiPytest, SiPostman, SiGo, SiKotlin, SiPowers, SiC, SiCplusplus,
  SiSharp, SiFlask
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { BiLogoBlender, BiLogoGoogle } from 'react-icons/bi';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  c: SiC,
  cpp: SiCplusplus,
  csharp: SiSharp,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  go: SiGo,
  kotlin: SiKotlin,
  powershell: SiPowers,
  angular: SiAngular,
  angularjs: SiAngular,
  bootstrap: SiBootstrap,
  css3: SiCss3,
  express: SiExpress,
  html5: SiHtml5,
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwind: SiTailwindcss,
  flask: SiFlask,
  nestjs: SiNestjs,
  nodejs: SiNodedotjs,
  dotnet: SiDotnet,
  pytorch: SiPytorch,
  numpy: SiNumpy,
  matplotlib: SiNumpy,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  cassandra: SiMongodb,
  d3: SiD3Dotjs,
  plotly: SiPlotly,
  googlecharts: BiLogoGoogle,
  aws: SiAmazon,
  azure: SiGooglecloud,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  gcp: SiGooglecloud,
  jenkins: SiJenkins,
  kubernetes: SiKubernetes,
  firebase: SiFirebase,
  netlify: SiNetlify,
  vercel: SiVercel,
  django: SiDjango,
  fastapi: SiFastapi,
  figma: SiFigma,
  framer: SiFramer,
  vscode: VscCode,
  cursor: VscCode,
  blender: BiLogoBlender,
  pytest: SiPytest,
  postman: SiPostman,
  solidity: SiSolidity,
  web3: SiEthereum,
  hardhat: SiEthereum
};

export default function SkillCard({ skill, index }: SkillCardProps) {
  const IconComponent = iconMap[skill.icon.toLowerCase()] || SiJavascript;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.06, boxShadow: `0 8px 32px ${skill.color}55`, borderColor: skill.color }}
      whileTap={{ scale: 0.97 }}
      className="relative group bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden"
    >
      {/* Icon and Name */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <motion.div
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${skill.color}20` }}
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <IconComponent size={28} className="sm:w-8 sm:h-8" style={{ color: skill.color }} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 truncate">
            {skill.name}
          </h3>
          {skill.description && (
            <p className="text-xs sm:text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
              {skill.description}
            </p>
          )}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-gray-300">Proficiency</span>
          <span className="text-xs sm:text-sm font-bold text-cyan-400">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
            className="h-full rounded-full relative"
            style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
      {/* Category Badge */}
      <motion.span
        className="mt-3 sm:mt-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block"
        style={{ backgroundColor: `${skill.color}20`, color: skill.color, border: `1px solid ${skill.color}40` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.05, type: 'spring', stiffness: 120 }}
      >
        {skill.category}
      </motion.span>
      {/* Animated Arrow */}
      <motion.span
        className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base"
        initial={{ x: 0 }}
        whileHover={{ x: 8 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        →
      </motion.span>
    </motion.div>
  );
}

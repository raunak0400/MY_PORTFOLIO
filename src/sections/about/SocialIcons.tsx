import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope
} from 'react-icons/fa';
import type { IconType } from 'react-icons';


interface SocialItem {
  name: string;
  Icon: IconType | React.FC<any>;
  url: string;
  gradient: string;
  shadowColor: string;
}

const socialItems: SocialItem[] = [
  {
    name: 'Instagram',
    Icon: FaInstagram,
    url: 'https://instagram.com/raunak.____.07',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
    shadowColor: '#f472b6',
  },
  {
    name: 'LinkedIn',
    Icon: FaLinkedin,
    url: 'https://linkedin.com/in/raunak0400',
    gradient: 'from-blue-600 to-blue-400',
    shadowColor: '#2563eb',
  },
  {
    name: 'Gmail',
    Icon: FaEnvelope,
    url: 'mailto:raunakkumarjha233@gmail.com',
    gradient: 'from-red-500 to-orange-400',
    shadowColor: '#f87171',
  },
  {
    name: 'GitHub',
    Icon: FaGithub,
    url: 'https://github.com/raunak0400',
    gradient: 'from-gray-800 to-gray-600',
    shadowColor: '#d1d5db',
  },
  {
    name: 'LeetCode',
    Icon: () => (
      <img src="/assets/leetcode.png" alt="LeetCode" className="w-8 h-8 object-contain" />
    ),
    url: 'https://leetcode.com/raunak0400/',
    gradient: 'from-gray-100 to-gray-200',
    shadowColor: '#FFA116',
  },
];

export default function SocialIcons() {
  const [hovered, setHovered] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div className="relative flex flex-wrap justify-center md:justify-start gap-8 mb-12">
      <div className="relative z-10 flex flex-wrap gap-8">
        {socialItems.map((item) => {
          const isHovered = hovered === item.name;
          return (
            <motion.div
              key={item.name}
              ref={(el) => { refs.current[item.name] = el; }}
              whileHover={{
                scale: 1.3,
                rotate: 8,
                boxShadow: `0 0 32px 8px ${item.shadowColor}, 0 0 80px 20px ${item.shadowColor}`,
                y: -10,
                filter: "brightness(1.15) saturate(1.2)",
                transition: { type: 'spring', stiffness: 400, damping: 18 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center"
            >
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative rounded-full p-4 bg-gradient-to-br ${item.gradient} text-white shadow-lg border-2 border-white/20 overflow-hidden`}
                style={{ width: 64, height: 64, willChange: 'transform, box-shadow' }}
                tabIndex={0}
                aria-label={item.name}
              >
                <item.Icon className="w-6 h-6 z-10 drop-shadow" />
                <span className="absolute inset-0 rounded-full pointer-events-none animate-ripple"></span>
              </motion.a>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="mt-3 px-4 py-2 rounded-full text-white text-sm font-bold shadow-xl bg-white/10 backdrop-blur-md border border-white/20 pointer-events-none flex flex-col items-center"
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {item.name}
                    </span>
                    <motion.span
                      layoutId={`underline-${item.name}`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="block h-1 mt-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500"
                      style={{ willChange: "width, opacity" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <style>{`
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
          70% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .animate-ripple {
          animation: ripple 1.5s infinite;
        }
      `}</style>
    </div>
  );
}













































































































import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaWhatsapp, FaTwitter, FaChevronUp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const socials = [
  {
    href: 'https://github.com/raunak0400',
    icon: <FaGithub className="text-[#181717]" />,
    label: 'GitHub',
    brand: 'github',
  },
  {
    href: 'https://linkedin.com/in/raunak0400',
    icon: <FaLinkedin className="text-[#0077B5]" />,
    label: 'LinkedIn',
    brand: 'linkedin',
  },
  {
    href: 'https://instagram.com/raunak.____.07',
    icon: <FaInstagram className="text-[#E4405F]" />,
    label: 'Instagram',
    brand: 'instagram',
  },
  {
    href: 'https://leetcode.com/raunak0400',
    icon: <SiLeetcode className="text-[#FFA116]" />,
    label: 'LeetCode',
    brand: 'leetcode',
  },
  {
    href: 'https://twitter.com/raunak0400',
    icon: <FaTwitter className="text-[#1DA1F2]" />,
    label: 'Twitter',
    brand: 'twitter',
  },
  {
    href: 'https://wa.me/917779072966',
    icon: <FaWhatsapp className="text-[#25D366]" />,
    label: 'WhatsApp',
    brand: 'whatsapp',
  },
];

const iconVariants = {
  initial: { y: 0, scale: 1 },
  hover: { y: -10, scale: 1.2, transition: { type: 'spring' as const, stiffness: 400, damping: 15 } },
};
const labelVariants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 18 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
];

export default function Footer() {
  const [hovered, setHovered] = useState(null as null | number);
  const [showTop, setShowTop] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-8 sm:py-12 px-4 bg-gradient-to-br from-black via-gray-900 to-black/90 backdrop-blur-xl border-t-0 mt-12 sm:mt-16 overflow-hidden shadow-2xl">
      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/3 top-0 w-96 h-32 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl -translate-x-1/2 animate-pulse" />
        <div className="absolute right-0 bottom-0 w-80 h-32 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6 text-center">
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-gray-300 text-base sm:text-lg font-semibold tracking-wide flex items-center justify-center gap-2"
        >
          <span className="text-xl sm:text-2xl">&copy;</span> <span>Raunak Kumar Jha</span>
        </motion.div>
        {/* Center: Made with love */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x px-4">
            <motion.span
              animate={{ scale: [1, 1.3, 1], color: ["#ec4899", "#f472b6", "#ec4899"] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="inline-block"
            >
              <FaHeart />
            </motion.span>
            <span className="hidden sm:inline">Made with love by a passionate programmer Raunak Kumar Jha</span>
            <span className="sm:hidden">Made with love by Raunak Kumar Jha</span>
          </span>
        </motion.div>
        {/* Socials & WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-2 md:mt-0"
        >
          {socials.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                initial="initial"
                animate={hovered === i ? "hover" : "initial"}
                whileTap={{ scale: 0.95 }}
                className="transition-transform duration-200 text-3xl sm:text-4xl md:text-4xl lg:text-5xl"
                aria-label={s.label}
                style={{ filter: hovered === i ? 'drop-shadow(0 0 12px #fff)' : undefined }}
              >
                {s.icon}
              </motion.a>
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    key={s.label}
                    variants={labelVariants}
                    initial="initial"
                    animate="hover"
                    exit="exit"
                    className="mt-2 text-xs sm:text-sm font-semibold text-white bg-black/80 px-2 sm:px-3 py-1 rounded-full shadow-lg"
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm">
          {legalLinks.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 underline underline-offset-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="backToTop"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 sm:p-4 rounded-full shadow-xl hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 flex flex-col items-center group"
            aria-label="Back to top"
          >
            <FaChevronUp className="text-xl sm:text-2xl animate-bounce" />
            <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Back to Top</span>
          </motion.button>
        )}
      </AnimatePresence>
      <style>{`
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradientX 4s linear infinite;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </footer>
  );
} 
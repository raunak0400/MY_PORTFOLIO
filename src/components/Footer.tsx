import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaHeart, 
  FaTwitter, 
  FaChevronUp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode,
  FaCoffee
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const socials = [
  {
    href: 'https://github.com/raunak0400',
    icon: FaGithub,
    label: 'GitHub',
    color: '#f59e0b',
    hoverColor: '#d97706',
  },
  {
    href: 'https://linkedin.com/in/raunak0400',
    icon: FaLinkedin,
    label: 'LinkedIn',
    color: '#0077B5',
    hoverColor: '#005885',
  },
  {
    href: 'https://www.instagram.com/imraunak.dev/',
    icon: FaInstagram,
    label: 'Instagram',
    color: '#E4405F',
    hoverColor: '#C13584',
  },
  {
    href: 'https://www.facebook.com/imraunak.dev',
    icon: FaFacebook,
    label: 'Facebook',
    color: '#1877F2',
    hoverColor: '#166FE5',
  },
  {
    href: 'https://leetcode.com/raunak0400',
    icon: SiLeetcode,
    label: 'LeetCode',
    color: '#FFA116',
    hoverColor: '#FF8C00',
  },
  {
    href: 'https://twitter.com/raunak0400',
    icon: FaTwitter,
    label: 'Twitter',
    color: '#1DA1F2',
    hoverColor: '#0d8bd9',
  },
  {
    href: 'mailto:contact@imraunak.dev',
    icon: FaEnvelope,
    label: 'Email',
    color: '#f59e0b',
    hoverColor: '#d97706',
  },
];

export default function Footer() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-orange-900/10 to-amber-800/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Left Column - About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
              Raunak Kumar Jha
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Passionate full-stack developer crafting beautiful digital experiences with modern technologies. 
              Always learning, always building.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400">
              <FaMapMarkerAlt className="text-amber-400" />
              <span>Gandhinagar, Gujarat, India</span>
            </div>
          </motion.div>

          {/* Center Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300 py-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  data-cursor-hover
                  data-cursor-text={`Go to ${link}`}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-right"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:contact@imraunak.dev"
                className="flex items-center justify-center lg:justify-end gap-3 text-gray-300 hover:text-amber-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                data-cursor-hover
                data-cursor-text="Send Email"
              >
                <FaEnvelope className="text-amber-400" />
                <span>contact@imraunak.dev</span>
              </motion.a>
              <div className="flex items-center justify-center lg:justify-end gap-3 text-gray-300">
                <FaCode className="text-amber-400" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center gap-6 mb-12"
        >
          {socials.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
                data-cursor-text={social.label}
                data-cursor-magnetic
                data-magnetic-strength="80"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-amber-400/50"
                  style={{
                    backgroundColor: hovered === index ? `${social.color}20` : 'rgba(255, 255, 255, 0.05)',
                    boxShadow: hovered === index ? `0 0 20px ${social.color}40` : 'none'
                  }}
                >
                  <IconComponent 
                    className="text-xl transition-colors duration-300"
                    style={{ color: hovered === index ? social.color : '#d1d5db' }}
                  />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-white/10 pt-8 text-center"
        >
          {/* Made with Love */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-gray-300">Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-red-500" />
            </motion.div>
            <span className="text-gray-300">and</span>
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaCoffee className="text-amber-400" />
            </motion.div>
            <span className="text-gray-300">by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-semibold">
              Raunak Kumar Jha
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} Raunak Kumar Jha. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)" }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
            data-cursor-text="Back to Top"
            data-cursor-magnetic
            data-magnetic-strength="100"
          >
            <FaChevronUp className="text-white text-lg group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
} 
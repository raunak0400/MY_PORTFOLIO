import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const underlineVariants = {
  initial: { width: 0, opacity: 0 },
  hover: { width: '100%', opacity: 1, transition: { duration: 0.3 } },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Raunak Kumar Jha Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full shadow-md"
            style={{ background: "#fff" }}
          />
          <span className="text-lg sm:text-xl font-extrabold text-blue-600 tracking-tight select-none hidden sm:inline">
            MyPortfolio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map(link => (
            <motion.li
              key={link.to}
              className="relative px-2 py-1 group list-none"
              whileHover={{ y: -3, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className="cursor-pointer text-gray-700 font-semibold transition-colors duration-200 px-2 py-1 rounded-md group-hover:text-blue-700 group-hover:bg-blue-50"
                activeClass="text-blue-700 font-bold bg-blue-100"
                spy={true}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Animated Underline */}
                <motion.span
                  className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  variants={underlineVariants}
                  initial="initial"
                  whileHover="hover"
                  animate="initial"
                  layoutId={`underline-${link.to}`}
                />
              </Link>
            </motion.li>
          ))}
          {/* Advanced Resume Button */}
          <motion.li
            className="ml-2 relative group list-none"
            whileHover={{ scale: 1.15, rotate: [0, 2, -2, 0], y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            <motion.a
              href="/assets/resume.pdf"
              download
              className="relative px-6 py-2 rounded-full font-extrabold text-white bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-xl border-2 border-blue-500 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 overflow-hidden flex items-center justify-center text-sm"
              whileHover={{
                boxShadow: '0 0 32px 8px #38bdf8, 0 0 80px 20px #2563eb',
                background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
              }}
            >
              <span className="relative z-10">Resume</span>
              {/* Animated Glow Border */}
              <motion.span
                className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-40 blur-lg animate-pulse pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              />
              {/* Shimmer Effect */}
              <span className="absolute left-0 top-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
                <motion.span
                  className="absolute left-[-75%] top-0 w-1/2 h-full bg-white opacity-20 rotate-12"
                  animate={{ left: ['-75%', '120%'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                />
              </span>
            </motion.a>
          </motion.li>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <motion.button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
            />
            
            {/* Mobile Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden z-50"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <span className="text-xl font-bold text-blue-600">Menu</span>
                  <motion.button
                    onClick={closeMobileMenu}
                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes className="text-xl" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.to}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="list-none"
                      >
                        <Link
                          to={link.to}
                          smooth={true}
                          duration={500}
                          offset={-70}
                          onClick={closeMobileMenu}
                          className="block text-lg font-semibold text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          activeClass="text-blue-600 bg-blue-50"
                          spy={true}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Resume Button */}
                <div className="p-6 border-t border-gray-200">
                  <motion.a
                    href="/assets/resume.pdf"
                    download
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 px-6 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}   
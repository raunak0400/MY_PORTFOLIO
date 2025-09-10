import AnimatedBackground from "./about/AnimatedBackground";
import ResumeButton from "./about/ResumeButton";
import { motion, useAnimation, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaEnvelope,
  FaQuoteLeft,
  FaQuoteRight
} from "react-icons/fa";

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(aboutRef, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  
  if (isInView) controls.start("visible");

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, 1], ["-20px", "20px"]);
  const parallaxY = useTransform(mouseY, [0, 1], ["-20px", "20px"]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  // Throttle mouse parallax for smoother performance
  let lastMove = 0;
  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastMove < 16) return; // ~60fps
    lastMove = now;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Social media data
  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com/raunak.____.07",
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-400 to-purple-500",
      bgColor: "bg-gradient-to-br from-pink-500 to-purple-600"
    },
    {
      name: "Gmail",
      icon: FaEnvelope,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=raunakkumarjha233@gmail.com",
      color: "from-red-500 to-red-600",
      hoverColor: "from-red-400 to-red-500",
      bgColor: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com/in/raunak0400",
      color: "from-blue-600 to-blue-700",
      hoverColor: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-600 to-blue-700"
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "https://twitter.com/raunak0400",
      color: "from-blue-400 to-blue-500",
      hoverColor: "from-blue-300 to-blue-400",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-500"
    },
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/raunak0400",
      color: "from-gray-700 to-gray-800",
      hoverColor: "from-gray-600 to-gray-700",
      bgColor: "bg-gradient-to-br from-gray-700 to-gray-800"
    }
  ];

  return (
    <section
      id="about"
      ref={aboutRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-24 bg-black overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <AnimatedBackground />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mouse Follow Effect */}
      <motion.div
        className="fixed w-4 h-4 bg-cyan-400/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
      
      {/* Title with Enhanced Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { 
              duration: 1, 
              type: "spring", 
              damping: 15, 
              stiffness: 150 
            } 
          },
        }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-8 sm:mb-12 text-center relative z-10"
        style={{
          textShadow: "0 8px 32px rgba(0,0,0,0.5)",
          letterSpacing: "0.03em"
        }}
      >
        <motion.span
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            textShadow: [
              "0 8px 32px rgba(0,0,0,0.5)",
              "0 8px 32px rgba(6, 182, 212, 0.8)",
              "0 8px 32px rgba(0,0,0,0.5)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, #ffffff, #06b6d4, #3b82f6, #ffffff)",
            backgroundSize: "300% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          About me:
        </motion.span>
      </motion.h1>

      {/* Main Content Frame with Enhanced Effects */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 15 }}
        animate={controls}
        variants={{
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotateX: 0,
            transition: { 
              duration: 1.2, 
              type: "spring", 
              damping: 20, 
              stiffness: 100 
            } 
          },
        }}
        style={{ x: parallaxX, y: parallaxY, willChange: 'transform' }}
        className="relative z-10 w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-12"
      >
        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
          
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 lg:w-1/3">
            
            {/* Profile Image with Enhanced Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: { 
                    delay: 0.3, 
                    duration: 1, 
                    type: "spring", 
                    damping: 20, 
                    stiffness: 200 
                  } 
                },
              }}
              className="relative group"
            >
              {/* Multiple Glowing Rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 blur-lg"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Main Image Container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-cyan-400/50 shadow-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/assets/me.jpg" alt="Profile" className="w-full h-full object-cover" />
                </motion.div>
                
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl border-4 border-cyan-400 pointer-events-none"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                      "0 0 40px rgba(6, 182, 212, 0.8)",
                      "0 0 60px rgba(6, 182, 212, 0.6)",
                      "0 0 20px rgba(6, 182, 212, 0.5)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Floating Elements Around Image */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full"
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>

            {/* Enhanced Steve Jobs Quote */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { 
                    delay: 0.6, 
                    duration: 1, 
                    type: "spring" 
                  } 
                },
              }}
              className="w-full max-w-sm"
            >
              <motion.div
                className="bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-2xl relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 12px 40px rgba(6, 182, 212, 0.4)",
                  borderColor: "rgba(6, 182, 212, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                    backgroundSize: ["20px 20px", "30px 30px"]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage: "radial-gradient(circle, #06b6d4 1px, transparent 1px)"
                  }}
                />
                
                <motion.div
                  className="text-cyan-400 text-xs font-mono mb-2 sm:mb-3 opacity-70 flex items-center"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaQuoteLeft className="mr-2" />
                  // quote
                </motion.div>
                
                <motion.p
                  className="text-gray-200 text-xs sm:text-sm leading-relaxed font-medium italic mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  "The only way to do great work is to love what you do."
                </motion.p>
                
                <motion.div
                  className="text-cyan-400 text-xs font-mono opacity-70 flex items-center justify-end"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  // - Steve Jobs
                  <FaQuoteRight className="ml-2" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, type: "spring" } },
              }}
              className="w-full flex justify-center lg:justify-start"
            >
              <ResumeButton />
            </motion.div>
          </div>

          {/* Right Section - Scrollable Content */}
          <div className="flex-1 lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.8, type: "spring" } },
              }}
              className="h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600/50 scrollbar-track-transparent pr-2"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* About Me Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, type: "spring" } },
                  }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-3 sm:mb-4 flex items-center">
                    <span className="mr-2 sm:mr-3">##</span>
                    <span className="gradient-text">About Me</span>
                  </h2>
                  <div className="text-gray-200 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <p>
                      Hi, I'm <span className="font-bold text-white">Raunak Kumar Jha</span>, a passionate and results-driven developer dedicated to building impactful digital experiences. I am currently pursuing a <span className="font-semibold text-cyan-200">B.Tech in Computer Science Engineering at Gandhinagar University</span>, complemented by a <span className="font-semibold text-yellow-200">micro-credit program from IIT Guwahati</span> to strengthen my technical expertise and industry exposure.
                    </p>
                    <p>
                      My journey into technology began with curiosity—what started as experimenting with basic code quickly transformed into a deep passion for developing solutions that create real-world impact. Over time, I have honed my ability to think logically, solve complex problems, and build practical applications that combine both functionality and creativity.
                    </p>
                    <p>
                      I firmly believe that technology is not just about coding; it is about understanding user needs, designing innovative solutions, and creating experiences that make a difference. Every project I work on is an opportunity to learn, adapt, and push my boundaries to become a better version of myself.
                    </p>
                  </div>
                </motion.div>

                <motion.hr
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, scaleX: 1, transition: { delay: 0.7, duration: 0.8, type: "spring" } },
                  }}
                  className="border-cyan-900/30"
                />

                {/* Vision Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, type: "spring" } },
                  }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-3 sm:mb-4 flex items-center">
                    <span className="mr-2 sm:mr-3">##</span>
                    <span className="gradient-text">Vision</span>
                  </h2>
                  <div className="text-gray-200 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <p>
                      My vision is simple yet powerful: to <span className="font-semibold text-cyan-200">use technology as a tool for innovation and transformation</span>. I aim to create software solutions that simplify processes, enhance user experiences, and provide long-term value. Whether it's designing a clean user interface or optimizing backend processes for performance, I strive to build applications that are efficient, scalable, and impactful.
                    </p>
                    <p>
                      I approach each challenge with creativity, precision, and a mindset focused on problem-solving. For me, writing code is not just a skill—it's a responsibility to bring ideas to life with clarity and purpose.
                    </p>
                  </div>
                </motion.div>

                <motion.hr
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, scaleX: 1, transition: { delay: 1.0, duration: 0.8, type: "spring" } },
                  }}
                  className="border-cyan-900/30"
                />

                {/* Future Goals Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.8, type: "spring" } },
                  }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-3 sm:mb-4 flex items-center">
                    <span className="mr-2 sm:mr-3">##</span>
                    <span className="gradient-text">Future Goals</span>
                  </h2>
                  <div className="text-gray-200 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <p>
                      While my current focus is on mastering <span className="font-semibold text-cyan-200">full-stack development</span> and delivering practical, scalable web solutions, I am preparing myself for the future of technology. Over the coming years, I plan to dive deep into <span className="font-semibold text-purple-200">emerging technologies</span> such as <span className="text-green-300 font-semibold">Blockchain</span>, <span className="text-blue-300 font-semibold">SaaS platforms</span>, <span className="text-yellow-200 font-semibold">Web3</span>, and <span className="text-orange-300 font-semibold">Cryptocurrency</span>—and many more evolving trends that are shaping the digital landscape.
                    </p>
                    <p>
                      These technologies represent the next big wave of innovation, and I want to position myself as a developer who not only understands the present but is ready for the future. My goal is to learn, experiment, and apply these cutting-edge skills to create solutions that are secure, decentralized, and transformative for businesses and individuals alike.
                    </p>
                  </div>
                </motion.div>

                <motion.hr
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, scaleX: 1, transition: { delay: 1.3, duration: 0.8, type: "spring" } },
                  }}
                  className="border-cyan-900/30"
                />

                {/* Beyond Tech Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.8, type: "spring" } },
                  }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-3 sm:mb-4 flex items-center">
                    <span className="mr-2 sm:mr-3">##</span>
                    <span className="gradient-text">Beyond Tech</span>
                  </h2>
                  <div className="text-gray-200 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <p>
                      When I'm not coding, you'll often find me playing <span className="text-orange-300 font-semibold">football</span>, which keeps me active, sharp, and competitive. I'm also passionate about <span className="text-purple-300 font-semibold">personal growth, exploring new technologies, and discovering ways to combine creativity with logic</span>. Staying updated with the latest trends, learning continuously, and challenging myself every day are values I strongly believe in.
                    </p>
                    <p>
                      I see every obstacle as a stepping stone to growth—and every line of code as an opportunity to make a positive impact.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                delay: 2.3, 
                duration: 0.8, 
                type: "spring" 
              } 
            },
          }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      delay: 2.4 + index * 0.1, 
                      duration: 0.6, 
                      type: "spring" 
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {/* Button Container */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${social.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Icon */}
                    <IconComponent className="text-white text-lg sm:text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/30 to-transparent opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Tooltip - only show for hovered button */}
                  {hoveredSocial === index && (
                    <div
                      className="absolute left-1/2 top-full mt-3 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg border border-cyan-500"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {social.name}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/90 border-l border-t border-cyan-500 rotate-45"></div>
                    </div>
                  )}
                  
                  {/* Floating Particles Around Button */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0"
                    whileHover={{ opacity: 1 }}
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #38bdf8 0%, #6366f1 50%, #a78bfa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 800;
          background-size: 200% 100%;
          animation: gradientShift 4s ease-in-out infinite;
        }
        
        .highlight-text {
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 700;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8));
        }
      `}</style>
    </section>
  );
}
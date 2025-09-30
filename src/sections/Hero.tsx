import { useRef } from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
//import type { Engine } from 'tsparticles-engine';

export default function Hero() {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(heroRef, { once: true });
  if (isInView) controls.start('visible');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, 1], ['-12px', '12px']);
  const parallaxY = useTransform(mouseY, [0, 1], ['-12px', '12px']);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center text-center bg-black overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24"
    >
      {/* Falling Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: '#000' } },
          fpsLimit: 30, // Reduced for better performance
          particles: {
            number: { value: 30, density: { enable: true, area: 800 } }, // Reduced particle count
            color: { value: '#fff' },
            opacity: { value: 0.3 }, // Reduced opacity
            size: { value: 3 }, // Smaller particles
            move: { enable: true, speed: 0.5, direction: 'bottom', outModes: { default: 'out' } }, // Slower movement
            shape: { type: 'circle' },
            links: { enable: false },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: false }, // Disabled for performance
              resize: true,
            },
            modes: { repulse: { distance: 80, duration: 0.3 } }, // Reduced interaction range
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          style={{ x: parallaxX, y: parallaxY }}
          className="font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-4 sm:mb-6 text-white"
        >
          <span className="block">Hi, I'm</span>
          <span className="block mt-1 sm:mt-2 gradient-outline-glow">RAUNAK KUMAR JHA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1 } } }}
          className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl text-center mb-6 sm:mb-8 mx-auto px-4"
        >
          An aspiring <span className="shimmer-text">Full Stack Developer</span> passionate about building sleek web experiences.
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          variants={{ visible: { opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.7 } } }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(245,158,11,0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 rounded-full text-white font-semibold text-base sm:text-lg tracking-wide drop-shadow-xl hover:from-amber-400 hover:via-orange-500 hover:to-amber-500 transition-all duration-300"
          data-cursor-hover
          data-cursor-text="Explore My Work"
          data-cursor-color="#f59e0b"
          data-cursor-magnetic
          data-magnetic-strength="120"
        >
          VIEW PROJECTS
        </motion.a>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-amber-400 rounded-full flex items-center justify-center animate-bounce">
          <span className="block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full"></span>
        </div>
        <span className="mt-2 text-amber-300 uppercase tracking-wider text-xs">Scroll</span>
      </motion.div>

      <style>{`
        .gradient-outline-glow {
          background: linear-gradient(90deg, #f59e0b, #d97706, #92400e, #f59e0b);
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.3);
          animation: glowPulse 2.5s infinite alternate;
        }
        @keyframes glowPulse {
          from { filter: drop-shadow(0 0 6px rgba(245,158,11,0.5)); }
          to   { filter: drop-shadow(0 0 20px rgba(245,158,11,0.8)); }
        }
        .shimmer-text {
          background: linear-gradient(270deg, rgba(255,255,255,0.3), rgba(255,255,255,0.9), rgba(255,255,255,0.3));
          background-size: 400% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerMove 3s infinite;
        }
        @keyframes shimmerMove {
          0% { background-position: 0% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </section>
  );
}

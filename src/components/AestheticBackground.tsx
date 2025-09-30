import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  direction: number;
}

export default function AestheticBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating elements (increased from 8 to 15)
    const elements: FloatingElement[] = [];
    const colors = [
      'from-amber-400/20 to-orange-500/20',
      'from-purple-400/20 to-pink-500/20',
      'from-blue-400/20 to-cyan-500/20',
      'from-emerald-400/20 to-teal-500/20',
      'from-rose-400/20 to-red-500/20',
      'from-indigo-400/20 to-purple-500/20',
      'from-yellow-400/20 to-amber-500/20',
      'from-pink-400/20 to-rose-500/20',
      'from-cyan-400/20 to-blue-500/20',
      'from-violet-400/20 to-indigo-500/20'
    ];

    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 250 + 80,
        duration: Math.random() * 25 + 10,
        delay: Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setFloatingElements(elements);

    // Generate small particles (50 particles)
    const particleArray: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.6 + 0.2,
        direction: Math.random() * 360
      });
    }
    setParticles(particleArray);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Orbs */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full bg-gradient-to-r ${element.color} blur-xl`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            x: [0, 60, -40, 20, 0],
            y: [0, -40, 60, -20, 0],
            scale: [1, 1.3, 0.7, 1.1, 1],
            opacity: [0.2, 0.7, 0.1, 0.5, 0.2]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Small Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-amber-400/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [
              0, 
              Math.cos(particle.direction * Math.PI / 180) * 100,
              Math.cos((particle.direction + 90) * Math.PI / 180) * 80,
              Math.cos((particle.direction + 180) * Math.PI / 180) * 60,
              0
            ],
            y: [
              0,
              Math.sin(particle.direction * Math.PI / 180) * 100,
              Math.sin((particle.direction + 90) * Math.PI / 180) * 80,
              Math.sin((particle.direction + 180) * Math.PI / 180) * 60,
              0
            ],
            scale: [1, 1.5, 0.5, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.3, particle.opacity * 1.2, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Additional Glowing Dots */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-0.5 h-20 bg-gradient-to-b from-amber-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'rotate(45deg)',
          }}
          animate={{
            x: [0, 200],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)`
        }}
      />

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.2)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.2)" />
          </linearGradient>
        </defs>
        
        {/* Primary animated curves */}
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={`curve-${i}`}
            d={`M ${i * 150} 0 Q ${i * 150 + 100} ${200 + i * 80} ${i * 150 + 200} 400`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            animate={{
              d: [
                `M ${i * 150} 0 Q ${i * 150 + 100} ${200 + i * 80} ${i * 150 + 200} 400`,
                `M ${i * 150} 0 Q ${i * 150 + 180} ${120 + i * 80} ${i * 150 + 200} 400`,
                `M ${i * 150} 0 Q ${i * 150 + 20} ${280 + i * 80} ${i * 150 + 200} 400`,
                `M ${i * 150} 0 Q ${i * 150 + 100} ${200 + i * 80} ${i * 150 + 200} 400`
              ]
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Secondary animated curves */}
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={`curve2-${i}`}
            d={`M ${i * 180 + 50} 100 Q ${i * 180 + 150} ${300 + i * 60} ${i * 180 + 250} 500`}
            stroke="url(#lineGradient2)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
            animate={{
              d: [
                `M ${i * 180 + 50} 100 Q ${i * 180 + 150} ${300 + i * 60} ${i * 180 + 250} 500`,
                `M ${i * 180 + 50} 100 Q ${i * 180 + 200} ${250 + i * 60} ${i * 180 + 250} 500`,
                `M ${i * 180 + 50} 100 Q ${i * 180 + 100} ${350 + i * 60} ${i * 180 + 250} 500`,
                `M ${i * 180 + 50} 100 Q ${i * 180 + 150} ${300 + i * 60} ${i * 180 + 250} 500`
              ]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        ))}

        {/* Connecting dots */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={Math.random() * 1200}
            cy={Math.random() * 800}
            r="1"
            fill="rgba(245, 158, 11, 0.6)"
            animate={{
              opacity: [0, 1, 0],
              r: [0.5, 2, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

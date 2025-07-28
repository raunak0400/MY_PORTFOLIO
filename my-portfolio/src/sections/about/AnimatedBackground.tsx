import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      {/* Morphing glass blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 rounded-full blur-3xl opacity-60 animate-morph"
        style={{ zIndex: 1 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.8, type: "spring" }}
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-blue-500 rounded-full blur-3xl opacity-60 animate-morph2"
        style={{ zIndex: 1 }}
      />
      {/* SVG animated background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden>
        <defs>
          <radialGradient id="bg1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg1)" />
      </svg>
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 pointer-events-none z-20" style={{
        background: "url('https://www.transparenttextures.com/patterns/noise.png') repeat",
        opacity: 0.07,
        mixBlendMode: "overlay"
      }} />
      <style>{`
        .animate-morph {
          animation: morph 12s infinite alternate linear;
        }
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
          100% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
        }
        .animate-morph2 {
          animation: morph2 14s infinite alternate linear;
        }
        @keyframes morph2 {
          0% { border-radius: 70% 30% 50% 50%/60% 40% 60% 40%; }
          100% { border-radius: 40% 70% 30% 60%/50% 60% 40% 60%; }
        }
      `}</style>
    </>
  );
}

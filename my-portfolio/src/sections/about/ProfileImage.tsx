import { motion } from "framer-motion";

export default function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, rotateY: -20 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.2, duration: 1, type: "spring" }}
      whileHover={{ scale: 1.09, rotateY: 10, boxShadow: "0 0 40px #38bdf8" }}
      className="flex-shrink-0 group"
      tabIndex={0}
      aria-label="Profile image"
    >
      <div className="relative max-w-xs w-full aspect-[834/1074] rounded-2xl overflow-hidden border-4 border-cyan-400 shadow-xl group-hover:shadow-cyan-400/60 transition-all duration-300 bg-black flex items-center justify-center">
        <img
          src="/src/assets/me.jpg"
          alt="Raunak Kumar Jha"
          className="w-full h-full object-contain object-center bg-black"
        />
        {/* Animated border glow */}
        <span className="absolute inset-0 rounded-2xl border-4 border-cyan-400 opacity-30 blur-lg pointer-events-none animate-borderGlow" />
        {/* Floating badge */}
        <span className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
          🚀 Coder
        </span>
      </div>
    </motion.div>
  );
}
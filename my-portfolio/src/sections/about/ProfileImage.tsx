import { motion } from "framer-motion";

export default function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, rotateY: -20 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.2, duration: 1, type: "spring" }}
      whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0 0 40px #38bdf8" }}
      className="flex-shrink-0 group w-full sm:w-auto"
      tabIndex={0}
      aria-label="Profile image"
    >
      <div className="relative 
        w-[280px] sm:w-[320px] md:w-[380px] lg:max-w-xs mx-auto
        aspect-[834/1074] 
        rounded-xl sm:rounded-2xl 
        overflow-hidden 
        border-2 sm:border-4 border-cyan-400 
        shadow-lg sm:shadow-xl 
        group-hover:shadow-cyan-400/60 
        transition-all duration-300 
        bg-black 
        flex items-center justify-center"
      >
        <img
          src="/assets/me.jpg"
          alt="Raunak Kumar Jha"
          className="w-full h-full object-contain object-center bg-black"
          loading="eager"
        />
        {/* Animated border glow */}
        <span className="absolute inset-0 
          rounded-xl sm:rounded-2xl 
          border-2 sm:border-4 border-cyan-400 
          opacity-20 sm:opacity-30 
          blur-md sm:blur-lg 
          pointer-events-none 
          animate-borderGlow" 
        />
        {/* Floating badge */}
        <span className="absolute 
          -top-2 -right-2 sm:-top-4 sm:-right-4
          bg-gradient-to-r from-cyan-400 to-blue-500 
          text-white 
          px-2 sm:px-3 
          py-0.5 sm:py-1 
          rounded-full 
          text-[10px] sm:text-xs 
          font-bold 
          shadow-lg 
          animate-bounce"
        >
          🚀 Coder
        </span>
      </div>
    </motion.div>
  );
}
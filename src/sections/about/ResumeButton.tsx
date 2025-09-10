import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ResumeButton() {
  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#38bdf8", "#a78bfa", "#f472b6", "#fff"],
    });
  };

  return (
    <motion.a
      href="/assets/resume.pdf"
      download
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 32px #38bdf8, 0 0 80px #2563eb",
        background: "linear-gradient(90deg, #38bdf8 0%, #a78bfa 100%)",
      }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-block px-10 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 shadow-xl border-2 border-cyan-300 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 overflow-hidden"
      onClick={handleConfetti}
      tabIndex={0}
      aria-label="Download Resume"
    >
      <span className="relative z-10">Resume</span>
      {/* Shine effect */}
      <span className="absolute left-0 top-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
        <motion.span
          className="absolute left-[-75%] top-0 w-1/2 h-full bg-white opacity-20 rotate-12"
          animate={{ left: ["-75%", "120%"] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
      </span>
    </motion.a>
  );
}
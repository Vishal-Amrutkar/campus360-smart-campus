"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] pointer-events-none ${progress === 100 ? "hidden" : "flex"}`}
      style={{ display: progress === 100 ? "none" : "flex" }} // Ensure it's fully hidden after animation
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">Campus360</h1>
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-brand"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <p className="text-white/40 text-xs mt-3 uppercase tracking-widest font-mono">
          Loading Cinematic Experience {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
}

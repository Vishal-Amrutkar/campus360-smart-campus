"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import dynamic from 'next/dynamic';

const AIChatPanel = dynamic(() => import('./AIChatPanel'), { 
  ssr: false,
});

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-brand-blue/90 glass-always shadow-[0_0_30px_rgba(0,80,255,0.4)] flex items-center justify-center text-white border border-brand-cyan/30 group"
          >
            <div className="absolute inset-0 rounded-full bg-brand-cyan/20 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
            <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <AIChatPanel onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

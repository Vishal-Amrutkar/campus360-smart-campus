"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Fade background after 40px
    if (latest > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar on scroll down, show on scroll up (optional, Apple usually keeps it sticky but minimal)
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-40 transition-colors duration-300 ${
        isScrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-brand flex items-center justify-center">
            <span className="text-white text-[10px] font-black">C3</span>
          </div>
          Campus360
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="#overview" className="hover:text-white transition-colors">Overview</Link>
          <Link href="#courses" className="hover:text-white transition-colors">Campus</Link>
          <Link href="#faculty" className="hover:text-white transition-colors">Faculty</Link>
          <Link href="#clubs" className="hover:text-white transition-colors">Clubs</Link>
          <Link href="#timetable" className="hover:text-white transition-colors">Timetable</Link>
          <Link href="#events" className="hover:text-white transition-colors">Events</Link>
          <Link href="#notices" className="hover:text-white transition-colors">Notices</Link>
        </div>

        <div>
          <button className="px-5 py-2 text-sm font-medium text-white rounded-full border-gradient glass hover:text-glow transition-all duration-300">
            Explore Campus360
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

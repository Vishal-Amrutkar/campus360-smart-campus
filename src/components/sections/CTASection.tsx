"use client";


import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-40 px-6 bg-[#050505] relative z-10 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,80,255,0.08)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="text-center relative z-10">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-2 scroll-blur-reveal">
          Know your campus.
        </h2>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-brand-cyan mb-12 scroll-blur-reveal" style={{ animationDelay: '100ms' }}>
          Own your day.
        </h2>
        
        <div className="scroll-scale-reveal" style={{ animationDelay: '200ms' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white text-[#050505] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3 mx-auto group">
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

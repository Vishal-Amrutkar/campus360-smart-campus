"use client";

import { motion } from "framer-motion";
import configData from "@/data/config.json";

export default function OrganizationChart() {
  return (
    <section className="py-24 px-6 bg-[#0A0A0C] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,80,255,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-20 scroll-blur-reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Leadership
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            The core team guiding the academic vision of the campus.
          </p>
        </div>

        <div className="flex flex-col items-center reveal-group">
          {/* Principal */}
          {configData.principal && (
            <>
              <div className="glass border border-white/20 rounded-2xl p-6 min-w-[280px] shadow-2xl relative scroll-scale-reveal">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Principal
                </div>
                <div className="text-xl font-bold text-white mt-2">{configData.principal}</div>
              </div>

              {/* Line connecting Principal and HOD */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: 48 }}
                className="w-[2px] bg-gradient-to-b from-brand-blue to-brand-cyan my-0"
              />
            </>
          )}

          {/* HOD */}
          <div 
            className="glass border border-white/20 rounded-2xl p-6 min-w-[280px] shadow-2xl relative scroll-scale-reveal"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-cyan text-[#050505] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              HOD
            </div>
            <div className="text-xl font-bold text-white mt-2">{configData.hod}</div>
          </div>

          {/* Line splitting to faculty */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: 48 }}
            className="w-[2px] bg-gradient-to-b from-brand-cyan to-white/20 my-0 relative"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100vw", maxWidth: "600px" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-white/20"
            />
          </motion.div>

          {/* Faculty Label */}
          <div 
            className="mt-8 text-white/50 text-sm uppercase tracking-widest scroll-reveal"
          >
            Faculty Members
          </div>
          <div 
             className="text-2xl mt-2 text-white/30 scroll-reveal"
          >
            &darr;
          </div>
        </div>
      </div>
    </section>
  );
}

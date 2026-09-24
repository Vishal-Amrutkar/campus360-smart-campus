"use client";


import { MapPin } from "lucide-react";

export default function CampusMap() {
  return (
    <section id="map" className="py-24 px-6 bg-[#0A0A0C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-blur-reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Campus Map
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Interactive campus navigation will be available here.
          </p>
        </div>

        <div
          className="w-full aspect-video md:aspect-[21/9] glass border border-white/10 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center group scroll-scale-reveal"
        >
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,214,255,0.2)] border border-brand-cyan/20">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Campus map integration</h3>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Coming Soon</p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A0A0C] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

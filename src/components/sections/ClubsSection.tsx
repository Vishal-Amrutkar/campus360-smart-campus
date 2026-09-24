"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clubsData from "@/data/clubs.json";
import { Users, Calendar as CalendarIcon, X } from "lucide-react";

export default function ClubsSection() {
  const [selectedClub, setSelectedClub] = useState<typeof clubsData[0] | null>(null);

  // Close on escape key
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setSelectedClub(null);
    });
  }

  return (
    <section id="clubs" className="py-24 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-blur-reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Student Clubs
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Discover and join communities that match your passions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 reveal-group">
          {clubsData.map((club,  ) => (
            <div
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className="glass border border-white/10 rounded-2xl p-6 hover:border-brand-blue/50 hover:bg-white/5 transition-all cursor-pointer group flex flex-col h-full scroll-scale-reveal"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                {club.name}
              </h3>
              <p className="text-white/60 text-sm mb-6 flex-grow">
                {club.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{club.members.length + 1}</span>
                </div>
                <button className="text-brand-blue text-sm font-medium hover:text-brand-cyan transition-colors">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Sheet */}
      <AnimatePresence>
        {selectedClub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClub(null)}
              className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
            />
            
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass border border-white/20 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedClub.name}</h3>
                  <p className="text-white/60 text-lg">{selectedClub.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedClub(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <h4 className="text-sm uppercase tracking-widest text-brand-cyan mb-4 font-bold">Leadership</h4>
                  <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-cyan font-bold">
                      {selectedClub.head !== "[ADD NAME]" ? selectedClub.head.charAt(0) : "?"}
                    </div>
                    <div>
                      <div className="text-white font-medium">{selectedClub.head}</div>
                      <div className="text-white/50 text-sm">Club Head</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-4 font-bold flex items-center gap-2">
                    <Users className="w-4 h-4" /> Members
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedClub.members.map((member, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/5 text-white/80 text-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        {member}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-4 font-bold flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Upcoming Events
                  </h4>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center text-white/50 border-dashed">
                    No upcoming events scheduled.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

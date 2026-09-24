"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import eventsData from "@/data/events.json";

export default function EventsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "CLUB", "FACULTY", "HOD", "RPSS"];

  const filteredEvents = eventsData.filter(event => 
    filter === "All" || event.category === filter
  );

  return (
    <section id="events" className="py-24 px-6 bg-[#0A0A0C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 scroll-blur-reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Events & Decisions
            </h2>
            <p className="text-lg text-white/50 max-w-2xl">
              Stay updated with the latest happenings across campus.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat 
                    ? "bg-brand-blue text-white shadow-[0_0_15px_rgba(0,80,255,0.4)]" 
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 reveal-group">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                 
                 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass border border-white/5 rounded-2xl p-6 md:p-8 hover:border-brand-blue/30 transition-colors flex flex-col md:flex-row gap-6 md:gap-12 group scroll-scale-reveal"
              >
                <div className="flex-shrink-0 md:w-32 flex flex-col justify-center">
                  <div className="text-sm text-brand-cyan font-bold uppercase tracking-widest mb-1">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-white/50 text-sm">
                    {event.time}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
                      {event.category}
                    </span>
                    <span className="text-xs text-white/30">&bull; {event.source}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/60">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center glass rounded-3xl border border-white/5 border-dashed"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Nothing scheduled yet</h3>
              <p className="text-white/50">New campus events will appear here.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

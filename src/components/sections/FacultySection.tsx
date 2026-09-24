"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import facultyData from "@/data/faculty.json";
import { Search } from "lucide-react";

export default function FacultySection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaculty = facultyData.filter((f) => {
    const query = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(query) ||
      f.subjects.some(s => s.toLowerCase().includes(query)) ||
      (f.role && f.role.toLowerCase().includes(query))
    );
  });

  return (
    <section id="faculty" className="py-24 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 scroll-blur-reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Academic Faculty
            </h2>
            <p className="text-lg text-white/50 max-w-2xl">
              Meet the educators and mentors guiding your campus journey.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search by name, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFaculty.map((faculty,  ) => (
              <motion.div
                key={faculty.id}
                layout
                 
                 
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold tracking-wider">
                    {faculty.initials}
                  </div>
                  {faculty.role && (
                    <span className="text-xs font-medium text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">
                      {faculty.role}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{faculty.name}</h3>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {faculty.subjects.map((subject, idx) => (
                    <span key={idx} className="text-xs font-medium text-white/70 bg-white/10 px-2 py-1 rounded-md">
                      {subject}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredFaculty.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-white/40 text-lg">No faculty members found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

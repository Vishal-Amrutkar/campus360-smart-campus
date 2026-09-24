"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import timetableData from "@/data/timetable.json";

export default function TimetableSection() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Auto-select current day if it's Monday-Saturday
    const dayIndex = new Date().getDay();
    if (dayIndex > 0 && dayIndex < 7) {
      setTimeout(() => setSelectedDay(days[dayIndex - 1]), 0);
    }
    
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const isCurrentClass = (start: string, end: string, day: string) => {
    if (day !== days[currentTime.getDay() - 1]) return false;
    
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    
    return currentMinutes >= startTotal && currentMinutes < endTotal;
  };

  const scheduleForDay = timetableData.schedule[selectedDay as keyof typeof timetableData.schedule] || [];

  return (
    <section id="timetable" className="py-24 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 scroll-blur-reveal">
              Timetable
            </h2>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 border border-white/20">
                {timetableData.title}
              </span>
              <span>Effective: {timetableData.effective_date}</span>
            </div>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto custom-scrollbar no-scrollbar w-full lg:w-auto scroll-reveal">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-1 lg:flex-none ${
                  selectedDay === day ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                {selectedDay === day && (
                  <motion.div
                    layoutId="activeDay"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{day.substring(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-white/10 p-2 md:p-6 scroll-scale-reveal">
          <div className="grid grid-cols-[1fr] md:grid-cols-[100px_1fr] gap-4">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="col-span-1 md:col-span-2 space-y-3 reveal-group"
              >
                {scheduleForDay.map((entry, index) => {
                  const isActive = isCurrentClass(entry.start, entry.end, selectedDay);
                  
                  if (entry.is_recess) {
                    return (
                      <div key={index} className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 items-center justify-center text-white/40 uppercase tracking-widest text-xs font-bold border-dashed">
                        <span>{entry.start} - {entry.end}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
                        <span>Recess</span>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col md:flex-row gap-4 md:gap-8 p-6 rounded-2xl border transition-all ${
                        isActive 
                          ? "bg-brand-blue/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(0,214,255,0.1)] relative overflow-hidden" 
                          : "bg-[#050505] border-white/10 hover:border-white/20"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-cyan shadow-[0_0_10px_#00D6FF]" />
                      )}
                      
                      <div className="md:w-32 flex-shrink-0 flex items-center md:items-start text-white/50 text-sm font-medium">
                        {entry.start} - {entry.end}
                        {isActive && <span className="ml-3 md:hidden text-brand-cyan text-xs font-bold uppercase animate-pulse">Now</span>}
                      </div>
                      
                      <div className="flex-grow flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className={`text-xl font-bold ${isActive ? "text-brand-cyan" : "text-white"}`}>
                              {entry.subject}
                            </h4>
                            {isActive && <span className="hidden md:inline-block text-brand-cyan text-[10px] border border-brand-cyan/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Live</span>}
                          </div>
                          
                          {entry.faculty_initials && (
                            <div className="text-white/50 text-sm flex items-center gap-2 mt-2">
                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/80">
                                {entry.faculty_initials}
                              </div>
                              Faculty
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

        {/* Electives Note */}
        <div className="mt-12 p-6 glass rounded-2xl border border-white/10 text-sm">
          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Elective-I Subjects</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(timetableData.electives).map(([code, prof]) => (
              <div key={code} className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-brand-cyan font-bold mb-1">{code}</div>
                <div className="text-white/60 text-xs">{prof}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

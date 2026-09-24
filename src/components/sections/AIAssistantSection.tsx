"use client";

import { Sparkles, Send } from "lucide-react";

export default function AIAssistantSection() {
  return (
    <section id="ai" className="py-32 px-6 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,214,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2 scroll-reveal-right">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_rgba(0,80,255,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm">Campus360 AI</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 scroll-blur-reveal">
            Meet your smart <br/>
            campus assistant.
          </h2>
          
          <p className="text-lg text-white/50 mb-8 max-w-lg">
            Got a question? Just ask. The Campus360 AI knows the timetable, faculty directory, campus map, and all the latest notices. It&apos;s like having the entire campus in your pocket.
          </p>
          
          <div className="flex flex-wrap gap-3 reveal-group">
            {["Where is my MCA class?", "Who teaches DSA?", "What\'s the timetable for tomorrow?"].map((q, i) => (
              <div key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm">
                &quot;{q}&quot;
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="w-full max-w-[400px] glass border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col scroll-scale-reveal relative z-10">
            <div className="h-16 border-b border-white/10 flex items-center gap-3 px-6 bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Campus360 AI</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Online</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 reveal-group">
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan rounded-tl-sm">
                  Hi! I&apos;m your Campus360 AI Assistant. How can I help you today?
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm bg-white/10 text-white rounded-tr-sm">
                  What is today&apos;s timetable?
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan rounded-tl-sm">
                  Today is Monday. You have 3 classes scheduled. You currently have <strong>Software Engineering</strong> with <strong>Prof. A. Kadam</strong> until 11:30 AM.
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-[#050505]/50">
              <div className="relative">
                <div className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white/40">
                  Ask anything...
                </div>
                <div className="absolute right-1 top-1 bottom-1 w-10 rounded-full bg-brand-blue flex items-center justify-center text-white">
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements behind the chat UI */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none" />
        </div>

      </div>
    </section>
  );
}

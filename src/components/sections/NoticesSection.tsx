"use client";


import noticesData from "@/data/notices.json";
import { Bell, Paperclip, ArrowRight } from "lucide-react";

export default function NoticesSection() {
  return (
    <section id="notices" className="py-24 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 scroll-blur-reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 flex items-center gap-4">
            Latest Notices
            <div className="bg-brand-cyan/20 text-brand-cyan w-10 h-10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl">
            Official announcements, academic updates, and administrative notices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-group">
          {noticesData.map((notice,  ) => (
            <div
              key={notice.id}
              className="glass border border-white/10 rounded-2xl p-6 relative group hover:border-brand-blue/30 transition-colors flex flex-col h-full scroll-scale-reveal"
            >
              {notice.is_new && (
                <div className="absolute -top-3 -right-3 bg-brand-cyan text-[#050505] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,214,255,0.4)]">
                  New
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-1 rounded">
                  {notice.category}
                </span>
                <span className="text-xs text-white/30">
                  {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                {notice.title}
              </h3>
              
              <p className="text-white/60 text-sm mb-6 flex-grow">
                {notice.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors cursor-pointer">
                  <Paperclip className="w-4 h-4" />
                  <span>View attachment</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-brand-blue group-hover:text-white transition-colors cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          {noticesData.length === 0 && (
            <div 
              className="col-span-full py-20 text-center glass rounded-3xl border border-white/5 border-dashed"
            >
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re all caught up</h3>
              <p className="text-white/50">New notices will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

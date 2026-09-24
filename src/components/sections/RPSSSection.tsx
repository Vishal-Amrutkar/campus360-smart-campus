"use client";


import rpssData from "@/data/rpss.json";
import configData from "@/data/config.json";

export default function RPSSSection() {
  const leadership = [
    { role: "President", name: configData.rpss.president },
    { role: "Vice President", name: configData.rpss.vice_president },
    { role: "MC Representative", name: configData.rpss.mc_representative },
    { role: "Treasurer", name: configData.rpss.treasurer },
    { role: "Oracle", name: configData.rpss.oracle }
  ];

  return (
    <section id="rpss" className="py-24 px-6 bg-[#0A0A0C] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 scroll-blur-reveal">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {rpssData.name} <span className="text-white/40">| {rpssData.full_name}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {rpssData.description}
          </p>
        </div>

        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {/* HOD (Top) */}
          <div 
            className="glass px-8 py-4 rounded-full border border-white/10 shadow-lg relative z-10 scroll-reveal"
          >
            <span className="text-white/50 text-sm mr-3">HOD</span>
            <span className="text-white font-bold">{configData.hod}</span>
          </div>

          <div className="w-[2px] h-12 bg-gradient-to-b from-white/20 to-brand-blue scroll-reveal" />

          {/* Core Committee Grid */}
          <div className="glass rounded-3xl p-8 md:p-12 border border-brand-blue/20 w-full relative scroll-scale-reveal">
            <div className="absolute inset-0 bg-brand-blue/5 rounded-3xl" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 reveal-group">
              {leadership.map((item,  ) => (
                <div
                  key={item.role}
                  className={`bg-[#050505]/50 rounded-2xl p-6 border border-white/5 hover:border-brand-cyan/30 transition-colors ${
                    item.role === "President" ? "md:col-span-2 lg:col-span-3 text-center bg-white/5 border-brand-cyan/20" : ""
                  }`}
                >
                  <div className={`text-brand-cyan text-xs font-bold uppercase tracking-wider mb-2 ${item.role === "President" ? "text-brand-blue" : ""}`}>
                    {item.role}
                  </div>
                  <div className={`text-white font-bold ${item.role === "President" ? "text-2xl" : "text-lg"}`}>
                    {item.name}
                  </div>
                </div>
              ))}
            </div>

            {configData.rpss.office_bearers.length > 0 && (
              <>
                <div className="w-[2px] h-12 bg-gradient-to-b from-white/10 to-transparent mx-auto my-8 scroll-reveal" />
                <div className="text-center scroll-reveal">
                  <h4 className="text-white/40 text-sm uppercase tracking-widest mb-4">Office Bearers</h4>
                  <div className="flex flex-wrap justify-center gap-3 reveal-group">
                    {configData.rpss.office_bearers.map((bearer, idx) => (
                      <span key={idx} className="bg-white/5 px-4 py-2 rounded-full text-white/80 text-sm border border-white/10">
                        {bearer}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface TextOverlaysProps {
  progress: MotionValue<number>;
}

export default function TextOverlays({ progress }: TextOverlaysProps) {
  // 1. HERO (0–15%)
  const heroOpacity = useTransform(progress, [0, 0.08, 0.15], [1, 1, 0]);
  const heroY = useTransform(progress, [0, 0.15], [0, -100]);

  // 2. THE PROBLEM / DISCOVERY (15–30%)
  const problemOpacity = useTransform(progress, [0.15, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const problemX = useTransform(progress, [0.15, 0.2, 0.25, 0.3], [-100, 0, 0, -100]);

  // 3. EVERYTHING IN ONE PLACE (30–50%)
  const infoOpacity = useTransform(progress, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const infoX = useTransform(progress, [0.3, 0.35, 0.45, 0.5], [100, 0, 0, 100]);

  // 4. AI ASSISTANT (50–70%)
  const aiOpacity = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const aiY = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [100, 0, 0, -100]);

  // 5. COMMUNITY (70–85%)
  const communityOpacity = useTransform(progress, [0.7, 0.75, 0.8, 0.85], [0, 1, 1, 0]);
  const communityScale = useTransform(progress, [0.7, 0.75, 0.8, 0.85], [0.9, 1, 1, 1.1]);

  // 6. FINAL CTA (85–100%)
  const ctaOpacity = useTransform(progress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(progress, [0.85, 0.9, 1], [50, 0, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 1. HERO */}
      <motion.div 
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,21,0.6)_0%,transparent_50%)] -z-10" />
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6 text-glow">
          Campus360
        </h1>
        <p className="text-2xl md:text-4xl font-semibold text-white/90 mb-4 max-w-2xl text-gradient">
          Your entire campus. One smart place.
        </p>
        <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
          A smart campus assistant that helps students find, understand and navigate their college faster.
        </p>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="text-white/40 text-sm uppercase tracking-widest">Scroll to explore</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>

      {/* 2. THE PROBLEM */}
      <motion.div 
        style={{ opacity: problemOpacity, x: problemX }}
        className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-24"
      >
        <div className="max-w-xl pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            New campus.<br/><span className="text-white/50">No confusion.</span>
          </h2>
          <p className="text-xl text-white/70 mb-4 leading-relaxed">
            New buildings. New classrooms. New faculty. New schedules. New notices.
          </p>
          <p className="text-xl text-white/90 mb-8 font-medium">
            Campus360 brings everything together.
          </p>
          <p className="text-lg text-brand-cyan font-medium border-l-2 border-brand-cyan pl-4">
            Built especially for students who are still discovering their campus.
          </p>
        </div>
      </motion.div>

      {/* 3. EVERYTHING IN ONE PLACE */}
      <motion.div 
        style={{ opacity: infoOpacity, x: infoX }}
        className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-24 text-right"
      >
        <div className="max-w-xl pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-10">
            Everything on campus.<br/><span className="text-brand-blue">At a glance.</span>
          </h2>
          <div className="flex flex-wrap justify-end gap-3 max-w-lg">
            {["Faculty", "Classes", "Timetable", "Events", "Notices", "Clubs", "Campus Info"].map((item) => (
              <div key={item} className="glass px-6 py-3 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-brand-cyan transition-colors">
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 4. AI ASSISTANT */}
      <motion.div 
        style={{ opacity: aiOpacity, y: aiY }}
        className="absolute inset-0 flex flex-col justify-center items-center px-6"
      >
        <div className="max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Ask your campus.<br/><span className="text-brand-cyan text-glow">Get answers instantly.</span>
            </h2>
            <div className="flex flex-col gap-3 mt-8">
              <span className="text-white/50 text-lg">&quot;Where is my class?&quot;</span>
              <span className="text-white/50 text-lg">&quot;Who teaches DSA?&quot;</span>
              <span className="text-white/50 text-lg">&quot;What is today&apos;s timetable?&quot;</span>
              <span className="text-white/50 text-lg">&quot;What events are happening today?&quot;</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="glass border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand"></div>
              <div className="flex flex-col gap-6">
                <div className="bg-white/10 self-end px-5 py-3 rounded-2xl rounded-tr-sm text-white/90">
                  Where is my MCA class?
                </div>
                <div className="bg-brand-blue/10 self-start px-5 py-3 rounded-2xl rounded-tl-sm text-brand-cyan border border-brand-blue/20">
                  MCA classes are currently scheduled on the 3rd floor.
                </div>
                <div className="bg-white/10 self-end px-5 py-3 rounded-2xl rounded-tr-sm text-white/90">
                  What classes do I have today?
                </div>
                <div className="bg-brand-blue/10 self-start px-5 py-3 rounded-2xl rounded-tl-sm text-brand-cyan border border-brand-blue/20 flex flex-col gap-2">
                  <p>Here is your schedule for today:</p>
                  <div className="glass p-3 rounded-xl border border-brand-blue/30 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">DSA</span>
                      <span className="text-white/50">14:30 - 16:30</span>
                    </div>
                    <div className="text-brand-cyan/70">Prof. Milind Deshkar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5. COMMUNITY */}
      <motion.div 
        style={{ opacity: communityOpacity, scale: communityScale }}
        className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center"
      >
        <div className="max-w-3xl pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            More than information.<br/>It&apos;s your campus community.
          </h2>
          <p className="text-2xl text-white/60 leading-relaxed mb-12">
            RPSS Student Society &bull; 10+ Student Clubs
          </p>
          
          <div className="flex items-center justify-center gap-8">
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl glass border border-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <span className="text-white font-medium">Student Society</span>
             </div>
             <div className="h-[1px] w-16 bg-white/20"></div>
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl glass border border-white/20 flex items-center justify-center mb-4 text-brand-blue">
                  <span className="text-2xl">🎸</span>
                </div>
                <span className="text-white font-medium">Clubs</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* 6. FINAL CTA */}
      <motion.div 
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7)_0%,transparent_60%)] -z-10" />
        <div className="max-w-3xl pointer-events-auto drop-shadow-2xl">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 [text-shadow:_0_4px_24px_rgb(0_0_0_/_50%)]">
            Know your campus.<br/><span className="text-white/70">Own your day.</span>
          </h2>
          <p className="text-2xl text-white/90 mb-10 text-gradient [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
            Campus360. Designed for students. Built for every college.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-gradient-brand text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,80,255,0.5)] transition-shadow duration-300 transform hover:scale-105">
              Explore Campus360
            </button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300">
              Explore Features
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

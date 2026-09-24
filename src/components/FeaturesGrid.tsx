"use client";


import { Map, Users, BookOpen, Calendar, Star, Bell, Music, Crown, Bot } from "lucide-react";

const features = [
  {
    icon: <Map className="w-5 h-5 text-brand-blue" />,
    title: "Campus Map",
    description: "Interactive campus navigation will be available here."
  },
  {
    icon: <Users className="w-5 h-5 text-brand-cyan" />,
    title: "Faculty",
    description: "Connect with the educators guiding your journey."
  },
  {
    icon: <BookOpen className="w-5 h-5 text-white" />,
    title: "Classrooms",
    description: "Never get lost. Find exactly where your next class is."
  },
  {
    icon: <Calendar className="w-5 h-5 text-brand-blue" />,
    title: "Timetable",
    description: "Know exactly where your day begins and what's next."
  },
  {
    icon: <Star className="w-5 h-5 text-brand-cyan" />,
    title: "Events",
    description: "Stay updated with campus events and workshops."
  },
  {
    icon: <Bell className="w-5 h-5 text-white" />,
    title: "Notices",
    description: "Instant alerts for exams, holidays, and announcements."
  },
  {
    icon: <Music className="w-5 h-5 text-brand-blue" />,
    title: "Student Clubs",
    description: "Discover and join communities that match your passions."
  },
  {
    icon: <Crown className="w-5 h-5 text-brand-cyan" />,
    title: "RPSS",
    description: "Your student society, representing your voice on campus."
  },
  {
    icon: <Bot className="w-5 h-5 text-white" />,
    title: "AI Assistant",
    description: "Get immediate answers to any campus-related question, 24/7."
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-32 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,80,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 scroll-blur-reveal">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Everything you need. <br className="md:hidden"/>
            <span className="text-white/40">All in one place.</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Campus360 brings together all the disjointed parts of college life into a single, beautifully designed platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-group">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:border-brand-blue/30 transition-all duration-300 group scroll-scale-reveal"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-cyan transition-colors">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

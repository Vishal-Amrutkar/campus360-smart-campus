"use client";


import collegeData from "@/data/college.json";
import coursesData from "@/data/courses.json";
import facultyData from "@/data/faculty.json";
import clubsData from "@/data/clubs.json";

export default function CampusOverview() {
  const stats = [
    { label: "Courses", value: coursesData.length },
    { label: "Faculty", value: facultyData.length },
    { label: "Student Clubs", value: clubsData.length },
    { label: "AI Assistant", value: "Active" }
  ];

  return (
    <section id="overview" className="py-32 px-6 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 scroll-reveal-left">
          <h2 className="text-sm uppercase tracking-widest text-brand-cyan mb-4 font-semibold">
            {collegeData.short_name}
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {collegeData.full_name}
          </h3>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {collegeData.location}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto reveal-group">
          {stats.map((stat,  ) => (
            <div
              key={stat.label}
              className="glass border-gradient rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

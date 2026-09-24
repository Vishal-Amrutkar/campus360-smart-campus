"use client";


import coursesData from "@/data/courses.json";

export default function CoursesSection() {
  return (
    <section id="courses" className="py-24 px-6 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Academic Programs
          </h2>
          <p className="text-lg text-white/50 max-w-2xl">
            Explore the current courses and find your classroom easily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coursesData.map((course,  ) => (
            <div
              key={course.id}
              className={`glass rounded-3xl p-8 relative overflow-hidden ${
                course.has_data ? "border-gradient" : "border border-white/10 opacity-70"
              }`}
            >
              {course.has_data && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 blur-[50px] -mr-10 -mt-10 rounded-full" />
              )}
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2">{course.name}</h3>
                <p className="text-white/70 font-medium mb-8 h-12">{course.description}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/50 text-sm uppercase tracking-wider">Semester & Section</span>
                    <span className="text-white font-medium text-right">
                      {course.semester}<br/>{course.section !== "Information coming soon" && course.section}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white/50 text-sm uppercase tracking-wider">Location</span>
                    <span className={`font-medium ${course.has_data ? "text-brand-cyan" : "text-white/40"}`}>
                      {course.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#050505] py-20 px-6 border-t border-white/5 relative z-10 scroll-reveal">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,80,255,0.5)]">
              c3
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              Campus360
            </span>
          </div>
          <p className="text-white/60 font-medium mb-1">
            Smart Campus Assistant
          </p>
          <p className="text-white/40 text-sm">
            ASM College<br/>
            Chinchwad, Pune - 411019
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium text-white/50 max-w-lg">
          <a href="#courses" className="hover:text-brand-cyan transition-colors">Campus</a>
          <a href="#faculty" className="hover:text-brand-cyan transition-colors">Faculty</a>
          <a href="#timetable" className="hover:text-brand-cyan transition-colors">Timetable</a>
          <a href="#events" className="hover:text-brand-cyan transition-colors">Events</a>
          <a href="#notices" className="hover:text-brand-cyan transition-colors">Notices</a>
          <a href="#clubs" className="hover:text-brand-cyan transition-colors">Clubs</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-center text-white/30 text-xs font-medium uppercase tracking-widest">
        Campus information platform &bull; Designed for students
      </div>
    </footer>
  );
}

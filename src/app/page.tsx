"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), { ssr: false });
import TextOverlays from "@/components/TextOverlays";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

// Lazy loaded sections
const FeaturesGrid = dynamic(() => import("@/components/FeaturesGrid"));
const CampusMap = dynamic(() => import("@/components/sections/CampusMap"));
const CampusOverview = dynamic(() => import("@/components/sections/CampusOverview"));
const CoursesSection = dynamic(() => import("@/components/sections/CoursesSection"));
const OrganizationChart = dynamic(() => import("@/components/sections/OrganizationChart"));
const FacultySection = dynamic(() => import("@/components/sections/FacultySection"));
const RPSSSection = dynamic(() => import("@/components/sections/RPSSSection"));
const ClubsSection = dynamic(() => import("@/components/sections/ClubsSection"));
const TimetableSection = dynamic(() => import("@/components/sections/TimetableSection"));
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));
const AIAssistantSection = dynamic(() => import("@/components/sections/AIAssistantSection"));
const NoticesSection = dynamic(() => import("@/components/sections/NoticesSection"));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake loading for dramatic effect
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        setProgress(100);
        setTimeout(() => setIsLoaded(true), 500);
        clearInterval(interval);
      } else {
        setProgress(Math.floor(current));
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!isLoaded && <Loader progress={progress} />}
      
      <div 
        className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />

        {/* 3D Scrollytelling Cinematic Hero */}
        <ScrollCanvas>
          {(smoothProgress) => <TextOverlays progress={smoothProgress} />}
        </ScrollCanvas>

        {/* Main Campus360 Content */}
        <div className="relative bg-[#050505]">
          <FeaturesGrid />
          <CampusMap />
          <CampusOverview />
          <CoursesSection />
          <OrganizationChart />
          <FacultySection />
          <RPSSSection />
          <ClubsSection />
          <TimetableSection />
          <EventsSection />
          <NoticesSection />
          <AIAssistantSection />
          <CTASection />
        </div>

        <Footer />
        
        {/* Floating Global AI Assistant */}
        <AIAssistant />
      </div>
    </>
  );
}

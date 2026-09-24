"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ScrollCanvas from "@/components/ScrollCanvas";
import TextOverlays from "@/components/TextOverlays";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

// New Sections
import FeaturesGrid from "@/components/FeaturesGrid";
import CampusMap from "@/components/sections/CampusMap";
import CampusOverview from "@/components/sections/CampusOverview";
import CoursesSection from "@/components/sections/CoursesSection";
import OrganizationChart from "@/components/sections/OrganizationChart";
import FacultySection from "@/components/sections/FacultySection";
import RPSSSection from "@/components/sections/RPSSSection";
import ClubsSection from "@/components/sections/ClubsSection";
import TimetableSection from "@/components/sections/TimetableSection";
import EventsSection from "@/components/sections/EventsSection";
import CTASection from "@/components/sections/CTASection";
import AIAssistantSection from "@/components/sections/AIAssistantSection";
import NoticesSection from "@/components/sections/NoticesSection";

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

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useScroll, useSpring, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

// Edit this to match your actual sequence frame count
export const TOTAL_FRAMES = 300; 

interface ScrollCanvasProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
  children?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollCanvas({ onProgress, onLoaded, children }: ScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Framer motion scroll setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for a cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress (0-1) to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  const currentFrameRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Visibility and Intersection Observer
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting && !document.hidden;
    });
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  // Drawing function
  const drawFrame = useCallback((index: number) => {
    if (!isVisibleRef.current) return;
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const imgIndex = Math.min(index, imagesRef.current.length - 1);
    const img = imagesRef.current[imgIndex];
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Scale to cover viewport with correct aspect ratio
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const isLowEnd = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const framesToLoad = isLowEnd ? 1 : TOTAL_FRAMES;
    
    for (let i = 1; i <= framesToLoad; i++) {
      const img = new Image();
      // zero-padded, 4 digits: frame_0001.jpg
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        imagesRef.current[i - 1] = img;
        const progress = (loadedCount / framesToLoad) * 100;
        if (onProgress) onProgress(progress);
        
        if (loadedCount === framesToLoad) {
          if (onLoaded) onLoaded();
          requestAnimationFrame(() => drawFrame(0));
        }
      };
      
      img.onerror = () => {
        console.warn(`Frame ${paddedIndex} failed to load.`);
        loadedCount++;
        if (loadedCount === framesToLoad) {
          if (onLoaded) onLoaded();
          requestAnimationFrame(() => drawFrame(0));
        }
      };
    }
  }, [onProgress, onLoaded, drawFrame]);

  // Handle Resize
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const dpr = window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    };

    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", throttledResize, { passive: true });
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(timeoutId);
    };
  }, [drawFrame]);

  // Request Animation Frame loop for drawing
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const newIndex = Math.floor(latest);
    if (newIndex !== currentFrameRef.current && newIndex >= 0 && newIndex < TOTAL_FRAMES) {
      currentFrameRef.current = newIndex;
      requestAnimationFrame(() => drawFrame(newIndex));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
        {children && children(smoothProgress)}
      </div>
    </div>
  );
}

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

  // Drawing function
  const drawFrame = useCallback((index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0 || !imagesRef.current[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    
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
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // zero-padded, 4 digits: frame_0001.jpg
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/frames/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        imagesRef.current[i - 1] = img;
        const progress = (loadedCount / TOTAL_FRAMES) * 100;
        if (onProgress) onProgress(progress);
        
        if (loadedCount === TOTAL_FRAMES) {
          if (onLoaded) onLoaded();
          requestAnimationFrame(() => drawFrame(0));
        }
      };
      
      img.onerror = () => {
        console.warn(`Frame ${paddedIndex} failed to load.`);
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          if (onLoaded) onLoaded();
          requestAnimationFrame(() => drawFrame(0));
        }
      };
    }
  }, [onProgress, onLoaded, drawFrame]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener("resize", handleResize);
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

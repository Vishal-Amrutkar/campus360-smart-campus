"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, MotionValue } from "framer-motion";

export const TOTAL_FRAMES = 120;

interface ScrollCanvasProps {
  children?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollCanvas({ children }: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for loader
  const [isReady, setIsReady] = useState(false);
  
  // Framer motion for children (TextOverlays) only - no React state for canvas loop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let rAFId: number;
    let isMobile = window.innerWidth < 768;
    const isVisible = { current: true };
    const bitmaps: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let drawRect = { x: 0, y: 0, w: 0, h: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Canvas context
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Load function
    const loadFrame = async (i: number): Promise<void> => {
      if (bitmaps[i]) return;
      try {
        const padded = (i + 1).toString().padStart(4, "0");
        const folder = isMobile ? "mobile" : "desktop";
        const res = await fetch(`/frames/${folder}/frame_${padded}.webp`);
        if (!res.ok) return;
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob);
        bitmaps[i] = bitmap;
      } catch (e) {
        console.warn(`Failed to load frame ${i}`);
      }
    };

    // Sliding window logic for mobile
    const manageCache = (currentIndex: number) => {
      if (!isMobile) return;
      const windowSize = 40;
      const half = windowSize / 2;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (Math.abs(i - currentIndex) > half) {
          if (bitmaps[i]) {
            bitmaps[i]?.close();
            bitmaps[i] = null;
          }
        } else {
          // prefetch nearby if missing
          if (!bitmaps[i] && !prefersReducedMotion) {
             if (window.requestIdleCallback) {
                window.requestIdleCallback(() => loadFrame(i));
             } else {
                setTimeout(() => loadFrame(i), 0);
             }
          }
        }
      }
    };

    // Progressive Initial Load
    const initialLoad = async () => {
      const initialIndices = [];
      for (let i = 0; i < TOTAL_FRAMES; i += 8) {
        initialIndices.push(i);
      }
      if (!initialIndices.includes(TOTAL_FRAMES - 1)) {
        initialIndices.push(TOTAL_FRAMES - 1);
      }
      
      // If reduced motion, just load the first frame and stop
      if (prefersReducedMotion) {
        await loadFrame(0);
        setIsReady(true);
        return;
      }

      await Promise.all(initialIndices.map(i => loadFrame(i)));
      setIsReady(true);
      
      // Load the rest in background
      let remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!initialIndices.includes(i)) remaining.push(i);
      }
      
      const loadNext = () => {
        if (remaining.length === 0) return;
        const i = remaining.shift();
        if (i !== undefined && !bitmaps[i]) {
           loadFrame(i).then(() => {
             if (window.requestIdleCallback) {
               window.requestIdleCallback(loadNext);
             } else {
               setTimeout(loadNext, 50);
             }
           });
        } else {
           loadNext();
        }
      };
      
      if (!isMobile) {
        loadNext();
      }
    };

    initialLoad();

    // Scroll state
    let targetScroll = 0;
    let currentScroll = 0;
    let lastRenderedFrame = -1;
    let containerHeight = window.innerHeight * 5; 
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!containerRef.current) return;
      // Get offset from top of document
      const rect = containerRef.current.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top;
      
      let raw = (window.scrollY - offsetTop) / (containerHeight - window.innerHeight);
      targetScroll = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      isMobile = window.innerWidth < 768;
      if (containerRef.current) {
        containerHeight = containerRef.current.offsetHeight;
      }
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      drawRect = { x: 0, y: 0, w: 0, h: 0 }; // force recompute
      
      handleScroll();
      lastRenderedFrame = -1; // force redraw
    };

    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };
    window.addEventListener("resize", throttledResize, { passive: true });
    
    // Initial setup
    handleResize();

    // Visibility observer
    const handleVis = () => { isVisible.current = !document.hidden; };
    document.addEventListener("visibilitychange", handleVis);
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting && !document.hidden;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    // Render loop
    const loop = (time: number) => {
      rAFId = requestAnimationFrame(loop);
      
      if (!isVisible.current || !isReady) {
        lastTime = time;
        return;
      }

      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // If reduced motion, just stay at 0
      if (prefersReducedMotion) {
        targetScroll = 0;
      }

      // Frame-rate independent damping
      if (Math.abs(targetScroll - currentScroll) > 0.0001) {
        currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-dt * 10));
      } else {
        currentScroll = targetScroll;
      }

      const frameIndex = Math.round(currentScroll * (TOTAL_FRAMES - 1));

      if (frameIndex !== lastRenderedFrame) {
        lastRenderedFrame = frameIndex;
        if (!prefersReducedMotion) {
          manageCache(frameIndex);
        }

        // Draw closest available frame
        let idxToDraw = frameIndex;
        while (idxToDraw >= 0 && !bitmaps[idxToDraw]) {
           idxToDraw--;
        }
        
        const bitmap = bitmaps[idxToDraw];
        if (bitmap && ctx) {
          // Precompute drawRect once per resize
          if (drawRect.w === 0 && bitmap.width > 0) {
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = bitmap.width / bitmap.height;
            if (canvasRatio > imgRatio) {
              drawRect.h = canvas.width / imgRatio;
              drawRect.w = canvas.width;
              drawRect.y = (canvas.height - drawRect.h) / 2;
              drawRect.x = 0;
            } else {
              drawRect.w = canvas.height * imgRatio;
              drawRect.h = canvas.height;
              drawRect.x = (canvas.width - drawRect.w) / 2;
              drawRect.y = 0;
            }
          }
          
          ctx.fillStyle = "#050505";
          ctx.fillRect(0, 0, canvas.width, canvas.height); 
          ctx.drawImage(bitmap, drawRect.x, drawRect.y, drawRect.w, drawRect.h);
        }
      }
    };
    
    rAFId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rAFId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", throttledResize);
      document.removeEventListener("visibilitychange", handleVis);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      bitmaps.forEach(b => b?.close());
    };
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]">
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white bg-[#050505]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-cyan"></div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover bg-[#050505]"
          style={{ width: '100%', height: '100%' }}
        />
        {children && children(smoothProgress)}
      </div>
    </div>
  );
}

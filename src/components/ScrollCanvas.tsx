"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, MotionValue } from "framer-motion";

export const TOTAL_FRAMES = 300;

interface ScrollCanvasProps {
  children?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollCanvas({ children }: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Only used to drive the text overlays passed in as children — unrelated
  // to the canvas frame drawing below, so it's untouched by that logic.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const canvasMaybeNull = canvasRef.current;
    const containerMaybeNull = containerRef.current;
    if (!canvasMaybeNull || !containerMaybeNull) return;
    const ctxMaybeNull = canvasMaybeNull.getContext("2d");
    if (!ctxMaybeNull) return;

    // Rebind as fresh consts with explicit non-null types. TypeScript's
    // control-flow narrowing from the checks above does not carry into
    // nested functions declared below (resizeCanvas, drawFrame, getProgress,
    // etc.), since it can't prove those closures only ever run after this point.
    const canvas: HTMLCanvasElement = canvasMaybeNull;
    const container: HTMLDivElement = containerMaybeNull;
    const ctx: CanvasRenderingContext2D = ctxMaybeNull;

    // Plain <img> elements. The browser owns decoding/caching — no manual
    // ImageBitmap cache, no eviction, no closing, nothing to get stale.
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let drawRect = { x: 0, y: 0, w: 0, h: 0 };
    let currentFrame = -1;
    let ticking = false; // rAF-throttle flag for scroll events

    function frameUrl(index: number) {
      const padded = String(index + 1).padStart(4, "0");
      return `/frames/frame_${padded}.jpg`;
    }

    function resizeCanvas() {
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawRect = { x: 0, y: 0, w: 0, h: 0 }; // force recompute
      currentFrame = -1; // force redraw at new size
    }

    function drawFrame(index: number) {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      if (drawRect.w === 0) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        if (canvasRatio > imgRatio) {
          drawRect.w = canvas.width;
          drawRect.h = canvas.width / imgRatio;
          drawRect.x = 0;
          drawRect.y = (canvas.height - drawRect.h) / 2;
        } else {
          drawRect.h = canvas.height;
          drawRect.w = canvas.height * imgRatio;
          drawRect.y = 0;
          drawRect.x = (canvas.width - drawRect.w) / 2;
        }
      }

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawRect.x, drawRect.y, drawRect.w, drawRect.h);
    }

    function getProgress() {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollableDistance));
    }

    function renderCurrentFrame() {
      ticking = false;
      const progress = getProgress();
      const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawFrame(frameIndex);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(renderCurrentFrame);
    }

    function onResize() {
      resizeCanvas();
      renderCurrentFrame();
    }

    // Preload every frame. Frame 0 is awaited first so something is on
    // screen immediately; the rest load after, in order.
    async function preload() {
      const first = new Image();
      first.src = frameUrl(0);
      images[0] = first;
      try {
        await first.decode();
      } catch {
        await new Promise<void>((resolve) => {
          first.onload = () => resolve();
          first.onerror = () => resolve();
        });
      }
      resizeCanvas();
      drawFrame(0);
      currentFrame = 0;
      setIsReady(true);

      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.onload = () => {
          if (currentFrame === i) {
            drawFrame(i);
          }
        };
        img.src = frameUrl(i);
        images[i] = img;
      }
    }

    resizeCanvas();
    preload();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
          style={{ width: "100%", height: "100%" }}
        />
        {children && children(smoothProgress)}
      </div>
    </div>
  );
}
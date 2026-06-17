"use client";

import { ReactNode, useEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const ScrollVelocityContext = createContext<number>(0);

export function useScrollVelocity() {
  return useContext(ScrollVelocityContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const onScroll = ({ velocity: v }: { velocity: number }) => {
      setVelocity(v);
    };

    lenis.on("scroll", onScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollVelocityContext.Provider value={velocity}>
      {children}
    </ScrollVelocityContext.Provider>
  );
}

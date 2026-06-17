"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check session storage to see if we've already loaded in this session
    const hasLoaded = sessionStorage.getItem("ghs-loaded");
    if (!hasLoaded && !prefersReducedMotion) {
      setShouldPlay(true);
      
      // Keep loader visible for 1.6s (0.8s stagger drawing + 0.8s dwell)
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("ghs-loaded", "true");
      }, 1800);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [prefersReducedMotion]);

  if (!shouldPlay || !loading) return null;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.25, duration: 0.8, ease: "easeInOut" as const },
        opacity: { delay: i * 0.25, duration: 0.2 },
      },
    }),
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#3D1266]"
          aria-live="polite"
          aria-label="Loading Geetanjali High School Website"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated GHS Monogram */}
            <svg
              viewBox="0 0 240 100"
              className="w-48 h-20 md:w-64 md:h-28 text-brand-accent stroke-current"
              fill="none"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* G */}
              <motion.path
                d="M 75,25 A 25,25 0 1 0 75,75 L 75,50 L 55,50"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              />
              {/* H */}
              <motion.path
                d="M 105,25 L 105,75 M 105,50 L 135,50 M 135,25 L 135,75"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              />
              {/* S */}
              <motion.path
                d="M 185,30 C 185,20 160,20 160,37.5 C 160,55 185,45 185,62.5 C 185,80 160,80 160,70"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                custom={2}
              />
            </svg>

            {/* Subtle brand caption */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 font-display font-medium text-xs tracking-[0.2em] text-white/50 uppercase"
            >
              Build Your Own Identity
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

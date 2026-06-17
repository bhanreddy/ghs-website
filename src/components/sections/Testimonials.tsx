"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import testimonialData from "@/content/testimonials.json";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = testimonialData.testimonials;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  // Reset interval on manual interaction
  const handleManualNav = useCallback(
    (fn: () => void) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      fn();
      intervalRef.current = setInterval(next, 6000);
    },
    [next]
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <section ref={sectionRef} className="section-padding bg-brand-surface relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-brand-primary/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Voices"
          title={<>What People <span className="text-gradient">Say</span></>}
          subtitle="Hear from the parents, students, and alumni who are part of the Geetanjali family."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {/* Testimonial card */}
          <div className="relative bg-brand-bg rounded-3xl border border-brand-border p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center">
            <Quote size={32} className="text-brand-accent/20 mb-6" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-brand-text font-body text-lg md:text-xl leading-relaxed italic mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <div className="flex flex-col items-center">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-3">
                    <User size={20} className="text-brand-primary/40" />
                  </div>
                  <span className="font-display font-semibold text-brand-text-strong text-sm">
                    {testimonials[current].name}
                  </span>
                  <span className="text-brand-secondary text-xs font-body">
                    {testimonials[current].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handleManualNav(prev)}
              className="w-10 h-10 rounded-full border border-brand-border hover:border-brand-primary hover:bg-brand-primary/10 flex items-center justify-center text-brand-text-muted hover:text-brand-primary transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualNav(() => goTo(i))}
                  className="relative p-1"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <span
                    className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                      current === i
                        ? "bg-brand-primary scale-125"
                        : "bg-brand-border hover:bg-brand-text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleManualNav(next)}
              className="w-10 h-10 rounded-full border border-brand-border hover:border-brand-primary hover:bg-brand-primary/10 flex items-center justify-center text-brand-text-muted hover:text-brand-primary transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

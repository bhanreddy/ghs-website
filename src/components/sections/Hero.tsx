"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const taglineLines = [
    { words: ["Build", "Your"], startIdx: 0 },
    { words: ["Own", "Identity"], startIdx: 2 },
  ];
  const mottoWords = ["Thought", "•", "Action", "•", "Progress"];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* WebGL-free animated mesh gradient background */}
      <div className="absolute inset-0 z-0 hero-bg" />

      {/* Content */}
      <motion.div style={{ opacity: opacityFade }} className="relative z-10 section-container text-center">
        <motion.div style={{ y }}>
          {/* VVM Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="font-display font-bold text-brand-accent text-sm tracking-wider">VVM</span>
            <span className="text-white/60 text-sm font-body">Group Institution</span>
          </motion.div>

          {/* Tagline — word-by-word reveal */}
          <h1 className="mb-6 hero-headline">
            <span className="sr-only">Build Your Own Identity</span>
            <span aria-hidden="true" className="block text-center">
              {taglineLines.map((line, lineIdx) => (
                <span key={lineIdx} className="block overflow-hidden py-1">
                  {line.words.map((word, wordIdx) => {
                    const i = line.startIdx + wordIdx;
                    return (
                      <span key={wordIdx} className="overflow-hidden inline-block mx-2 md:mx-3">
                        <motion.span
                          initial={{ y: "110%", opacity: 0, rotateX: -40 }}
                          animate={
                            isInView
                              ? {
                                  y: "0%",
                                  opacity: 1,
                                  rotateX: 0,
                                  transition: {
                                    duration: 0.8,
                                    delay: 0.5 + i * 0.12,
                                    ease: [0.16, 1, 0.3, 1],
                                  },
                                }
                              : {}
                          }
                          className="inline-block text-white font-display font-extrabold"
                          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>

          {/* Motto — staggered entrance */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10">
            {mottoWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 1.2 + i * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                    : {}
                }
                className={`text-xl md:text-2xl font-body ${
                  word === "•" ? "text-brand-accent" : "text-white/80"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-white/60 font-body text-base md:text-lg max-w-xl mx-auto mb-12"
          >
            Nurturing young minds to build their own identity through quality education in Maddur, Telangana.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton href="#contact" variant="primary">
              Admissions Open
            </MagneticButton>
            <MagneticButton href="#campus" variant="ghost">
              <span className="text-white/90">Explore Campus</span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[11px] font-body uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={20} className="animate-scroll-cue" />
        </a>
      </motion.div>

      {/* Bottom gradient fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none" />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </section>
  );
}

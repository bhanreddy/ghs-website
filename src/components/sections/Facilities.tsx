"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FlaskConical,
  Library,
  Monitor,
  Trophy,
  Bus,
  Presentation,
  TreePine,
  Palette,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import facilitiesData from "@/content/facilities.json";
import { useScrollVelocity } from "@/components/providers/SmoothScrollProvider";

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  Library,
  Monitor,
  Trophy,
  Bus,
  Presentation,
  TreePine,
  Palette,
};

export default function Facilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const velocity = useScrollVelocity();
  const scale = 1 + Math.abs(velocity) * 0.002;

  // Bento grid layout — CSS grid areas for asymmetric layout
  const gridAreaMap: Record<string, string> = {
    "science-lab": "span 2 / span 2",
    library: "span 1 / span 1",
    "computer-lab": "span 1 / span 1",
    sports: "span 1 / span 2",
    transport: "span 1 / span 1",
    classrooms: "span 1 / span 1",
    playground: "span 1 / span 2",
    "activity-room": "span 1 / span 1",
  };

  return (
    <section ref={sectionRef} id="campus" className="section-padding bg-brand-surface relative">
      <NoiseOverlay />
      <div className="section-container">
        <SectionHeading
          label="Campus Life"
          title={<>Our <span className="text-gradient-gold">Facilities</span></>}
          subtitle="A campus designed to inspire learning — equipped with modern facilities for holistic development."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4">
          {facilitiesData.facilities.map((facility, i) => {
            const Icon = iconMap[facility.icon] || FlaskConical;
            const span = gridAreaMap[facility.id] || "span 1 / span 1";
            const [rowSpan, colSpan] = span.split(" / ").map((s) => s.trim());

            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          delay: 0.1 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                    : {}
                }
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  gridRow: rowSpan,
                  gridColumn: colSpan,
                }}
              >
                {/* Background placeholder wrapper for scroll velocity scale */}
                <motion.div
                  animate={{ scaleY: scale }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 z-0 origin-center"
                >
                  {/* Background placeholder with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-surface-elevated to-brand-accent/10 transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-110" />

                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                </motion.div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/90 via-brand-primary-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Icon — always visible */}
                  <div className="mb-auto">
                    <div className="w-11 h-11 rounded-xl bg-brand-surface/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                      <Icon size={20} className="text-brand-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Title + Description — slide up on hover */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-smooth)]">
                    <h3 className="font-display font-bold text-brand-text-strong group-hover:text-white text-lg mb-1 transition-colors duration-500">
                      {facility.title}
                    </h3>
                    <p className="text-brand-text-muted group-hover:text-white/80 text-sm font-body opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {facility.description}
                    </p>
                  </div>
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl border border-brand-border group-hover:border-brand-primary/30 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

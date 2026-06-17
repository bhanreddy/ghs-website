"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, FileText, BookCheck, UserCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const steps = [
  {
    icon: ClipboardList,
    title: "Inquiry",
    description: "Reach out to us via phone, email, or visit the campus to learn more about admissions.",
  },
  {
    icon: FileText,
    title: "Application",
    description: "Submit the application form with required documents for the desired class.",
  },
  {
    icon: BookCheck,
    title: "Assessment",
    description: "A brief interaction/assessment to understand the student's learning level.",
  },
  {
    icon: UserCheck,
    title: "Enrollment",
    description: "Complete the enrollment process and welcome your child to the Geetanjali family.",
  },
];

export default function Admissions() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding bg-brand-bg relative">
      <NoiseOverlay />
      <div className="section-container">
        <SectionHeading
          label="Join Us"
          title={<>Admission <span className="text-gradient-gold">Process</span></>}
          subtitle="A simple, transparent admission process designed to welcome every aspiring student."
        />

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-brand-border md:-translate-x-px" />

          {/* Animated progress line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent origin-top md:-translate-x-px"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.6,
                          delay: 0.4 + i * 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                    : {}
                }
                className={`relative flex items-center gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 hover:border-brand-primary/30 transition-colors duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center md:hidden">
                        <Icon size={18} className="text-brand-primary" />
                      </div>
                      <h3 className="font-display font-bold text-brand-text-strong text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-brand-text-muted text-sm font-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-brand-surface border-2 border-brand-primary flex items-center justify-center z-10">
                  <Icon size={18} className="text-brand-primary" />
                </div>

                {/* Empty space for other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import leadershipData from "@/content/leadership.json";
import { cn } from "@/lib/utils";

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-brand-bg relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-accent/5 blur-[80px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Our Leadership"
          title="Message from Leadership"
          subtitle="The visionaries behind Geetanjali High School — committed to nurturing every student's unique identity."
        />

        {/* Leadership Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-stretch">
          {leadershipData.leaders.map((leader, i) => {
            let orderClass = "";
            let animVariants: { initial?: any; animate?: any } = {};

            if (leader.id === "principal") {
              orderClass = "col-span-2 md:col-span-1 order-1 md:order-2";
              animVariants = {
                initial: { y: 60, opacity: 0 },
                animate: { y: 0, opacity: 1 }
              };
            } else if (leader.id === "vice-principal") {
              orderClass = "col-span-1 order-2 md:order-1";
              animVariants = {
                initial: { x: -60, opacity: 0 },
                animate: { x: 0, opacity: 1 }
              };
            } else {
              // correspondent
              orderClass = "col-span-1 order-3 md:order-3";
              animVariants = {
                initial: { x: 60, opacity: 0 },
                animate: { x: 0, opacity: 1 }
              };
            }

            return (
              <motion.div
                key={leader.id}
                initial={animVariants.initial}
                animate={isInView ? animVariants.animate : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn("h-full", orderClass)}
              >
                <div className={cn(
                  "h-full transition-all duration-500",
                  leader.id === "principal" ? "md:scale-105 md:-translate-y-2 md:z-10 shadow-lg" : "md:scale-95"
                )}>
                  <TiltCard
                    className="bg-brand-surface rounded-2xl border border-brand-border p-8 h-full group hover:border-brand-primary/30 transition-colors duration-500"
                    tiltIntensity={8}
                    data-cursor="drag"
                  >
                    {/* Avatar placeholder */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                          <span className="text-3xl font-display font-bold text-brand-primary">
                            {leader.initial}
                          </span>
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-brand-primary/20 group-hover:border-brand-primary/40 group-hover:rotate-180 transition-all duration-1000" />
                      </div>

                      <h3 className="font-display font-bold text-brand-text-strong text-xl mb-1">
                        {leader.name}
                      </h3>
                      <span className="text-brand-secondary font-body font-medium text-sm mb-5">
                        {leader.title}
                      </span>

                      {/* Quote */}
                      <div className="relative">
                        <Quote
                          size={20}
                          className="text-brand-accent/40 mb-2 mx-auto"
                        />
                        <p className="text-brand-text-muted text-sm font-body leading-relaxed italic">
                          {leader.quote}
                        </p>

                        {/* Hover message reveal */}
                        <div className="mt-4 pt-3 border-t border-brand-border/40 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                          <span className="font-mono text-xs text-brand-secondary/90 font-medium block">
                            {leader.id === "principal" && "“Shaping minds, nurturing future leaders.”"}
                            {leader.id === "correspondent" && "“Excellence in education is our promise.”"}
                            {leader.id === "vice-principal" && "“Building character, driving progress.”"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

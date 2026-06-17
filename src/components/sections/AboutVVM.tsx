"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VVMBadge from "@/components/ui/VVMBadge";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import leadershipData from "@/content/leadership.json";

export default function AboutVVM() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-surface">
      <NoiseOverlay />
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-brand-secondary section-eyebrow mb-3">
                Who We Are
              </span>
              <h2 className="text-brand-text-strong mb-6">
                A <span className="text-gradient">VVM</span> Group Institution
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-brand-text-muted font-body leading-relaxed mb-5">
                {leadershipData.vvmDescription}
              </p>
              <p className="text-brand-text-muted font-body leading-relaxed">
                <strong className="text-brand-text-strong">VVM</strong> stands for the initials of the three founding
                leaders — <strong className="text-brand-primary">V</strong>ijay Kumar (Principal),{" "}
                <strong className="text-brand-primary">V</strong>enkataih (Correspondent), and{" "}
                <strong className="text-brand-primary">M</strong>ahesh (Vice Principal) — who together envisioned a
                school that empowers every child to build their own identity.
              </p>
            </motion.div>
          </div>

          {/* Right: VVM Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Large VVM Display */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 flex items-center justify-center border border-brand-border">
                {/* Rotating outer rings */}
                <div className="absolute inset-[-8px] rounded-full border border-brand-primary/15 animate-spin-slow" />
                <div
                  className="absolute inset-[-20px] rounded-full border border-brand-accent/10"
                  style={{ animation: "spin-slow 30s linear infinite reverse" }}
                />

                {/* Center content */}
                <div className="text-center">
                  <VVMBadge size="lg" showLabel={false} className="mx-auto mb-2" />
                  <h3 className="font-display font-extrabold text-5xl md:text-6xl text-gradient mb-2">
                    VVM
                  </h3>
                  <p className="text-brand-text-muted font-body text-xs uppercase tracking-[0.15em]">
                    Group Institution
                  </p>
                </div>

                {/* Leader initials orbiting */}
                {[
                  { label: "V", name: "Vijay Kumar", angle: -30, color: "brand-primary" },
                  { label: "V", name: "Venkataih", angle: 90, color: "brand-secondary" },
                  { label: "M", name: "Mahesh", angle: 210, color: "brand-accent" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                    className="absolute w-12 h-12 rounded-full bg-brand-surface border border-brand-border shadow-lg flex items-center justify-center"
                    style={{
                      top: `${50 + 45 * Math.sin((item.angle * Math.PI) / 180)}%`,
                      left: `${50 + 45 * Math.cos((item.angle * Math.PI) / 180)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className={`font-display font-bold text-${item.color} text-sm`}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

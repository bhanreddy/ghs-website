"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, GraduationCap, TrendingUp } from "lucide-react";
import statsData from "@/content/stats.json";

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  Users,
  GraduationCap,
  TrendingUp,
};

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
  shouldAnimate,
}: {
  value: string;
  suffix: string;
  duration?: number;
  shouldAnimate: boolean;
}) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!shouldAnimate || !isNumeric) return;

    let start = 0;
    const end = numericValue;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easedProgress * end);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [shouldAnimate, numericValue, isNumeric, duration]);

  if (!isNumeric) {
    return <span><span className="counter-number">{value}</span>{suffix}</span>;
  }

  return <span><span className="counter-number">{count}</span>{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="achievements" className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="bg-ribbon py-20 md:py-28 relative overflow-hidden">
        {/* Section number watermark */}
        <span
          aria-hidden="true"
          className="absolute top-6 right-8 font-display font-bold text-[8rem] leading-none text-white/[0.04] select-none pointer-events-none"
        >
          07
        </span>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-brand-accent/10 blur-[80px]" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-brand-accent section-eyebrow mb-3">
              By the Numbers
            </span>
            <h2 className="text-white">
              Our Growing <span className="text-brand-accent">Legacy</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.stats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Calendar;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: 0.2 + i * 0.12,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                      : {}
                  }
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-brand-accent" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display font-extrabold text-white mb-2">
                    <AnimatedCounter
                      value={stat.displayValue}
                      suffix={stat.suffix}
                      shouldAnimate={isInView}
                    />
                  </div>
                  <p className="text-white/60 font-body text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-white/30 text-xs font-body text-center mt-10"
          >
            * Statistics are placeholder values — actual data to be provided
          </motion.p>
        </div>
      </div>
    </section>
  );
}

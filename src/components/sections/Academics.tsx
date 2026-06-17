"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BookOpen, FlaskConical, GraduationCap, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import academicsData from "@/content/academics.json";
import siteConfig from "@/content/siteConfig.json";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  FlaskConical,
  GraduationCap,
};

export default function Academics() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeBand = academicsData.gradeBands[activeTab];

  return (
    <section ref={sectionRef} id="academics" className="section-padding bg-brand-bg relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/3 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Academics"
          title={<>Our <span className="text-gradient">Curriculum</span></>}
          subtitle="A structured pathway from primary to secondary education, designed to build strong foundations and competitive readiness."
        />

        {/* Tab System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Tab buttons */}
          <div className="relative inline-flex bg-brand-surface rounded-2xl p-1.5 border border-brand-border mb-12">
            {academicsData.gradeBands.map((band, i) => {
              const Icon = iconMap[band.icon] || BookOpen;
              return (
                <button
                  key={band.id}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-body font-medium text-sm transition-colors duration-300 z-10 ${
                    activeTab === i
                      ? "text-white"
                      : "text-brand-text-muted hover:text-brand-text"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{band.name}</span>
                  <span className="sm:hidden">{band.grades}</span>

                  {/* Sliding background pill */}
                  {activeTab === i && (
                    <motion.div
                      layoutId="academic-tab-bg"
                      className="absolute inset-0 rounded-xl bg-brand-primary"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBand.id}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl"
            >
              <div className="bg-brand-surface rounded-3xl border border-brand-border p-8 md:p-12">
                {/* Grade band header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeBand.color}15` }}
                  >
                    {(() => {
                      const Icon = iconMap[activeBand.icon] || BookOpen;
                      return <Icon size={24} style={{ color: activeBand.color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-text-strong text-2xl">
                      {activeBand.name}
                    </h3>
                    <span className="text-brand-text-muted font-body text-sm">
                      {activeBand.grades}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-text-muted font-body leading-relaxed mb-8">
                  {activeBand.description}
                </p>

                {/* Subjects */}
                <div>
                  <h4 className="font-display font-semibold text-brand-text text-sm uppercase tracking-wider mb-4">
                    Subjects Offered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeBand.subjects.map((subject, i) => (
                      <motion.div
                        key={subject}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-brand-text font-body text-sm"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${activeBand.color}15` }}
                        >
                          <Check size={12} style={{ color: activeBand.color }} />
                        </div>
                        {subject}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CBSE Info strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-body text-brand-text-muted"
          >
            <span>
              Affiliation: <strong className="text-brand-text">{siteConfig.cbseAffiliation}</strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-border" />
            <span>
              School Code: <strong className="text-brand-text">{siteConfig.schoolCode}</strong>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

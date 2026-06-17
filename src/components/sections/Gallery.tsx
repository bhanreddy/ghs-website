"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import galleryData from "@/content/gallery.json";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === "All"
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "prev") {
        setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
      } else {
        setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1);
      }
    },
    [lightboxIndex, filteredImages.length]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    },
    [closeLightbox, navigateLightbox]
  );

  // Masonry-style heights for visual interest
  const heightClasses = ["h-52", "h-64", "h-72", "h-56", "h-60", "h-48"];

  return (
    <section ref={sectionRef} id="gallery" className="section-padding bg-brand-bg relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="School Album"
          title={<>Life at <span className="text-gradient">Geetanjali</span></>}
          subtitle="Glimpses of the vibrant school life — events, celebrations, sports, and everyday moments of learning."
        />

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {galleryData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className="relative px-5 py-2 rounded-full font-body font-medium text-sm transition-colors duration-300"
            >
              <span
                className={`relative z-10 ${
                  activeFilter === category ? "text-white" : "text-brand-text-muted hover:text-brand-text"
                }`}
              >
                {category}
              </span>
              {activeFilter === category && (
                <motion.div
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-brand-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                layoutId={`gallery-${image.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, delay: i * 0.05 },
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                onClick={() => openLightbox(i)}
                className={`break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden relative ${
                  heightClasses[i % heightClasses.length]
                } bg-brand-surface-elevated border border-brand-border hover:border-brand-primary/30 transition-colors duration-300`}
              >
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <ImageIcon size={20} className="text-brand-primary/50" />
                  </div>
                  <span className="text-brand-text-muted/60 text-xs font-body text-center">
                    {image.alt}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-surface/80 backdrop-blur-sm text-xs font-body font-medium text-brand-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-50"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-50"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl max-h-[80vh] mx-4 rounded-2xl overflow-hidden bg-brand-surface-elevated flex flex-col items-center justify-center p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                  <ImageIcon size={32} className="text-brand-primary/40" />
                </div>
                <p className="text-brand-text-muted text-center text-sm font-body mb-2">
                  {filteredImages[lightboxIndex]?.alt}
                </p>
                <span className="text-brand-text-muted/50 text-xs font-body">
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

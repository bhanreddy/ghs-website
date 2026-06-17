"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import galleryData from "@/content/gallery.json";

const unsplashFallbacks: Record<string, string[]> = {
  "Annual Day": [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80"
  ],
  "Sports": [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80"
  ],
  "Events": [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
  ],
  "Classrooms": [
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80"
  ],
  "Campus": [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"
  ]
};

const getImageUrl = (image: { id: string; src: string; category: string }, index: number) => {
  if (image.src && !image.src.startsWith("[PLACEHOLDER")) return image.src;
  const list = unsplashFallbacks[image.category] || unsplashFallbacks["Campus"];
  return list[index % list.length];
};

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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

  // Auto focus overlay for keyboard listeners
  useEffect(() => {
    if (lightboxIndex !== null && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [lightboxIndex]);

  // Masonry-style heights for visual interest
  const heightClasses = ["h-52", "h-64", "h-72", "h-56", "h-60", "h-48"];
  const brandBlurURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

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
              data-cursor="hover"
            >
              <span
                className={`relative z-10 ${
                  activeFilter === category ? "text-white" : "text-brand-text-muted hover:text-brand-text"
                }`}
              >
                {category}
              </span>
              {activeFilter === category && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 rounded-full bg-brand-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                data-cursor="gallery"
              >
                {/* Image Component with brand colored blur placeholder */}
                <Image
                  src={getImageUrl(image, i)}
                  alt={image.alt}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={brandBlurURL}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-primary-dark/0 group-hover:bg-brand-primary-dark/30 transition-colors duration-300 z-10 flex flex-col justify-end p-4">
                  {/* Category badge */}
                  <span className="self-start px-3 py-1 rounded-full bg-brand-surface/85 backdrop-blur-sm text-xs font-body font-medium text-brand-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox with shared element transition */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center outline-none"
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
              data-cursor="hover"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-50 animate-float"
              aria-label="Previous image"
              data-cursor="hover"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-50 animate-float"
              aria-label="Next image"
              data-cursor="hover"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image content mapped in layoutId */}
            <motion.div
              layoutId={`gallery-${filteredImages[lightboxIndex]?.id}`}
              className="max-w-4xl max-h-[85vh] w-full mx-4 rounded-2xl overflow-hidden bg-brand-surface-elevated flex flex-col p-4 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[55vh] md:h-[65vh] rounded-xl overflow-hidden bg-brand-bg/50">
                <Image
                  src={getImageUrl(filteredImages[lightboxIndex], lightboxIndex)}
                  alt={filteredImages[lightboxIndex]?.alt}
                  fill
                  sizes="(max-w-1280px) 90vw, 1200px"
                  placeholder="blur"
                  blurDataURL={brandBlurURL}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="pt-4 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-brand-text-strong font-display font-medium text-base">
                  {filteredImages[lightboxIndex]?.alt.replace(/\[PLACEHOLDER:\s*|\]/g, "")}
                </p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-brand-surface text-xs font-mono font-medium text-brand-secondary">
                    {filteredImages[lightboxIndex]?.category}
                  </span>
                  <span className="text-brand-text-muted text-xs font-mono">
                    {lightboxIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";
import VVMBadge from "@/components/ui/VVMBadge";
import siteConfig from "@/content/siteConfig.json";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-brand-border/50 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo + Wordmark + VVM Badge */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Logo placeholder — Purple circle with GHS */}
            <div className="relative w-10 h-10 rounded-full bg-ribbon flex items-center justify-center shrink-0">
              <span className="text-white font-display font-bold text-sm">G</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-bold text-brand-text-strong text-base tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                Geetanjali
              </span>
              <span className="text-brand-text-muted text-[11px] font-body">
                High School, Maddur
              </span>
            </div>
            <VVMBadge size="sm" showLabel={false} className="hidden sm:flex" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-body font-medium text-brand-text hover:text-brand-primary transition-colors duration-300 group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-primary group-hover:w-3/4 transition-all duration-300 ease-[var(--ease-smooth)]" />
              </a>
            ))}
          </nav>

          {/* Right side: Theme toggle + Mobile trigger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary hover:bg-brand-surface-elevated transition-all duration-300"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Admissions CTA (desktop only) */}
            <a
              href="#contact"
              className="hidden lg:inline-flex px-5 py-2.5 rounded-full bg-brand-primary text-white font-body font-medium text-sm hover:bg-brand-primary-dark transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Admissions Open
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary hover:bg-brand-surface-elevated transition-all duration-300"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ribbon flex flex-col items-center justify-center"
          >
            {/* Decorative blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-brand-secondary/10 blur-3xl" />
              <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-accent/10 blur-3xl" />
            </div>

            <nav className="relative z-10 flex flex-col items-center gap-2">
              {siteConfig.navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.5,
                      delay: 0.1 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.2, delay: i * 0.03 },
                  }}
                  className="text-white/90 hover:text-white text-3xl font-display font-bold tracking-tight py-3 px-6 rounded-2xl hover:bg-white/10 transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* CTA in mobile menu */}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.5,
                    delay: 0.1 + siteConfig.navLinks.length * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{ opacity: 0 }}
                className="mt-6 px-8 py-3 rounded-full bg-brand-secondary text-white font-display font-semibold text-lg hover:bg-brand-accent transition-colors duration-300"
              >
                Admissions Open
              </motion.a>
            </nav>

            {/* VVM Badge at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10"
            >
              <div className="text-white/50 text-sm font-body text-center">
                <span className="font-display font-bold text-brand-accent">VVM</span> Group Institution
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

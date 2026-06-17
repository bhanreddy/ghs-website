import { Variants } from "framer-motion";

/**
 * Shared animation variants for consistent motion across the site.
 * Each section uses a distinct entrance — these are the building blocks.
 */

// --- Fade Up (standard, with configurable delay) ---
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Fade In (no translation) ---
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  }),
};

// --- Scale Up from center ---
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Slide in from left ---
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Slide in from right ---
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Stagger children container ---
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// --- Stagger children container (faster) ---
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// --- Character reveal (for kinetic typography) ---
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Word reveal (clip-path mask) ---
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Curtain reveal (for about section) ---
export const curtainReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// --- Blur in ---
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

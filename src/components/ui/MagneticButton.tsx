"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold text-base px-8 py-4 transition-colors duration-300 active:scale-95";

  const variantClasses = {
    primary:
      "bg-brand-secondary text-white hover:bg-brand-accent shadow-lg shadow-brand-secondary/25",
    ghost:
      "border-2 border-brand-text-strong/20 text-brand-text-strong hover:border-brand-primary hover:text-brand-primary",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {/* Glow effect on primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 rounded-full bg-brand-secondary/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <span className="relative z-10">{children}</span>
      </Component>
    </motion.div>
  );
}

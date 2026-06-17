"use client";

import { useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tiltIntensity?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className,
  tiltIntensity = 10,
  glare = true,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Direct DOM manipulation
    card.style.transition = "none";
    card.style.transform = `
      perspective(600px)
      rotateY(${x * tiltIntensity}deg)
      rotateX(${-y * tiltIntensity}deg)
      scale(1.02)
    `;

    if (glare) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePos({ x: glareX, y: glareY });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    // Reset with 300ms ease transition
    card.style.transition = "transform 300ms ease";
    card.style.transform = `
      perspective(600px)
      rotateY(0deg)
      rotateX(0deg)
      scale(1)
    `;
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative overflow-hidden transition-all duration-300", className)}
      {...props}
    >
      {children}

      {/* Glare effect */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

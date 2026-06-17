"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<string | null>(null);

  // Position and state references to prevent re-renders on cursor changes
  const cursorCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const isClickedRef = useRef(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports touch/hover
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        // Apply immediate visibility via opacity class on container or ref
        updateVisibility(true);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      updateVisibility(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      updateVisibility(true);
    };

    const onMouseDown = () => {
      isClickedRef.current = true;
    };

    const onMouseUp = () => {
      isClickedRef.current = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor], a, button") as HTMLElement | null;
      if (cursorTarget) {
        const type =
          cursorTarget.getAttribute("data-cursor") ||
          (cursorTarget.tagName === "A" || cursorTarget.tagName === "BUTTON" ? "hover" : null);
        
        if (type) {
          setHoverType(type);
          return;
        }
      }
      setHoverType(null);
    };

    const updateVisibility = (visible: boolean) => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        if (visible) {
          dot.style.opacity = "1";
          ring.style.opacity = hoverType === "hover" ? "1" : "0.6";
        } else {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // Animation Loop for LERPing
    const animateCursor = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring && isVisibleRef.current) {
        const { x, y } = cursorCoords.current;
        let rx = ringCoords.current.x;
        let ry = ringCoords.current.y;

        // Initialize ring position if it was 0
        if (rx === 0 && ry === 0) {
          rx = x;
          ry = y;
        }

        // LERP for ring
        rx += (x - rx) * 0.12;
        ry += (y - ry) * 0.12;

        ringCoords.current = { x: rx, y: ry };

        // Apply transformations centered on coordinates
        const clickScale = isClickedRef.current ? 0.5 : 1;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) scale(${clickScale})`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate3d(-50%, -50%, 0)`;
      }

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [hoverType]); // hoverType is a dependency so updateVisibility checks it

  // Ring dimension configuration based on hover state
  let ringStyleClasses = "w-8 h-8 border-2 border-brand-primary opacity-60";
  let dotStyleClasses = "w-2 h-2 bg-brand-accent opacity-100";

  if (hoverType === "hover") {
    ringStyleClasses = "w-14 h-14 border-2 border-brand-accent opacity-100";
    dotStyleClasses = "w-1 h-1 bg-brand-accent opacity-100";
  } else if (hoverType === "gallery") {
    ringStyleClasses = "w-[72px] h-[72px] border-2 border-brand-primary opacity-100 bg-brand-primary/10";
    dotStyleClasses = "w-0 h-0 opacity-0";
  } else if (hoverType === "drag") {
    ringStyleClasses = "w-16 h-16 border-2 border-brand-primary opacity-100 bg-brand-primary/5";
    dotStyleClasses = "w-0 h-0 opacity-0";
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full pointer-events-none transition-[width,height,border-color,background-color,opacity] duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 ${ringStyleClasses}`}
        style={{ willChange: "transform" }}
      >
        {hoverType === "gallery" && (
          <span className="font-mono text-[9px] font-bold text-brand-primary">
            VIEW
          </span>
        )}
        {hoverType === "drag" && (
          <span className="font-sans text-lg font-bold text-brand-primary">
            →
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full pointer-events-none transition-[width,height,opacity] duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 ${dotStyleClasses}`}
        style={{
          transition: "width 200ms, height 200ms, opacity 200ms, transform 80ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

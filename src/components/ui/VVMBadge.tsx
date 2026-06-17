"use client";

import { cn } from "@/lib/utils";

interface VVMBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

export default function VVMBadge({ size = "md", className, showLabel = true }: VVMBadgeProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-9 h-9 text-xs",
    lg: "w-14 h-14 text-base",
  };

  const labelSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      {/* Rotating seal/crest */}
      <div className="relative">
        {/* Outer ring — subtle rotation */}
        <div
          className={cn(
            "rounded-full border-2 border-brand-secondary flex items-center justify-center font-display font-bold text-brand-secondary relative",
            sizeClasses[size]
          )}
        >
          {/* Decorative ring */}
          <div className="absolute inset-[-3px] rounded-full border border-brand-accent/40 animate-spin-slow" />
          <span className="relative z-10">V</span>
        </div>
      </div>

      {showLabel && (
        <div className={cn("flex flex-col leading-none", labelSizeClasses[size])}>
          <span className="font-display font-bold text-brand-secondary tracking-wider">VVM</span>
          <span className="text-brand-text-muted font-body" style={{ fontSize: "0.6em" }}>
            Group
          </span>
        </div>
      )}
    </div>
  );
}

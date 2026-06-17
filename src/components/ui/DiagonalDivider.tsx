"use client";

interface DiagonalDividerProps {
  fromColor: string;
  toColor: string;
  direction?: "left" | "right";
  className?: string;
}

export default function DiagonalDivider({
  fromColor,
  toColor,
  direction = "right",
  className,
}: DiagonalDividerProps) {
  const points =
    direction === "right"
      ? "0,0 100,0 100,100 0,60"
      : "0,0 100,0 100,60 0,100";

  return (
    <div
      className={`relative h-16 -my-px overflow-hidden ${className || ""}`}
      style={{ backgroundColor: toColor }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polygon points={points} fill={fromColor} />
      </svg>
    </div>
  );
}

import React from "react";

interface CursorPixelProps {
  className?: string;
  svgClassName?: string;
}

export default function CursorPixel({
  className = "w-10 h-10 md:w-12 md:h-12 pointer-events-none",
  svgClassName = "",
}: CursorPixelProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName}
      >
        <path
          d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}

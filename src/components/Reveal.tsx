import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

const classes: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => el.classList.add("is-revealed"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${classes[direction]} ${className}`}>
      {children}
    </div>
  );
}

export function Icon({ name, className = "", filled = false }: { name: string; className?: string; filled?: boolean }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}

/**
 * Rounded star SVG that matches the reference image.
 * filled=true → solid amber star
 * filled=false → outline-only amber star (same rounded shape)
 */
export function StarIcon({
  filled = false,
  className = "",
  size = 32,
}: {
  filled?: boolean;
  className?: string;
  size?: number;
}) {
  // 5-point star path with slightly rounded feel via a standard polygon-style path
  // viewBox 0 0 24 24, points computed for a classic rounded star
  const COLOR = "#F5C518"; // amber-gold matching the reference
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.25l2.93 5.94 6.55.95-4.74 4.62 1.12 6.52L12 17.27l-5.86 3.01 1.12-6.52L2.52 9.14l6.55-.95z"
        fill={filled ? COLOR : "none"}
        stroke={COLOR}
        strokeWidth={filled ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

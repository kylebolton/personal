"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Bauhaus construction plate: a square, its inscribed circle, the centre
 * axes and one diagonal. The single red point sits where the diagonal meets
 * the circle, so every mark is derived from the one before it.
 */
export default function ConstructionFigure({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const draw = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.4, delay: 0.3 + i * 0.18, ease },
        };

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <motion.rect x="0.5" y="0.5" width="399" height="399" {...draw(0)} />
      <motion.circle cx="200" cy="200" r="199.500" {...draw(1)} />
      <motion.line x1="200" y1="0" x2="200" y2="400" strokeOpacity="0.35" {...draw(2)} />
      <motion.line x1="0" y1="200" x2="400" y2="200" strokeOpacity="0.35" {...draw(2)} />
      <motion.line x1="0" y1="400" x2="400" y2="0" {...draw(3)} />
      <motion.circle
        cx="341"
        cy="59"
        r="7"
        fill="#e10600"
        stroke="none"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.9, ease }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

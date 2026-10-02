"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Keep the server's hidden initial state so hydration matches; under reduced motion snap straight to visible.
  const motionProps = reduce
    ? { animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.7, delay, ease },
      };
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 8 }} {...motionProps}>
      {children}
    </motion.div>
  );
}

/** Hairline that draws in from the left. */
export function Rule({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-hairline ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      {...(reduce
        ? { animate: { scaleX: 1 }, transition: { duration: 0 } }
        : {
            whileInView: { scaleX: 1 },
            viewport: { once: true },
            transition: { duration: 1.1, ease },
          })}
    />
  );
}

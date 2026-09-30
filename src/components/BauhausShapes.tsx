"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

const spring = { type: "spring", stiffness: 120, damping: 14 } as const;

export default function BauhausShapes() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const circleX = useTransform(sx, v => v * 24);
  const circleY = useTransform(sy, v => v * 24);
  const squareX = useTransform(sx, v => v * -16);
  const squareY = useTransform(sy, v => v * -16);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { ...spring, delay },
        };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-64 w-full max-w-sm md:h-96"
    >
      <motion.div
        {...enter(0.2)}
        style={{ x: circleX, y: circleY }}
        className="absolute left-0 top-0 size-40 rounded-full bg-red md:size-56"
      />
      <motion.div
        {...enter(0.35)}
        style={{ x: squareX, y: squareY }}
        className="absolute bottom-0 right-0 size-32 border-2 border-foreground bg-blue md:size-44"
      />
      <motion.div
        {...enter(0.5)}
        animate={reduce ? undefined : { rotate: 360, scale: 1, opacity: 1 }}
        transition={
          reduce
            ? undefined
            : {
                rotate: { duration: 40, ease: "linear", repeat: Infinity },
                scale: { ...spring, delay: 0.5 },
                opacity: { delay: 0.5 },
              }
        }
        className="absolute bottom-6 left-24 size-20 bg-yellow md:left-36 md:size-28"
        style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
      />
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-foreground" />
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const INK = "#0a1030";
const COBALT = "#2d5bff";
const COBALT_LIGHT = "#3f8cff";
const AZURE = "#58a6ff";
const ICE_DEEP = "#6cb8ff";
const ICE = "#b5dcff";
const SKY_TINT = "#d6ecff";
const PALE = "#d3e9ff";

const GROUND = 150;

/** London Eye geometry. */
const EYE = { x: 170, y: 88, r: 46 };
const pods = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  return { x: EYE.x + Math.cos(a) * EYE.r, y: EYE.y + Math.sin(a) * EYE.r, hot: i === 4 };
});
const spokes = Array.from({ length: 4 }, (_, i) => {
  const a = (i / 4) * Math.PI;
  const dx = Math.cos(a) * EYE.r;
  const dy = Math.sin(a) * EYE.r;
  return `M${(EYE.x - dx).toFixed(1)} ${(EYE.y - dy).toFixed(1)}L${(EYE.x + dx).toFixed(1)} ${(EYE.y + dy).toFixed(1)}`;
}).join("");

/** Gentle water line across the full width. */
const waterLine = `M0 157Q15 154 30 157${Array.from({ length: 15 }, (_, i) => ` T${(i + 2) * 30} 157`).join("")}`;


/** A bird that flaps and bobs (motion) while a CSS keyframe glides it across the frame on a loop. */
function Bird({
  x0,
  y,
  scale = 1,
  duration = 40,
  reduce,
}: {
  x0: number;
  y: number;
  scale?: number;
  duration?: number;
  reduce: boolean | null;
}) {
  const up = "M -6 0 Q -3 -4 0 0 Q 3 -4 6 0";
  const down = "M -6 0 Q -3 3 0 0 Q 3 3 6 0";
  // Negative delay starts the loop part-way through, so each bird begins at its own x0.
  const delay = -((x0 + 30) / 540) * duration;
  return (
    <g transform={`translate(0 ${y})`}>
      <g
        className="bird-glide"
        style={
          {
            "--bird-x0": `${x0}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      >
        <g transform={`scale(${scale})`}>
          <motion.g
            animate={reduce ? undefined : { y: [0, -3, 0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.path
              d={up}
              stroke={INK}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.6"
              animate={reduce ? undefined : { d: [up, down, up] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        </g>
      </g>
    </g>
  );
}

/**
 * Dusk over the Thames in flat silhouette: a low sun, a pale back row of the
 * City, then Big Ben and Parliament, the Eye, St Paul's, the Shard, the Gherkin
 * and Tower Bridge standing on the embankment. A few lit accents carry the eye.
 * Buildings rise in on view; the Eye turns and a boat drifts. All of it is
 * static under reduced motion.
 */
export function LondonSkyline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  // Observe the <svg> itself: WebKit never fires whileInView for SVG child elements.
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  // Keep the server's hidden initial state so hydration matches; under reduced motion snap straight to visible.
  const rise = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, delay: 0.1 + i * 0.1, ease },
  });

  return (
    <svg
      ref={ref}
      shapeRendering="geometricPrecision"
      viewBox="0 -8 480 180"
      role="img"
      aria-label="A stylised illustration of the London skyline at dusk"
      className={className}
    >
      <defs>
        <linearGradient id="sun-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY_TINT} stopOpacity="0.95" />
          <stop offset="1" stopColor={SKY_TINT} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Low sun */}
      <motion.circle
        cx="300"
        cy="90"
        r="64"
        fill="url(#sun-glow)"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={reduce || inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: reduce ? 0 : 1.4, ease }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* Birds */}
      <Bird x0={90} y={20} duration={44} reduce={reduce} />
      <Bird x0={380} y={30} scale={0.75} duration={38} reduce={reduce} />

      {/* Back row: pale City silhouettes */}
      <motion.g {...rise(1)}>
        <rect x="112" y="92" width="14" height="58" fill={PALE} />
        <rect x="318" y="84" width="16" height="66" fill={PALE} />
        {/* Cheesegrater */}
        <path d="M376 150V86L390 68V150Z" fill={ICE} />
      </motion.g>

      {/* St Paul's */}
      <motion.g {...rise(2)}>
        <rect x="222" y="126" width="48" height="24" fill={ICE} />
        {/* west towers */}
        <rect x="222" y="110" width="9" height="40" fill={ICE} />
        <rect x="261" y="110" width="9" height="40" fill={ICE} />
        <path d="M222 110Q226.5 100 231 110ZM261 110Q265.5 100 270 110Z" fill={ICE_DEEP} />
        {/* portico */}
        <path d="M232 128L246 119L260 128Z" fill={ICE_DEEP} />
        {/* drum and dome */}
        <rect x="233" y="102" width="26" height="17" fill={ICE_DEEP} />
        <path d="M232 102Q246 66 260 102Z" fill={ICE_DEEP} />
        {/* lantern and cross */}
        <rect x="244" y="66" width="4" height="9" fill={ICE_DEEP} />
        <path d="M246 66V56M243 60H249" stroke={ICE_DEEP} strokeWidth="1.2" />
      </motion.g>

      {/* London Eye */}
      <motion.g {...rise(3)}>
        <path d={`M${EYE.x} ${EYE.y}L152 ${GROUND}M${EYE.x} ${EYE.y}L186 ${GROUND}`} stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r} fill="none" stroke={COBALT} strokeWidth="2.5" />
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r - 7} fill="none" stroke={COBALT} strokeWidth="0.75" />
          <path d={spokes} stroke={COBALT} strokeWidth="0.55" opacity="0.8" />
          {pods.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill={p.hot ? AZURE : SKY_TINT} stroke={COBALT} strokeWidth="0.75" />
          ))}
        </motion.g>
        <circle cx={EYE.x} cy={EYE.y} r="4.2" fill={INK} />
      </motion.g>

      {/* The Shard */}
      <motion.g {...rise(4)}>
        <path d="M286 150L303 2V150Z" fill={COBALT_LIGHT} />
        <path d="M303 150V12L322 150Z" fill={COBALT} />
        <path d="M303 2V-6" stroke={INK} strokeWidth="1.2" />
      </motion.g>

      {/* The Gherkin */}
      <motion.g {...rise(5)}>
        <path d="M354 58C366 66 372 86 372 112C372 130 368 144 366 150H342C340 144 336 130 336 112C336 86 342 66 354 58Z" fill={AZURE} />
        <path d="M354 49C360 53 364 60 366 67Q354 63 342 67C344 60 348 53 354 49Z" fill={SKY_TINT} stroke={COBALT} strokeWidth="0.8" />
        <path d="M354 49V43" stroke={INK} strokeWidth="1.1" />
      </motion.g>

      {/* Tower Bridge */}
      <motion.g {...rise(6)}>
        {/* suspension cables */}
        <path d="M396 66Q388 110 386 146M468 66Q476 110 478 146" stroke={INK} strokeWidth="1.3" fill="none" />
        <path d="M410 66Q432 108 454 66" stroke={INK} strokeWidth="1.5" fill="none" />
        {/* towers */}
        {[396, 454].map(x => (
          <g key={x}>
            <rect x={x} y="62" width="14" height={GROUND - 62} fill={INK} />
            <path d={`M${x - 2} 62L${x + 7} 42L${x + 16} 62Z`} fill={INK} />
            <path d={`M${x + 7} 42V34`} stroke={INK} strokeWidth="1.1" />
            <rect x={x + 4} y="72" width="6" height="12" rx="3" fill={SKY_TINT} />
          </g>
        ))}
        {/* high-level walkway */}
        <rect x="410" y="78" width="44" height="3" fill={INK} />
        {/* roadway */}
        <rect x="410" y="128" width="44" height="4" fill={INK} />
        <path d="M410 130H454" stroke={AZURE} strokeWidth="0.8" />
        <path d="M384 142L396 134M468 134L480 142" stroke={INK} strokeWidth="3" />
      </motion.g>

      {/* Palace of Westminster */}
      <motion.g {...rise(0)}>
        <rect x="40" y="130" width="72" height="20" fill={INK} />
        {/* turrets */}
        <path d="M54 130V120L58 108L62 120V130M74 130V122L78 112L82 122V130" fill={INK} stroke={INK} strokeWidth="1" />
        {/* Victoria Tower */}
        <rect x="100" y="104" width="12" height="26" fill={INK} />
        <path d="M98 104L106 88L114 104Z" fill={INK} />
        <path d="M106 88V80" stroke={INK} strokeWidth="1.1" />
        <rect x="104" y="112" width="4" height="9" rx="2" fill={SKY_TINT} />
      </motion.g>

      {/* Elizabeth Tower */}
      <motion.g {...rise(0)}>
        {/* roof and finial */}
        <path d="M16 34L26 6L36 34Z" fill={INK} />
        <path d="M26 6V-4" stroke={INK} strokeWidth="1.2" />
        {/* belfry */}
        <rect x="13" y="34" width="26" height="3" fill={INK} />
        <rect x="15" y="37" width="22" height="15" fill={INK} />
        {/* clock */}
        <rect x="16" y="52" width="20" height="22" fill={INK} />
        <circle cx="26" cy="63" r="8.5" fill={SKY_TINT} />
        <circle cx="26" cy="63" r="1" fill={INK} />
        <path d="M26 63V57M26 63L30 65" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        {/* shaft */}
        <rect x="13" y="74" width="26" height="3" fill={INK} />
        <rect x="17" y="77" width="18" height="73" fill={INK} />
        <rect x="15" y="142" width="22" height="8" fill={INK} />
      </motion.g>

      {/* Embankment and Thames */}
      <rect x="0" y={GROUND} width="480" height="3" fill={INK} />

      <motion.path
        d={waterLine}
        stroke={AZURE}
        strokeWidth="1.2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={reduce || inView ? { pathLength: 1 } : undefined}
        transition={{ duration: reduce ? 0 : 1.8, ease }}
      />
      <path d="M214 166H232" stroke={AZURE} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

      {/* A boat, drifting */}
      <g transform="translate(120 160)">
        <motion.g
          animate={reduce ? undefined : { x: [0, 54] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <path d="M0 4H20L17 8H3Z" fill={INK} />
          <rect x="6" y="0" width="8" height="4" fill={COBALT} />
        </motion.g>
      </g>
    </svg>
  );
}

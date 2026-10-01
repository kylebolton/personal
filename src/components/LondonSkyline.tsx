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
const WHITE = "#ffffff";

const GROUND = 150;

/** London Eye geometry. */
const EYE = { x: 170, y: 88, r: 46 };
const pods = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  return { x: EYE.x + Math.cos(a) * EYE.r, y: EYE.y + Math.sin(a) * EYE.r, hot: i === 4 };
});
const spokes = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI;
  const dx = Math.cos(a) * EYE.r;
  const dy = Math.sin(a) * EYE.r;
  return `M${(EYE.x - dx).toFixed(1)} ${(EYE.y - dy).toFixed(1)}L${(EYE.x + dx).toFixed(1)} ${(EYE.y + dy).toFixed(1)}`;
}).join("");

/** Clock face ticks for Elizabeth Tower. */
const clockTicks = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const r1 = i % 3 === 0 ? 5.4 : 6.2;
  return `M${(26 + Math.sin(a) * r1).toFixed(2)} ${(63 - Math.cos(a) * r1).toFixed(2)}L${(26 + Math.sin(a) * 7.2).toFixed(2)} ${(63 - Math.cos(a) * 7.2).toFixed(2)}`;
}).join("");

/** Shard floor lines: the half-width at height y of a triangle from (304, 2) to a 36-wide base. */
const shardFloors = [16, 30, 46, 63, 81, 100, 119, 136].map(y => {
  const hw = ((y - 2) / (GROUND - 2)) * 18;
  return `M${(304 - hw).toFixed(1)} ${y}H${(304 + hw).toFixed(1)}`;
}).join("");

/** Gentle water line across the full width. */
const waterLine = `M0 157Q15 154 30 157${Array.from({ length: 15 }, (_, i) => ` T${(i + 2) * 30} 157`).join("")}`;

/** Rows of lit windows, with a deterministic "some lights off" pattern. */
function Windows({
  x,
  y,
  cols,
  rows,
  gx = 5,
  gy = 6,
  w = 2,
  h = 2.5,
  fill = SKY_TINT,
  opacity = 0.9,
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  gx?: number;
  gy?: number;
  w?: number;
  h?: number;
  fill?: string;
  opacity?: number;
}) {
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r * 7 + c * 3) % 5 === 0) continue;
      out.push(
        <rect key={`${r}-${c}`} x={x + c * gx} y={y + r * gy} width={w} height={h} fill={fill} opacity={opacity} />,
      );
    }
  }
  return <>{out}</>;
}


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
 * Dusk over the Thames: a low sun, a pale back row of the City, then Big Ben
 * and Parliament, the Eye, St Paul's, the Shard, the Gherkin and Tower Bridge
 * standing on the embankment, with a faint reflection below. Buildings rise in
 * on view; the Eye turns and a boat drifts. All of it is static under
 * reduced motion.
 */
export function LondonSkyline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  // Observe the <svg> itself: WebKit never fires whileInView for SVG child elements.
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const rise = (i: number) =>
    reduce
      ? // The server renders the hidden initial state, so snap to visible rather than omit the props.
        { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.9, delay: 0.1 + i * 0.1, ease },
        };

  return (
    <svg
      ref={ref}
      shapeRendering="geometricPrecision"
      viewBox="0 -8 480 194"
      role="img"
      aria-label="A stylised illustration of the London skyline at dusk"
      className={className}
    >
      <defs>
        <clipPath id="gherkin-clip">
          <path d="M354 58C366 66 372 86 372 112C372 130 368 144 366 150H342C340 144 336 130 336 112C336 86 342 66 354 58Z" />
        </clipPath>
        <linearGradient id="water-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="water-mask" maskUnits="userSpaceOnUse" x="0" y="154" width="480" height="32">
          <rect x="0" y="154" width="480" height="32" fill="url(#water-fade)" />
        </mask>
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
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.4, ease }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* Birds */}
      <Bird x0={90} y={20} duration={44} reduce={reduce} />
      <Bird x0={300} y={12} scale={0.9} duration={52} reduce={reduce} />
      <Bird x0={380} y={30} scale={0.75} duration={38} reduce={reduce} />

      {/* Wisps of cloud */}
      <g stroke={ICE} strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
        <path d="M58 46H104M72 51.5H98" />
        <path d="M182 33H228M196 38.5H222" />
        <path d="M408 38H448M420 43.5H442" />
      </g>

      {/* Back row: pale City silhouettes */}
      <motion.g {...rise(1)}>
        <rect x="112" y="92" width="14" height="58" fill={PALE} />
        <Windows x={114.5} y={96} cols={2} rows={8} gx={5} gy={6} w={2} h={2.5} fill={WHITE} opacity={0.75} />
        <rect x="273" y="98" width="11" height="52" fill={PALE} />
        <Windows x={275.5} y={102} cols={2} rows={7} gx={4.2} gy={6.5} w={1.8} h={2.5} fill={WHITE} opacity={0.75} />
        <rect x="318" y="84" width="16" height="66" fill={PALE} />
        <Windows x={320.5} y={88} cols={3} rows={9} gx={4.4} gy={6.5} w={2} h={2.5} fill={WHITE} opacity={0.75} />
        {/* crane */}
        <g stroke={ICE_DEEP} strokeWidth="1" fill="none">
          <path d="M326 84V56M312 58H348M326 56L336 58M344 58V70" />
        </g>
        {/* Cheesegrater */}
        <path d="M376 150V86L390 68V150Z" fill={ICE} />
        <path d="M376 86L390 68M381 150V82M386 150V75" stroke={WHITE} strokeWidth="0.8" opacity="0.7" />
        <path d="M376 100H390M376 114H390M376 128H390M376 142H390" stroke={WHITE} strokeWidth="0.5" opacity="0.6" />
      </motion.g>

      {/* St Paul's */}
      <motion.g {...rise(2)}>
        <rect x="222" y="126" width="48" height="24" fill={ICE} />
        {/* west towers */}
        <rect x="222" y="110" width="9" height="40" fill={ICE} />
        <rect x="261" y="110" width="9" height="40" fill={ICE} />
        <path d="M222 110Q226.5 100 231 110ZM261 110Q265.5 100 270 110Z" fill={ICE_DEEP} />
        <path d="M226.5 100V95M265.5 100V95" stroke={ICE_DEEP} strokeWidth="0.9" />
        <rect x="225.6" y="114" width="1.8" height="6" rx="0.9" fill={SKY_TINT} />
        <rect x="265.6" y="114" width="1.8" height="6" rx="0.9" fill={SKY_TINT} />
        <rect x="225.6" y="126" width="1.8" height="6" rx="0.9" fill={SKY_TINT} />
        <rect x="265.6" y="126" width="1.8" height="6" rx="0.9" fill={SKY_TINT} />
        {/* balustrade */}
        <path d="M231 125.5H261" stroke={ICE_DEEP} strokeWidth="1.2" strokeDasharray="1.1 1.1" />
        {/* portico */}
        <path d="M232 128L246 119L260 128Z" fill={ICE_DEEP} />
        <path d="M235 150V128M240.5 150V128M246 150V128M251.5 150V128M257 150V128" stroke={WHITE} strokeWidth="1.2" opacity="0.75" />
        {/* drum and dome */}
        <rect x="233" y="102" width="26" height="17" fill={ICE_DEEP} />
        <path d="M237 119V102M242 119V102M246 119V102M250 119V102M255 119V102" stroke={WHITE} strokeWidth="0.9" opacity="0.7" />
        <path d="M232 102Q246 66 260 102Z" fill={ICE_DEEP} />
        <path d="M246 76L237 102M246 76L241.5 102M246 76V102M246 76L250.5 102M246 76L255 102" stroke={WHITE} strokeWidth="0.6" opacity="0.75" />
        <path d="M234 94H258" stroke={WHITE} strokeWidth="0.5" opacity="0.5" />
        {/* lantern and cross */}
        <rect x="244" y="66" width="4" height="9" fill={ICE_DEEP} />
        <path d="M244 70H248M244 73H248" stroke={WHITE} strokeWidth="0.5" opacity="0.7" />
        <path d="M246 66V56M243 60H249" stroke={ICE_DEEP} strokeWidth="1.2" />
        <circle cx="246" cy="54.6" r="1.2" fill={ICE_DEEP} />
      </motion.g>

      {/* London Eye */}
      <motion.g {...rise(3)}>
        <path d={`M${EYE.x} ${EYE.y}L152 ${GROUND}M${EYE.x} ${EYE.y}L186 ${GROUND}`} stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
        <path d={`M${EYE.x} ${EYE.y}L208 ${GROUND}`} stroke={INK} strokeWidth="1.1" opacity="0.55" strokeLinecap="round" />
        <path d="M164.2 108H175.2M159 126H179.8M155.5 138H183.1" stroke={INK} strokeWidth="0.8" opacity="0.8" />
        <path d={`M146 ${GROUND}H192`} stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r} fill="none" stroke={COBALT} strokeWidth="2.5" />
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r + 2} fill="none" stroke={AZURE} strokeWidth="0.5" opacity="0.8" />
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r - 7} fill="none" stroke={COBALT} strokeWidth="0.75" />
          <circle cx={EYE.x} cy={EYE.y} r={EYE.r - 14} fill="none" stroke={COBALT} strokeWidth="0.4" opacity="0.6" />
          <path d={spokes} stroke={COBALT} strokeWidth="0.55" opacity="0.8" />
          {pods.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="3" fill={p.hot ? AZURE : SKY_TINT} stroke={COBALT} strokeWidth="0.75" />
              <circle cx={p.x - 0.8} cy={p.y - 0.9} r="0.9" fill={WHITE} opacity="0.9" />
            </g>
          ))}
        </motion.g>
        <circle cx={EYE.x} cy={EYE.y} r="4.2" fill={INK} />
        <circle cx={EYE.x} cy={EYE.y} r="1.8" fill={AZURE} />
      </motion.g>

      {/* The Shard */}
      <motion.g {...rise(4)}>
        <path d="M286 150L303 2V150Z" fill={COBALT_LIGHT} />
        <path d="M303 150V12L322 150Z" fill={COBALT} />
        <path d={shardFloors} stroke={WHITE} strokeWidth="0.9" opacity="0.7" />
        <path d="M303 2L299 62M303 12L313 78M303 40L297 120" stroke={WHITE} strokeWidth="0.5" opacity="0.35" />
        <path d="M303 2V-6" stroke={INK} strokeWidth="1.2" />
      </motion.g>

      {/* The Gherkin */}
      <motion.g {...rise(5)}>
        <path d="M354 58C366 66 372 86 372 112C372 130 368 144 366 150H342C340 144 336 130 336 112C336 86 342 66 354 58Z" fill={AZURE} />
        <g clipPath="url(#gherkin-clip)" stroke={COBALT} strokeWidth="0.9" opacity="0.8">
          {Array.from({ length: 16 }, (_, i) => (
            <path key={`a${i}`} d={`M${300 + i * 5} 56L${342 + i * 5} 170`} strokeWidth="0.6" />
          ))}
          {Array.from({ length: 15 }, (_, i) => (
            <path key={`b${i}`} d={`M${336 + i * 5} 56L${294 + i * 5} 170`} strokeWidth="0.6" />
          ))}
        </g>
        <g clipPath="url(#gherkin-clip)" stroke={SKY_TINT} strokeWidth="0.6" opacity="0.55">
          {[72, 88, 104, 120, 136].map(y => (
            <path key={y} d={`M330 ${y}H378`} />
          ))}
        </g>
        <path d="M347 66C341 76 339 92 339 112" stroke={WHITE} strokeWidth="1.4" strokeLinecap="round" opacity="0.4" fill="none" />
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
            <path d={`M${x - 2} 62L${x} 54L${x + 2} 62M${x + 12} 62L${x + 14} 54L${x + 16} 62`} fill={INK} stroke={INK} strokeWidth="0.8" />
            <rect x={x + 4} y="72" width="6" height="12" rx="3" fill={SKY_TINT} />
            <rect x={x + 4} y="94" width="6" height="12" rx="3" fill={SKY_TINT} opacity="0.85" />
            <rect x={x + 4} y="116" width="6" height="12" rx="3" fill={AZURE} />
            <path d={`M${x} 90H${x + 14}M${x} 112H${x + 14}M${x} 134H${x + 14}`} stroke={WHITE} strokeWidth="0.6" opacity="0.35" />
            <path d={`M${x + 7} 62V140`} stroke={WHITE} strokeWidth="0.4" opacity="0.2" />
            <path d={`M${x + 3} ${GROUND}V144Q${x + 7} 138 ${x + 11} 144V${GROUND}Z`} fill={SKY_TINT} opacity="0.35" />
          </g>
        ))}
        {/* hangers */}
        <g stroke={INK} strokeWidth="0.5" opacity="0.6">
          {Array.from({ length: 7 }, (_, i) => {
            const x = 416 + i * 5.3;
            const t = (x - 410) / 44;
            const y = 66 + 84 * t * (1 - t);
            return <path key={i} d={`M${x.toFixed(1)} ${y.toFixed(1)}V128`} />;
          })}
        </g>
        {/* high-level walkway with truss */}
        <rect x="410" y="80" width="44" height="3" fill={INK} />
        <path d="M410 71H454" stroke={INK} strokeWidth="1.3" />
        <path d="M410 80l5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 4-9" stroke={INK} strokeWidth="0.8" fill="none" />
        {/* roadway */}
        <rect x="410" y="128" width="44" height="4" fill={INK} />
        <path d="M410 130H454" stroke={AZURE} strokeWidth="0.8" />
        <path d="M384 142L396 134M468 134L480 142" stroke={INK} strokeWidth="3" />
      </motion.g>

      {/* Palace of Westminster */}
      <motion.g {...rise(0)}>
        <rect x="40" y="130" width="72" height="20" fill={INK} />
        {/* crenellations */}
        <path d="M42 130V127.5H44.4V130M47 130V127.5H49.4V130M66 130V127.5H68.4V130M86 130V127.5H88.4V130M91 130V127.5H93.4V130M96 130V127.5H98.4V130" fill={INK} stroke={INK} strokeWidth="0.6" />
        <path d="M44 130V124L46 120L48 124V130M90 130V123L92 119L94 123V130" fill={INK} stroke={INK} strokeWidth="0.8" />
        <path d="M40 132H112" stroke={WHITE} strokeWidth="0.8" opacity="0.4" />
        {/* turrets */}
        <path d="M54 130V120L58 108L62 120V130M74 130V122L78 112L82 122V130" fill={INK} stroke={INK} strokeWidth="1" />
        {/* Victoria Tower */}
        <rect x="100" y="104" width="12" height="26" fill={INK} />
        <path d="M98 104L106 88L114 104Z" fill={INK} />
        <path d="M106 88V80" stroke={INK} strokeWidth="1.1" />
        <rect x="104" y="112" width="4" height="9" rx="2" fill={SKY_TINT} opacity="0.85" />
        <path d="M100 108H112M100 124H112" stroke={WHITE} strokeWidth="0.5" opacity="0.25" />
        <path d="M100 104V100M112 104V100" stroke={INK} strokeWidth="1.2" />
        <Windows x={44} y={135} cols={13} rows={2} gx={4.8} gy={7} w={2.2} h={4} />
        <path d="M40 146H112" stroke={WHITE} strokeWidth="0.5" opacity="0.3" />
      </motion.g>

      {/* Elizabeth Tower */}
      <motion.g {...rise(0)}>
        {/* roof and finial */}
        <path d="M16 34L26 6L36 34Z" fill={INK} />
        <path d="M26 8L21 34M26 8L31 34" stroke={SKY_TINT} strokeWidth="0.6" opacity="0.4" />
        <path d="M23.6 22H28.4M21.4 29H30.6" stroke={SKY_TINT} strokeWidth="0.5" opacity="0.45" />
        <circle cx="26" cy="-4.6" r="1.2" fill={AZURE} />
        <path d="M26 6V-4" stroke={INK} strokeWidth="1.2" />
        {/* pinnacles */}
        <path d="M13 36L15 27L17 36ZM35 36L37 27L39 36Z" fill={INK} />
        {/* belfry */}
        <rect x="13" y="34" width="26" height="3" fill={INK} />
        <rect x="15" y="37" width="22" height="15" fill={INK} />
        <path d="M18 49V42Q19.5 39 21 42V49M24.5 49V42Q26 39 27.5 42V49M31 49V42Q32.5 39 34 42V49" fill={SKY_TINT} opacity="0.85" />
        {/* clock */}
        <rect x="16" y="52" width="20" height="22" fill={INK} />
        <circle cx="26" cy="63" r="8.5" fill={SKY_TINT} />
        <circle cx="26" cy="63" r="8.5" fill="none" stroke={WHITE} strokeWidth="1" />
        <circle cx="26" cy="63" r="10" fill="none" stroke={AZURE} strokeWidth="0.6" opacity="0.8" />
        <circle cx="26" cy="63" r="1" fill={INK} />
        <path d={clockTicks} stroke={INK} strokeWidth="0.7" />
        <path d="M26 63V57M26 63L30 65" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        {/* shaft */}
        <rect x="13" y="74" width="26" height="3" fill={INK} />
        <rect x="17" y="77" width="18" height="73" fill={INK} />
        <path d="M19.5 150V80M32.5 150V80" stroke={WHITE} strokeWidth="0.6" opacity="0.25" />
        <path d="M17 95H35M17 113H35M17 131H35" stroke={WHITE} strokeWidth="0.5" opacity="0.2" />
        {[86, 104, 122].map(y => (
          <g key={y}>
            {[21.5, 27.5].map(x => (
              <path key={x} d={`M${x} ${y + 10}V${y + 3}L${x + 1.5} ${y - 0.5}L${x + 3} ${y + 3}V${y + 10}Z`} fill={SKY_TINT} opacity="0.85" />
            ))}
          </g>
        ))}
        <rect x="15" y="142" width="22" height="8" fill={INK} />
      </motion.g>

      {/* Embankment and Thames */}
      <rect x="0" y={GROUND} width="480" height="3" fill={INK} />
      <path d={`M0 ${GROUND + 1.5}H480`} stroke={WHITE} strokeWidth="0.4" opacity="0.25" />
      {[128, 216, 276, 332, 380, 436].map(x => (
        <g key={x}>
          <path d={`M${x} ${GROUND}V138`} stroke={INK} strokeWidth="0.8" />
          <path d={`M${x - 2} 138H${x + 2}`} stroke={INK} strokeWidth="0.8" />
          <circle cx={x} cy="136.5" r="1.3" fill={SKY_TINT} stroke={INK} strokeWidth="0.5" />
        </g>
      ))}

      <g mask="url(#water-mask)">
        <g opacity="0.2" fill={COBALT}>
          <rect x="17" y="154" width="18" height="32" />
          <rect x="40" y="154" width="72" height="10" />
          <rect x="396" y="154" width="14" height="32" />
          <rect x="454" y="154" width="14" height="32" />
        </g>
        <g opacity="0.22" fill={COBALT}>
          <path d="M286 154H322L313 186H295Z" />
          <path d="M342 154H366L362 186H346Z" />
          <circle cx={EYE.x} cy={EYE.y + 2 * (GROUND - EYE.y) + 6} r={EYE.r} fill="none" stroke={COBALT} strokeWidth="2" />
        </g>
        <g stroke={WHITE} strokeWidth="1.8" strokeLinecap="round">
          <path d="M0 161H480" strokeDasharray="46 16 30 24" />
          <path d="M0 167H480" strokeDasharray="22 14 52 18" strokeDashoffset="10" />
          <path d="M0 173H480" strokeDasharray="38 20 18 26" strokeDashoffset="24" />
          <path d="M0 179H480" strokeDasharray="30 16 44 12" strokeDashoffset="6" />
          <path d="M0 185H480" strokeDasharray="18 22 36 20" strokeDashoffset="30" />
        </g>
      </g>

      <motion.path
        d={waterLine}
        stroke={AZURE}
        strokeWidth="1.2"
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.8, ease }}
      />

      {/* A boat, drifting */}
      <g transform="translate(120 160)">
        <motion.g
          animate={reduce ? undefined : { x: [0, 54] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <path d="M0 4H20L17 8H3Z" fill={INK} />
          <rect x="6" y="0" width="8" height="4" fill={COBALT} />
          <rect x="7.5" y="1" width="2" height="1.8" fill={SKY_TINT} />
          <rect x="10.5" y="1" width="2" height="1.8" fill={SKY_TINT} />
        </motion.g>
      </g>
    </svg>
  );
}

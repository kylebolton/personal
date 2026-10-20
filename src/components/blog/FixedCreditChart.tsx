export function FixedCreditChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 40 1200 520"
      role="img"
      aria-labelledby="fcc-title fcc-desc"
      className={className}
    >
      <title id="fcc-title">Floating versus fixed borrow rate</title>
      <desc id="fcc-desc">
        A floating borrow rate that hovers around 6% and spikes above 10%, 14% and almost
        40%, beside a flat fixed rate held at 5.5% from the start of the loan to its maturity on day 90.
      </desc>
      <defs>
        <linearGradient id="fcc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--foreground)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--foreground)" stopOpacity="0" />
        </linearGradient>
        <pattern id="fcc-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" className="stroke-blue" strokeOpacity="0.3" strokeWidth="1.2" />
        </pattern>
      </defs>
      <line x1="90" x2="1150" y1="470" y2="470" className="stroke-hairline" strokeWidth="1"/><text x="80" y="474" className="fill-muted font-mono" fontSize="22" textAnchor="end">0%</text><line x1="90" x2="1150" y1="370" y2="370" className="stroke-hairline" strokeWidth="1"/><text x="80" y="374" className="fill-muted font-mono" fontSize="22" textAnchor="end">10%</text><line x1="90" x2="1150" y1="270" y2="270" className="stroke-hairline" strokeWidth="1"/><text x="80" y="274" className="fill-muted font-mono" fontSize="22" textAnchor="end">20%</text><line x1="90" x2="1150" y1="170" y2="170" className="stroke-hairline" strokeWidth="1"/><text x="80" y="174" className="fill-muted font-mono" fontSize="22" textAnchor="end">30%</text><line x1="90" x2="1150" y1="70" y2="70" className="stroke-hairline" strokeWidth="1"/><text x="80" y="74" className="fill-muted font-mono" fontSize="22" textAnchor="end">40%</text>
      <path d="M90.0,418.2 L97.6,413.3 L105.1,413.0 L112.7,413.2 L120.3,416.1 L127.9,415.0 L135.4,408.3 L143.0,406.3 L150.6,402.0 L158.1,402.4 L165.7,402.0 L173.3,402.7 L180.9,411.5 L188.4,406.8 L196.0,404.8 L203.6,403.4 L211.1,412.1 L218.7,418.9 L226.3,420.2 L233.9,419.3 L241.4,415.1 L249.0,413.5 L256.6,409.8 L264.1,412.2 L271.7,409.8 L279.3,407.6 L286.9,410.6 L294.4,402.3 L302.0,401.2 L309.6,397.5 L317.1,334.4 L324.7,330.6 L332.3,328.5 L339.9,406.6 L347.4,411.3 L355.0,412.8 L362.6,406.1 L370.1,410.2 L377.7,408.6 L385.3,406.5 L392.9,413.6 L400.4,412.0 L408.0,405.1 L415.6,414.9 L423.1,414.6 L430.7,413.4 L438.3,415.8 L445.9,411.6 L453.4,411.0 L461.0,416.8 L468.6,410.9 L476.1,407.2 L483.7,403.1 L491.3,397.8 L498.9,398.8 L506.4,400.5 L514.0,408.2 L521.6,405.4 L529.1,372.7 L536.7,375.8 L544.3,362.3 L551.9,378.7 L559.4,361.3 L567.0,381.4 L574.6,422.9 L582.1,417.6 L589.7,418.5 L597.3,420.9 L604.9,413.3 L612.4,407.0 L620.0,406.5 L627.6,405.8 L635.1,404.4 L642.7,398.1 L650.3,397.8 L657.9,398.0 L665.4,398.1 L673.0,407.6 L680.6,401.9 L688.1,399.1 L695.7,399.0 L703.3,410.1 L710.9,412.4 L718.4,407.5 L726.0,101.1 L733.6,150.3 L741.1,406.5 L748.7,407.5 L756.3,406.2 L763.9,403.7 L771.4,404.2 L779.0,400.0 L786.6,405.0 L794.1,407.6 L801.7,403.0 L809.3,404.1 L816.9,409.1 L824.4,404.5 L832.0,398.8 L839.6,403.1 L847.1,410.5 L854.7,410.5 L862.3,410.6 L869.9,411.3 L877.4,404.1 L885.0,409.7 L892.6,403.6 L900.1,410.4 L907.7,413.4 L915.3,409.2 L922.9,334.8 L930.4,339.1 L938.0,336.5 L945.6,338.3 L953.1,403.6 L960.7,404.7 L968.3,402.1 L975.9,401.0 L983.4,393.7 L991.0,395.8 L998.6,400.8 L1006.1,404.3 L1013.7,405.3 L1021.3,401.8 L1028.9,404.9 L1036.4,403.9 L1044.0,396.7 L1051.6,411.0 L1059.1,415.3 L1066.7,412.4 L1074.3,409.5 L1081.9,408.1 L1089.4,410.0 L1097.0,406.5 L1104.6,405.6 L1112.1,408.6 L1119.7,397.5 L1127.3,398.5 L1134.9,403.4 L1142.4,405.0 L1150.0,406.8 L1150,470 L90,470 Z" fill="url(#fcc-fill)" />
      <path d="M90.0,418.2 L97.6,413.3 L105.1,413.0 L112.7,413.2 L120.3,416.1 L127.9,415.0 L135.4,408.3 L143.0,406.3 L150.6,402.0 L158.1,402.4 L165.7,402.0 L173.3,402.7 L180.9,411.5 L188.4,406.8 L196.0,404.8 L203.6,403.4 L211.1,412.1 L218.7,418.9 L226.3,420.2 L233.9,419.3 L241.4,415.1 L249.0,413.5 L256.6,409.8 L264.1,412.2 L271.7,409.8 L279.3,407.6 L286.9,410.6 L294.4,402.3 L302.0,401.2 L309.6,397.5 L317.1,334.4 L324.7,330.6 L332.3,328.5 L339.9,406.6 L347.4,411.3 L355.0,412.8 L362.6,406.1 L370.1,410.2 L377.7,408.6 L385.3,406.5 L392.9,413.6 L400.4,412.0 L408.0,405.1 L415.6,414.9 L423.1,414.6 L430.7,413.4 L438.3,415.8 L445.9,411.6 L453.4,411.0 L461.0,416.8 L468.6,410.9 L476.1,407.2 L483.7,403.1 L491.3,397.8 L498.9,398.8 L506.4,400.5 L514.0,408.2 L521.6,405.4 L529.1,372.7 L536.7,375.8 L544.3,362.3 L551.9,378.7 L559.4,361.3 L567.0,381.4 L574.6,422.9 L582.1,417.6 L589.7,418.5 L597.3,420.9 L604.9,413.3 L612.4,407.0 L620.0,406.5 L627.6,405.8 L635.1,404.4 L642.7,398.1 L650.3,397.8 L657.9,398.0 L665.4,398.1 L673.0,407.6 L680.6,401.9 L688.1,399.1 L695.7,399.0 L703.3,410.1 L710.9,412.4 L718.4,407.5 L726.0,101.1 L733.6,150.3 L741.1,406.5 L748.7,407.5 L756.3,406.2 L763.9,403.7 L771.4,404.2 L779.0,400.0 L786.6,405.0 L794.1,407.6 L801.7,403.0 L809.3,404.1 L816.9,409.1 L824.4,404.5 L832.0,398.8 L839.6,403.1 L847.1,410.5 L854.7,410.5 L862.3,410.6 L869.9,411.3 L877.4,404.1 L885.0,409.7 L892.6,403.6 L900.1,410.4 L907.7,413.4 L915.3,409.2 L922.9,334.8 L930.4,339.1 L938.0,336.5 L945.6,338.3 L953.1,403.6 L960.7,404.7 L968.3,402.1 L975.9,401.0 L983.4,393.7 L991.0,395.8 L998.6,400.8 L1006.1,404.3 L1013.7,405.3 L1021.3,401.8 L1028.9,404.9 L1036.4,403.9 L1044.0,396.7 L1051.6,411.0 L1059.1,415.3 L1066.7,412.4 L1074.3,409.5 L1081.9,408.1 L1089.4,410.0 L1097.0,406.5 L1104.6,405.6 L1112.1,408.6 L1119.7,397.5 L1127.3,398.5 L1134.9,403.4 L1142.4,405.0 L1150.0,406.8" className="fill-none stroke-foreground" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="250" y="415.0" width="760" height="55.0" fill="url(#fcc-hatch)" />
      <line x1="250" x2="1010" y1="415.0" y2="415.0" className="stroke-blue" strokeWidth="5" strokeLinecap="round" />
      <line x1="250" x2="250" y1="369.0" y2="470" className="stroke-blue" strokeWidth="1.5" strokeDasharray="3 4" />
      <line x1="1010" x2="1010" y1="369.0" y2="470" className="stroke-blue" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="250" cy="415.0" r="8" className="fill-background stroke-blue" strokeWidth="3" />
      <circle cx="1010" cy="415.0" r="8" className="fill-background stroke-blue" strokeWidth="3" />
      <text x="258" y="448.0" className="fill-blue font-mono" fontSize="26" letterSpacing="2">fixed: 5.50%, start to finish</text>
      <text x="250" y="492" className="fill-muted font-mono" fontSize="22" textAnchor="middle">you borrow</text>
      <text x="1010" y="492" className="fill-muted font-mono" fontSize="22" textAnchor="middle">you repay, day 90</text>
      <text x="770" y="92" className="fill-foreground font-mono" fontSize="26" letterSpacing="2">floating rate</text>
      <text x="770" y="122" className="fill-muted font-mono" fontSize="22">jumps when the pool is busy</text>
      <text x="90" y="530" className="fill-muted font-mono" fontSize="22">what you pay, apr</text>
    </svg>
  );
}

export function YieldsChart({ className = "h-auto w-full" }: { className?: string }) {
  return (
    <svg viewBox="-8 0 1208 660" role="img" aria-labelledby="yc-title yc-desc" className={className}>
      <title id="yc-title">Headline yields against April 2026 rates</title>
      <desc id="yc-desc">
        Paired bars comparing the headline yield each platform showed with its April 2026 rate: Ethena sUSDe from more than 40% to about 3.5%, Aave from 20% to 2.61%, and Sky from 12.5% to 3.75%. A dashed line marks the 3.14% a brokerage paid on idle cash.
      </desc>
      <defs><pattern id="yc-h" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" className="stroke-foreground" strokeOpacity="0.45" strokeWidth="1.2"/></pattern></defs>
      <rect x="330" y="22" width="44" height="22" fill="url(#yc-h)" className="stroke-foreground" strokeWidth="1.5"/><text x="388" y="40" className="fill-muted font-mono" fontSize="22">headline rate</text>
      <rect x="620" y="22" width="44" height="22" className="fill-blue"/><text x="678" y="40" className="fill-muted font-mono" fontSize="22">april 2026</text>
      <line x1="330" x2="330" y1="76" y2="560" className="stroke-hairline" strokeWidth="1"/><text x="330" y="64" className="fill-muted font-mono" fontSize="22" textAnchor="middle">0%</text>
      <line x1="520" x2="520" y1="76" y2="560" className="stroke-hairline" strokeWidth="1"/><text x="520" y="64" className="fill-muted font-mono" fontSize="22" textAnchor="middle">10%</text>
      <line x1="710" x2="710" y1="76" y2="560" className="stroke-hairline" strokeWidth="1"/><text x="710" y="64" className="fill-muted font-mono" fontSize="22" textAnchor="middle">20%</text>
      <line x1="900" x2="900" y1="76" y2="560" className="stroke-hairline" strokeWidth="1"/><text x="900" y="64" className="fill-muted font-mono" fontSize="22" textAnchor="middle">30%</text>
      <line x1="1090" x2="1090" y1="76" y2="560" className="stroke-hairline" strokeWidth="1"/><text x="1090" y="64" className="fill-muted font-mono" fontSize="22" textAnchor="middle">40%</text>
      <text x="0" y="134" className="fill-foreground" fontSize="38" fontWeight="300">ethena sUSDe</text>
      <text x="0" y="168" className="fill-muted font-mono" fontSize="22">staked USDe</text><text x="0" y="196" className="fill-muted font-mono" fontSize="22">peak in 2024</text>
      <rect x="330" y="106" width="760" height="38" fill="url(#yc-h)" className="stroke-foreground" strokeWidth="1.5"/>
      <text x="1104" y="134" className="fill-foreground font-mono" fontSize="26">40%+</text>
      <rect x="330" y="162" width="66.5" height="38" className="fill-blue"/>
      <text x="418.5" y="191" className="fill-foreground font-mono" fontSize="26">3.5%</text>
      <text x="512.5" y="191" className="fill-blue font-mono" fontSize="26">down 90%+</text>
      <text x="0" y="289" className="fill-foreground" fontSize="38" fontWeight="300">aave</text>
      <text x="0" y="323" className="fill-muted font-mono" fontSize="22">USDC pool</text><text x="0" y="351" className="fill-muted font-mono" fontSize="22">peak in 2021 to 2022</text>
      <rect x="330" y="261" width="380" height="38" fill="url(#yc-h)" className="stroke-foreground" strokeWidth="1.5"/>
      <text x="724" y="289" className="fill-foreground font-mono" fontSize="26">20%</text>
      <rect x="330" y="317" width="49.6" height="38" className="fill-blue"/>
      <text x="401.6" y="346" className="fill-foreground font-mono" fontSize="26">2.61%</text>
      <text x="511.6" y="346" className="fill-blue font-mono" fontSize="26">down 87%</text>
      <text x="0" y="444" className="fill-foreground" fontSize="38" fontWeight="300">sky</text>
      <text x="0" y="478" className="fill-muted font-mono" fontSize="22">savings rate</text><text x="0" y="506" className="fill-muted font-mono" fontSize="22">before feb 2025</text>
      <rect x="330" y="416" width="237.5" height="38" fill="url(#yc-h)" className="stroke-foreground" strokeWidth="1.5"/>
      <text x="581.5" y="444" className="fill-foreground font-mono" fontSize="26">12.5%</text>
      <rect x="330" y="472" width="71.2" height="38" className="fill-blue"/>
      <text x="423.2" y="501" className="fill-foreground font-mono" fontSize="26">3.75%</text>
      <text x="533.2" y="501" className="fill-blue font-mono" fontSize="26">down 70%</text>
      <line x1="389.7" x2="389.7" y1="76" y2="560" className="stroke-foreground" strokeWidth="2" strokeDasharray="5 5"/>
      <text x="401.7" y="590" className="fill-muted font-mono" fontSize="22">brokerage idle cash, 3.14%</text>
      <text x="1200" y="636" className="fill-muted font-mono" fontSize="22" textAnchor="end">source: coindesk, 7 april 2026; cryptopolitan, feb 2025</text>
    </svg>
  );
}

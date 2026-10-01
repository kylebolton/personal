/**
 * Generates every favicon/app-icon asset from one design: a plain black serif "k"
 * (an outlined Georgia Bold glyph, so no font is needed) on a transparent background
 * (white behind the full-bleed Apple/Android icons). Run with `node scripts/generate-favicon.js`.
 */
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const publicDir = path.join(__dirname, "../public");
const iconsDir = path.join(publicDir, "icons");

const TILE = "#ffffff";
const INK = "#000000";

// Georgia Bold "k" outlined on the 64-unit grid, so every output is font-independent.
const K_PATH =
  "M43.94 47.22L43.94 49L32.44 49Q30.32 45.26 28.56 42.66Q26.80 40.06 25.24 37.84L23.78 39.09L23.78 44.41Q23.78 45.29 24.03 45.85Q24.29 46.41 25.02 46.68Q25.46 46.88 26.05 47.02Q26.63 47.17 27.22 47.22L27.22 49L12.11 49L12.11 47.22Q12.72 47.17 13.33 47.08Q13.94 47 14.40 46.85Q15.18 46.58 15.46 46.02Q15.75 45.46 15.75 44.56L15.75 17.33Q15.75 16.53 15.39 15.66Q15.04 14.80 14.35 14.36Q13.89 14.06 12.96 13.87Q12.03 13.67 11.28 13.62L11.28 11.84L23.41 11.21L23.78 11.60L23.78 36.79Q25.58 35.18 27.84 33.06Q30.10 30.93 31.47 29.54Q32.27 28.71 32.36 28.28Q32.44 27.86 32.44 27.76Q32.44 27.32 31.68 27.03Q30.91 26.73 29.37 26.51L29.37 24.78L41.77 24.78L41.77 26.47Q39.33 27.15 38.05 27.75Q36.77 28.35 35.25 29.35Q34.25 30.01 33.31 30.73Q32.37 31.45 31.15 32.52Q33.54 35.99 35.57 38.94Q37.60 41.90 39.82 45.19Q40.57 46.34 41.70 46.73Q42.82 47.12 43.94 47.22Z";

// Geometry on a 64-unit grid, shared by the SVG and the canvas renderer.

/** Minimal SVG path tracer for absolute M, L, Q and Z commands (node-canvas has no Path2D). */
function tracePath(ctx, d) {
  const tokens = d.match(/[MLQZ]|-?\d*\.?\d+/g);
  let i = 0;
  const num = () => parseFloat(tokens[i++]);
  let cmd;
  while (i < tokens.length) {
    if (/[MLQZ]/.test(tokens[i])) cmd = tokens[i++];
    if (cmd === "M") ctx.moveTo(num(), num());
    else if (cmd === "L") ctx.lineTo(num(), num());
    else if (cmd === "Q") ctx.quadraticCurveTo(num(), num(), num(), num());
    else if (cmd === "Z") ctx.closePath();
  }
}

function renderPng(size, { rounded }) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const u = size / 64;

  // Favicon-sized icons are transparent; full-bleed app icons keep a white fill because iOS/Android would render transparency as black.
  if (!rounded) {
    ctx.fillStyle = TILE;
    ctx.fillRect(0, 0, size, size);
  }

  ctx.fillStyle = INK;
  ctx.save();
  ctx.scale(u, u);
  ctx.beginPath();
  tracePath(ctx, K_PATH);
  ctx.fill();
  ctx.restore();


  return canvas.toBuffer("image/png");
}

/** Wrap PNG buffers in an ICO container (PNG-in-ICO is supported by all current browsers). */
function toIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + entries.length * 16;
  const dir = entries.map(({ size, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size === 256 ? 0 : size, 0);
    e.writeUInt8(size === 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });
  return Buffer.concat([header, ...dir, ...entries.map(e => e.buf)]);
}

const svg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="${K_PATH}" fill="${INK}"/></svg>`;

fs.mkdirSync(iconsDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, "icon.svg"), svg());

// Monochrome mask for Safari pinned tabs.
fs.writeFileSync(
  path.join(iconsDir, "safari-pinned-tab.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="${K_PATH}" fill="#000"/></svg>`,
);

const rounded = [16, 32, 48, 64, 128, 256];
const full = { "apple-touch-icon.png": 180, "android-chrome-192x192.png": 192, "android-chrome-512x512.png": 512 };

const pngs = {};
for (const s of rounded) pngs[s] = renderPng(s, { rounded: true });
for (const [name, s] of Object.entries(full)) fs.writeFileSync(path.join(iconsDir, name), renderPng(s, { rounded: false }));

// Legacy named sizes kept in sync so nothing still points at the old grey circle.
for (const s of rounded) fs.writeFileSync(path.join(iconsDir, `icon-${s}x${s}.png`), pngs[s]);
fs.writeFileSync(path.join(iconsDir, "icon-192x192.png"), renderPng(192, { rounded: true }));
fs.writeFileSync(path.join(iconsDir, "icon-512x512.png"), renderPng(512, { rounded: true }));
fs.writeFileSync(path.join(iconsDir, "favicon-16x16.png"), pngs[16]);
fs.writeFileSync(path.join(iconsDir, "favicon-32x32.png"), pngs[32]);

const ico = toIco([16, 32, 48].map(size => ({ size, buf: pngs[size] })));
fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
fs.writeFileSync(path.join(__dirname, "../src/app/favicon.ico"), ico);

console.log("favicon assets written");

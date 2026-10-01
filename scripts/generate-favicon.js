/**
 * Generates every favicon/app-icon asset from one design: a cobalt tile with a
 * white serif "k" and a light-blue full stop (the same full stop as the site's
 * name). Run with `node scripts/generate-favicon.js`.
 */
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const publicDir = path.join(__dirname, "../public");
const iconsDir = path.join(publicDir, "icons");

const COBALT = "#2d5bff";
const DOT = "#9fd6ff";
const FONT = 'Georgia, "Times New Roman", serif';

// Geometry on a 64-unit grid, shared by the SVG and the canvas renderer.
const G = { k: { x: 27, y: 49, size: 50 }, dot: { x: 50, y: 45.5, r: 3.6 }, radius: 14 };

function renderPng(size, { rounded }) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const u = size / 64;

  ctx.fillStyle = COBALT;
  if (rounded) {
    const r = G.radius * u;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(size, 0, size, size, r);
    ctx.arcTo(size, size, 0, size, r);
    ctx.arcTo(0, size, 0, 0, r);
    ctx.arcTo(0, 0, size, 0, r);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, size, size);
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${G.k.size * u}px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("k", G.k.x * u, G.k.y * u);

  ctx.fillStyle = DOT;
  ctx.beginPath();
  ctx.arc(G.dot.x * u, G.dot.y * u, G.dot.r * u, 0, Math.PI * 2);
  ctx.fill();

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

const svg = fill => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${G.radius}" fill="${fill}"/><text x="${G.k.x}" y="${G.k.y}" text-anchor="middle" font-family='${FONT}' font-size="${G.k.size}" font-weight="700" fill="#fff">k</text><circle cx="${G.dot.x}" cy="${G.dot.y}" r="${G.dot.r}" fill="${DOT}"/></svg>`;

fs.mkdirSync(iconsDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, "icon.svg"), svg(COBALT));

// Monochrome mask for Safari pinned tabs.
fs.writeFileSync(
  path.join(iconsDir, "safari-pinned-tab.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><text x="${G.k.x}" y="${G.k.y}" text-anchor="middle" font-family='${FONT}' font-size="${G.k.size}" font-weight="700" fill="#000">k</text><circle cx="${G.dot.x}" cy="${G.dot.y}" r="${G.dot.r}" fill="#000"/></svg>`,
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

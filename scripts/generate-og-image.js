const fs = require("fs");
const path = require("path");
const { createCanvas, registerFont } = require("canvas");

// Site fonts, so the card matches the homepage heading
const fontsDir = path.join(__dirname, "fonts");
registerFont(path.join(fontsDir, "Newsreader-Light.ttf"), { family: "Newsreader", weight: "300" });
registerFont(path.join(fontsDir, "IBMPlexMono-Regular.ttf"), { family: "IBM Plex Mono" });

// Colours from src/app/globals.css
const background = "#ffffff";
const foreground = "#0a1030";
const muted = "#5d6a85";
const hairline = "rgba(10, 16, 48, 0.16)";
const sun = "#1aa0ff";

const width = 1200;
const height = 630;
const cx = width / 2;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

ctx.fillStyle = background;
ctx.fillRect(0, 0, width, height);

// Google crops the card to a centred square for its result thumbnail,
// so everything sits inside the middle ~600px.
ctx.textBaseline = "alphabetic";

// Kicker
ctx.font = "26px 'IBM Plex Mono'";
ctx.fillStyle = muted;
ctx.textAlign = "center";
ctx.fillText("kylebolton.me", cx, 100);

// Name, stacked so it stays big in a small square
ctx.font = "300 168px Newsreader";
ctx.fillStyle = foreground;
ctx.fillText("kyle", cx, 262);

const bolton = "bolton";
const dot = ".";
const boltonWidth = ctx.measureText(bolton).width;
const dotWidth = ctx.measureText(dot).width;
const left = cx - (boltonWidth + dotWidth) / 2;
const nameBaseline = 430;

ctx.textAlign = "left";
ctx.fillText(bolton, left, nameBaseline);
ctx.fillStyle = sun;
ctx.fillText(dot, left + boltonWidth, nameBaseline);

// Hairline underline under "bolton", as on the homepage
ctx.fillStyle = hairline;
ctx.fillRect(left, nameBaseline + 22, boltonWidth, 3);

// Role
ctx.font = "25px 'IBM Plex Mono'";
ctx.fillStyle = muted;
ctx.textAlign = "center";
ctx.fillText("senior engineer · credit & lending", cx, 545);

fs.writeFileSync(path.join(__dirname, "../public/og-image.png"), canvas.toBuffer("image/png"));

console.log("OG image generated");

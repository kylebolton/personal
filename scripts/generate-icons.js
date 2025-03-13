const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

// Create directories if they don't exist
const publicDir = path.join(__dirname, "../public");
const iconsDir = path.join(publicDir, "icons");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Function to create a simple grey circle icon
function createSimpleIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Clear background
  ctx.fillStyle = "transparent";
  ctx.clearRect(0, 0, size, size);

  // Draw a grey circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#333333";
  ctx.fill();

  // Add initials "KB" in the center
  const fontSize = size * 0.4;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("KB", size / 2, size / 2);

  return canvas;
}

// Generate icons of different sizes
const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

// Generate PNG icons
sizes.forEach(size => {
  const canvas = createSimpleIcon(size);
  const buffer = canvas.toBuffer("image/png");

  // Save specific sizes needed for favicon
  if (size === 16) {
    fs.writeFileSync(path.join(iconsDir, "favicon-16x16.png"), buffer);
  } else if (size === 32) {
    fs.writeFileSync(path.join(iconsDir, "favicon-32x32.png"), buffer);
  } else if (size === 180) {
    fs.writeFileSync(path.join(iconsDir, "apple-touch-icon.png"), buffer);
  } else if (size === 192) {
    fs.writeFileSync(path.join(iconsDir, "android-chrome-192x192.png"), buffer);
  } else if (size === 512) {
    fs.writeFileSync(path.join(iconsDir, "android-chrome-512x512.png"), buffer);
  }

  // Save all sizes for reference
  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), buffer);
});

// Create a special 180x180 icon for Apple touch icon
const appleIcon = createSimpleIcon(180);
fs.writeFileSync(
  path.join(iconsDir, "apple-touch-icon.png"),
  appleIcon.toBuffer("image/png")
);

// Create OG image (1200x630)
const ogCanvas = createCanvas(1200, 630);
const ogCtx = ogCanvas.getContext("2d");

// Background
ogCtx.fillStyle = "#111111";
ogCtx.fillRect(0, 0, 1200, 630);

// Add name
ogCtx.font = "bold 80px Arial";
ogCtx.textAlign = "center";
ogCtx.textBaseline = "middle";
ogCtx.fillStyle = "white";
ogCtx.fillText("Kyle Bolton", 600, 250);

// Add description
ogCtx.font = "40px Arial";
ogCtx.fillText("UI Engineer & Fintech Enthusiast", 600, 350);

// Save OG image
fs.writeFileSync(
  path.join(publicDir, "og-image.png"),
  ogCanvas.toBuffer("image/png")
);

// Create a site manifest
const manifest = {
  name: "Kyle Bolton",
  short_name: "KB",
  icons: [
    {
      src: "/icons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  theme_color: "#333333",
  background_color: "#333333",
  display: "standalone",
};

fs.writeFileSync(
  path.join(publicDir, "site.webmanifest"),
  JSON.stringify(manifest, null, 2)
);

// Create SVG for Safari pinned tab
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="256" fill="#333333"/>
  <text x="256" y="256" font-family="Arial" font-size="200" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF">KB</text>
</svg>`;

fs.writeFileSync(path.join(iconsDir, "safari-pinned-tab.svg"), svgContent);

console.log("All icons and images generated successfully!");

import fs from "fs";
import sharp from "sharp";

async function makeIcon(size) {
  const r = Math.round(size * 0.2);
  const pad = Math.round(size / 16);
  const svg = `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}"
      rx="${r}" ry="${r}" fill="#f56616"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Helvetica, sans-serif" font-weight="700"
      font-size="${Math.round(size * 0.48)}" fill="#ffffff">K</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

const icon512 = await makeIcon(512);
const icon180 = await makeIcon(180);
const icon32 = await makeIcon(32);

fs.mkdirSync("public", { recursive: true });
fs.mkdirSync("src/app", { recursive: true });

fs.writeFileSync("public/icon.png", icon512);
fs.writeFileSync("public/apple-touch-icon.png", icon180);
fs.writeFileSync("src/app/icon.png", icon512);
fs.writeFileSync("src/app/apple-icon.png", icon180);

// 32px PNG saved as favicon (works in modern browsers + Next)
await sharp(icon32).resize(32, 32).toFile("public/favicon.ico");
fs.copyFileSync("public/favicon.ico", "src/app/favicon.ico");

console.log("ok", {
  icon: fs.statSync("public/icon.png").size,
  apple: fs.statSync("public/apple-touch-icon.png").size,
  favicon: fs.statSync("public/favicon.ico").size,
});

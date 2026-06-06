import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fef3c7"/>
      <stop offset="100%" style="stop-color:#fde68a"/>
    </linearGradient>
  </defs>
  
  <circle cx="256" cy="256" r="240" fill="url(#bg)" stroke="#fbbf24" stroke-width="8"/>
  
  <rect x="200" y="150" width="112" height="160" rx="20" fill="#f472b6"/>
  <rect x="220" y="120" width="72" height="40" rx="8" fill="#ec4899"/>
  <rect x="240" y="100" width="32" height="30" fill="#db2777"/>
  
  <rect x="220" y="180" width="15" height="8" rx="2" fill="white"/>
  <rect x="220" y="200" width="15" height="8" rx="2" fill="white"/>
  <rect x="220" y="220" width="15" height="8" rx="2" fill="white"/>
  <rect x="220" y="240" width="15" height="8" rx="2" fill="white"/>
  <rect x="220" y="260" width="15" height="8" rx="2" fill="white"/>
  
  <circle cx="230" cy="380" r="25" fill="#1f2937"/>
  <circle cx="282" cy="380" r="25" fill="#1f2937"/>
  <circle cx="238" cy="375" r="8" fill="white"/>
  <circle cx="290" cy="375" r="8" fill="white"/>
  
  <path d="M 236 420 Q 256 450 276 420" stroke="#1f2937" stroke-width="6" fill="none" stroke-linecap="round"/>
  
  <polygon points="120,180 125,195 140,195 128,205 133,220 120,210 107,220 112,205 100,195 115,195" fill="#fbbf24"/>
  <polygon points="392,220 395,230 405,230 397,237 400,247 392,240 384,247 387,237 379,230 389,230" fill="#fbbf24"/>
  <polygon points="400,320 403,330 413,330 405,337 408,347 400,340 392,347 395,337 387,330 397,330" fill="#fbbf24"/>
</svg>`;

async function generateIcons() {
  const publicDir = 'public';
  
  // 生成192x192图标
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'pwa-192x192.png'));
  console.log('✓ 生成 pwa-192x192.png');
  
  // 生成512x512图标
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'pwa-512x512.png'));
  console.log('✓ 生成 pwa-512x512.png');
  
  // 生成apple-touch-icon
  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ 生成 apple-touch-icon.png');
  
  console.log('\n所有图标生成完成！');
}

generateIcons().catch(console.error);

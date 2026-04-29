import puppeteer from 'file:///C:/Users/ollie/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const width = parseInt(process.argv[4]) || 1440;
const height = parseInt(process.argv[5]) || 900;

const dir = './temporary screenshots';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`))) n++;
const filename = path.join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({
  executablePath: 'c:/Users/ollie/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(url, { waitUntil: 'networkidle2' });
const fullPage = process.argv[6] !== 'viewport';
const scrollY = parseInt(process.argv[7]) || 0;

// Trigger scroll-based animations (IntersectionObserver, lazy-load) by scrolling
// the full document height in small steps, then waiting for transitions to settle.
await page.evaluate(async () => {
  const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 80));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise(r => setTimeout(r, 300));
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 200));
});

if (scrollY) await page.evaluate(y => window.scrollTo(0, y), scrollY);

// Settle time for any remaining transitions (fade-up is 0.75s)
await new Promise(r => setTimeout(r, 900));

await page.screenshot({ path: filename, fullPage });
await browser.close();

console.log(`Screenshot saved: ${filename}`);

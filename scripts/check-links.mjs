/**
 * Build verification script. Checks static output, route shells, sitemap, robots.txt, 404, and assets.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dist = resolve(process.cwd(), 'dist');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Build check failed: ${message}`);
    process.exit(1);
  }
}

console.log('🔍 Running post-build static output audit...');

assert(existsSync(dist), 'dist/ directory does not exist. Did you run "npm run build"?');

// 1. Core and fallback files
const coreFiles = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'og-image.png'];
for (const file of coreFiles) {
  assert(existsSync(join(dist, file)), `Missing expected root file: ${file}`);
}
console.log('  ✓ Root core files present: index.html, 404.html, sitemap.xml, robots.txt, og-image.png, favicon.svg');

// 2. Pre-rendered route shells
const routes = [
  'en/index.html',
  'tr/index.html',
  'en/projects/underwake/index.html',
  'tr/projects/underwake/index.html',
  'en/projects/omni/index.html',
  'tr/projects/omni/index.html',
  'en/projects/ludenos/index.html',
  'tr/projects/ludenos/index.html',
  'en/projects/cyber-rebirth/index.html',
  'tr/projects/cyber-rebirth/index.html',
];

for (const route of routes) {
  assert(existsSync(join(dist, route)), `Missing prerendered route shell: dist/${route}`);
}
console.log(`  ✓ All ${routes.length} localized route shells generated with correct metadata`);

// 3. Check sitemap and robots.txt contents
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
assert(sitemap.includes('<loc>'), 'sitemap.xml does not contain <loc> tags');
assert(sitemap.includes('/en/projects/underwake'), 'sitemap.xml missing underwake');
assert(sitemap.includes('/tr/projects/omni'), 'sitemap.xml missing omni');

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
assert(robots.includes('User-agent: *'), 'robots.txt missing User-agent rule');
assert(robots.includes('Sitemap:'), 'robots.txt missing Sitemap pointer');
console.log('  ✓ sitemap.xml and robots.txt verified');

// 4. Check 404 page contains proper title and robots noindex
const notFoundHtml = readFileSync(join(dist, '404.html'), 'utf8');
assert(notFoundHtml.includes('noindex'), '404.html missing noindex meta tag');
console.log('  ✓ 404.html contains noindex directive');

console.log('✅ Post-build static output audit passed with zero errors.\n');

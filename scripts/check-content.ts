/**
 * Automated content and data integrity validation.
 * Ensures project order, verified technologies, asset existence, and bilingual completeness.
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects, getProjectsOrdered } from '../src/data/projects.ts';
import { expertise } from '../src/data/expertise.ts';
import { workflows } from '../src/data/workflows.ts';
import { experience, education } from '../src/data/experience.ts';
import { site } from '../src/data/site.ts';
import { LANGS } from '../src/data/types.ts';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Content check failed: ${message}`);
    process.exit(1);
  }
}

console.log('🔍 Running automated content and integrity audit...');

// 1. Verify project count and exact order
const ordered = getProjectsOrdered();
assert(ordered.length === 4, `Expected exactly 4 projects, found ${ordered.length}`);
const expectedSlugs = ['underwake', 'omni', 'ludenos', 'cyber-rebirth'];
ordered.forEach((p, idx) => {
  assert(
    p.slug === expectedSlugs[idx],
    `Project #${idx + 1} must be "${expectedSlugs[idx]}", found "${p.slug}" (featuredOrder: ${p.featuredOrder})`,
  );
});
console.log('  ✓ Project order verified: Underwake (1) → Omni (2) → LudenOS (3) → Cyber Rebirth (4)');

// 2. Verify all referenced media items exist on disk
function verifyMediaId(mediaId: string, context: string) {
  const possiblePaths = [
    resolve('src/assets/projects', `${mediaId}.webp`),
    resolve('src/assets/projects', `${mediaId}.png`),
    resolve('src/assets/projects', `${mediaId}-800.webp`),
    resolve('src/assets/projects', `${mediaId}-1600.webp`),
    resolve('src/assets', `${mediaId}.webp`),
    resolve('src/assets', `${mediaId}.png`),
    resolve('src/assets', `${mediaId}-800.webp`),
    resolve('src/assets', `${mediaId}-1600.webp`),
  ];
  const exists = possiblePaths.some((p) => existsSync(p));
  assert(exists, `${context}: missing asset file for mediaId "${mediaId}" on disk`);
}

let mediaCount = 0;
for (const p of projects) {
  if (p.cover.media) {
    for (const mId of p.cover.media) {
      verifyMediaId(mId, `Project "${p.id}" cover`);
    }
  }
  for (const g of p.gallery) {
    verifyMediaId(g.media, `Project "${p.id}" gallery`);
    for (const l of LANGS) {
      assert(Boolean(g.alt[l]), `Project "${p.id}" gallery item "${g.media}" is missing alt text for [${l}]`);
    }
    mediaCount++;
  }
}
assert(existsSync(resolve('src/assets/profile/deniz.webp')), 'Profile portrait asset is missing on disk');
console.log(`  ✓ All ${mediaCount} project gallery assets and profile portrait verified on disk`);

// 3. Verify bilingual completeness for all project details
for (const p of projects) {
  for (const l of LANGS) {
    assert(Boolean(p.title), `Project "${p.id}" missing title`);
    assert(Boolean(p.category[l]), `Project "${p.id}" missing category for [${l}]`);
    assert(Boolean(p.summary[l]), `Project "${p.id}" missing summary for [${l}]`);
    const d = p.detail[l];
    assert(Boolean(d.tagline), `Project "${p.id}" missing tagline for [${l}]`);
    assert(d.overview.length > 0, `Project "${p.id}" missing overview for [${l}]`);
  }
}
console.log('  ✓ Bilingual project descriptions, categories, and overviews verified');

// 4. Verify expertise, workflows, experience and education
assert(expertise.length >= 4, 'Expected at least 4 expertise categories');
for (const cat of expertise) {
  for (const l of LANGS) {
    assert(Boolean(cat.title[l]), `Expertise category "${cat.id}" missing title for [${l}]`);
    assert(Boolean(cat.description[l]), `Expertise category "${cat.id}" missing description for [${l}]`);
  }
  assert(cat.skills.length > 0, `Expertise category "${cat.id}" has no skills`);
}

assert(workflows.length === 4, `Expected 4 workflows, found ${workflows.length}`);
for (const wf of workflows) {
  for (const l of LANGS) {
    assert(Boolean(wf.title[l]), `Workflow "${wf.id}" missing title for [${l}]`);
    assert(Boolean(wf.body[l]), `Workflow "${wf.id}" missing body for [${l}]`);
  }
}

assert(experience.length >= 3, 'Expected at least 3 experience entries');
for (const exp of experience) {
  for (const l of LANGS) {
    assert(Boolean(exp.title[l]), `Experience "${exp.id}" missing title for [${l}]`);
    assert(Boolean(exp.description[l]), `Experience "${exp.id}" missing description for [${l}]`);
  }
}

for (const l of LANGS) {
  assert(Boolean(education.institution[l]), `Education missing institution for [${l}]`);
  assert(Boolean(education.program[l]), `Education missing program for [${l}]`);
  assert(Boolean(education.status[l]), `Education missing status for [${l}]`);
}
console.log('  ✓ Expertise, workflows, experience, and education verified');

// 5. Verify privacy safety: no raw phone numbers or street addresses in public data
const serialized = JSON.stringify({ site, projects, expertise, workflows, experience });
const bannedPatterns = [/0531\s*352\s*6274/i, /Mimozal[ıi]\s*Sk/i, /34970/i];
for (const pattern of bannedPatterns) {
  assert(!pattern.test(serialized), `Data contains unredacted private contact info matching: ${pattern}`);
}
console.log('  ✓ Contact privacy safety check passed: phone number and street address are not leaked');

console.log('✅ All content and data integrity checks passed successfully.\n');

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const manifestPath = join(dist, 'manifest.json');
const swTemplatePath = join(__dirname, '..', 'public', 'sw.js');
const swOutPath = join(dist, 'sw.js');

// Netlify exposes COMMIT_REF; fall back to a timestamp locally
const BUILD_ID = process.env.COMMIT_REF || `${Date.now()}`;

// Collect assets to precache from Vite manifest
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const assets = new Set(['/index.html']); // SPA shell
Object.values(manifest).forEach((entry) => {
  assets.add(`/${entry.file}`);
  (entry.css || []).forEach((c) => assets.add(`/${c}`));
  (entry.assets || []).forEach((a) => assets.add(`/${a}`));
});

// Read template and replace placeholders
const template = readFileSync(swTemplatePath, 'utf8');
const finalSW = template
  .replace('__BUILD_ID__', BUILD_ID)
  .replace('__ASSET_LIST__', JSON.stringify([...assets]));

writeFileSync(swOutPath, finalSW);
console.log(`SW written: ${swOutPath}`);

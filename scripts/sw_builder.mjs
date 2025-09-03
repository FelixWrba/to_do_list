import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.time('- done in');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const templatePath = path.join(__dirname, '..', 'public', 'sw.js'); // template from above
const outPath = path.join(dist, 'sw.js');
const versionFilePath = path.join(dist, 'v.txt');

// Netlify provides COMMIT_REF; fallback to timestamp locally
const BUILD_ID = process.env.COMMIT_REF || `${Date.now()}`;

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? await walk(res) : res;
  }));
  return Array.prototype.concat(...files);
}

(async () => {
  try {
    // Ensure dist exists
    await fs.access(dist);

    // Get every file in dist
    const filePaths = await walk(dist);

    // Convert to web paths and filter
    const assets = filePaths
      .map(fp => path.relative(dist, fp).split(path.sep).join('/')) // normalize to forward slashes
      .filter(Boolean)
      // exclude sw.js
      .filter(p => p !== 'sw.js')
      // remove undefined(s)
      .filter(p => p && p !== 'undefined')
      // add start slash
      .map(p => '/' + p);

    // make sure assets contains index.html
    if (!assets.includes('/index.html')) assets.unshift('/index.html');

    const template = await fs.readFile(templatePath, 'utf8');

    const final = template
      .replace(/__BUILD_ID__/g, BUILD_ID)
      .replace(/__ASSET_LIST__/, JSON.stringify(assets, null, 2));

    await fs.writeFile(outPath, final, 'utf8');
    await fs.writeFile(versionFilePath, 'v-' + BUILD_ID, 'utf8');

    console.log(`Built ${outPath}:\n- added ${assets.length} assets to cache\n- BUILD_ID: ${BUILD_ID}`);
    console.timeEnd('- done in');
  } catch (err) {
    console.error('Failed to build sw.js:', err);
    process.exit(1);
  }
})();

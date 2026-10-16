import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const assets = {
  'home-map.webp': { minBytes: 400_000, sha256: '08383fadef2541c435186604792a353ef549fb8aa3e5832f65ca8bfbc2671cfc' },
  'traveler.webp': { minBytes: 200_000, sha256: 'ca18c191aa87dde0f10b8d66ff6f8093ba674191a498ae6cb05fc04e04ddc613' },
  'sidebar-night.webp': { minBytes: 80_000, sha256: 'caf6bd6f64dd1969523ce4440ffcbb823dd660c5075d20251b93f3d2ad025367' },
  'backgrounds/traveler-scene.webp': { minBytes: 70_000, gitBlobSha: 'ab4a5aca1ea8bbd984a9dee2464577f76082cfb9' },
};
let errors = 0;
for (const [file, expected] of Object.entries(assets)) {
  const path = new URL('../frontend/public/art/' + file, import.meta.url);
  try {
    const data = readFileSync(path);
    const digest = createHash('sha256').update(data).digest('hex');
    const isWebP = data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP';
    const gitBlobHash = createHash('sha1').update('blob ' + data.length).update(Buffer.from([0])).update(data).digest('hex');
    const digestMatches = expected.sha256 ? expected.sha256 === digest : expected.gitBlobSha === gitBlobHash;
    if (data.length < expected.minBytes || !digestMatches || !isWebP) {
      console.error('INVALID', file, { bytes: data.length, digest, isWebP });
      errors += 1;
    } else {
      console.log('OK', file, data.length + ' bytes', digest);
    }
  } catch (error) {
    console.error('MISSING', file, String(error));
    errors += 1;
  }
}
if (errors) process.exitCode = 1;

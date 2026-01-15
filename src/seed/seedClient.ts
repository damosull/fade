import fs from 'node:fs';
import path from 'node:path';
import type { SeedData } from './types';

export function getSeed(): SeedData {
  if (process.env.E2E_SEED_JSON) {
    try {
      const data = JSON.parse(process.env.E2E_SEED_JSON) as SeedData;
      console.log('[seedClient] Using seed from E2E_SEED_JSON');
      return data;
    } catch {
      throw new Error('[seedClient] Invalid E2E_SEED_JSON');
    }
  }

  const project = process.env.PROJECT_NAME || 'chromium';
  const cacheDir = process.env.SEED_CACHE_DIR || path.join(process.cwd(), '.seed-cache', project);
  const seedsPath = path.join(cacheDir, 'seeds.json');

  if (!fs.existsSync(seedsPath)) {
    throw new Error(`[seedClient] No seeds found at ${seedsPath}. Run 'npm run seed:local' first.`);
  }

  const parsed = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));
  const data = parsed?.data ?? parsed;

  if (!data) throw new Error('[seedClient] Invalid seeds.json — missing data key.');
  console.log(`[seedClient] Loaded seed from ${seedsPath}`);
  return data as SeedData;
}

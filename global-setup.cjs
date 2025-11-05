require('tsx/cjs');
const path = require('node:path');
const fs = require('node:fs');
const { chromium, firefox, webkit } = require('playwright');
const { navigateToHome } = require('./src/seed/auth.ts');

const bmap = { chromium, firefox, webkit };
const { baseURL } = require('./playwright.config');
const runId = process.env.CI_RUN_ID || 'local';
const authDir = path.resolve(`.auth/${runId}`);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function looksEmptyStorage(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return (!data.cookies?.length) && (!data.origins?.length);
  } catch {
    return true;
  }
}

module.exports = async function globalSetup() {
  ensureDir(authDir);

  const isCI = !!process.env.CI;
  const project = isCI
    ? (process.env.PROJECT_NAME || process.env.TEST_PROJECT || process.env.PW_PROJECT || 'chromium')
    : 'chromium';

  const currentFile = isCI
    ? path.resolve(authDir, `storageState-${project}.json`)
    : path.resolve(authDir, 'storageState.json');

  const browserType = isCI ? bmap[project] : bmap['chromium'];

  if (!process.env.SUPER_ADMIN_USER || !process.env.SUPER_ADMIN_PASSWORD) {
    throw new Error('[global-setup] SUPER_ADMIN_USER and SUPER_ADMIN_PASSWORD must be set.');
  }

  if (looksEmptyStorage(currentFile)) {
    console.log(`[global-setup] No valid auth found — logging in...`);
    const browser = await browserType.launch({ headless: true });
    const ctx = await browser.newContext({
      baseURL,
      viewport: { width: 1920, height: 1080 },
    });
    const page = await ctx.newPage();

    let ok = false;
    try {
      for (let attempt = 1; attempt <= 2; attempt++) {
        ok = await navigateToHome(page, project, { quiet: true });
        if (ok) break;
        console.log(`[global-setup] Retry ${attempt} after 3s`);
        await new Promise(r => global.setTimeout(r, 3000));
      }

      if (!ok) throw new Error('Login failed for ' + project);

      await ctx.storageState({ path: currentFile });
      console.log(`[global-setup] Saved storage state -> ${currentFile}`);
    } finally {
      await ctx.close();
      await browser.close();
    }
  } else {
    console.log(`[global-setup] Using existing auth at ${currentFile} — skipping login.`);
  }

  console.log('[global-setup] Done');
};
import { config as loadEnv } from 'dotenv';
import { type Page } from '@playwright/test';
import path from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { SigninPage } from '../../pages/signin';
import { HeaderAndHamburgerPage } from '../../pages/headerAndHamburger';

if (!process.env.CI) {
  loadEnv();
  console.log('[env] Loaded .env for local execution');
}

const SUPER_ADMIN_USER = process.env.SUPER_ADMIN_USER;
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

if (!SUPER_ADMIN_USER || !SUPER_ADMIN_PASSWORD) {
  throw new Error('[auth] SUPER_ADMIN_USER and SUPER_ADMIN_PASSWORD must be set.');
}

export function storagePath(projectName: string) {
  const runId = process.env.CI_RUN_ID || 'local';
  const base = path.resolve(`.auth/${runId}`);
  return process.env.CI
    ? path.join(base, `storageState-${projectName}.json`)
    : path.join(base, 'storageState.json');
}

function ensureDirFor(file: string) {
  const dir = path.dirname(file);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

export async function ensureStorageState(page: Page, projectName: string) {
  const file = storagePath(projectName);
  ensureDirFor(file);
  if (!existsSync(file)) {
    await page.context().storageState({ path: file });
    console.log(`[auth] Saved storage state: ${file}`);
  }
}

function getBaseURL(projectName: string) {
  const raw = require('../../playwright.config');
  const cfg = raw?.default ?? raw;

  let url: unknown = cfg?.use?.baseURL;

  if ((!url || typeof url !== 'string') && Array.isArray(cfg?.projects)) {
    const proj = cfg.projects.find((p: any) => p.name === projectName);
    url = proj?.use?.baseURL;
  }

  if (typeof url !== 'string' || !url) {
    throw new Error(`[auth] baseURL not found in playwright.config for project "${projectName}".`);
  }
  return url;
}

export async function navigateToHome(
  page: Page,
  projectName = 'chromium',
  opts?: { quiet?: boolean }
) {
  const quiet = opts?.quiet ?? !!process.env.CI;
  const baseURL = getBaseURL(projectName);

  try {
    await page.goto(new URL('/', baseURL).toString(), { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const header = new HeaderAndHamburgerPage(page);
    const isLoggedIn = await header.hamburgerMenu
      .waitFor({ state: 'visible', timeout: 2000 })
      .then(() => true)
      .catch(() => false);

    if (!isLoggedIn) {
      if (!quiet) console.log('[auth] Logging in...');
      const signin = new SigninPage(page);
      await signin.loginToFade(SUPER_ADMIN_USER!, SUPER_ADMIN_PASSWORD!);
      await header.hamburgerMenu.waitFor({ state: 'visible', timeout: 15000 });
      if (!quiet) console.log('[auth] ✅ Login successful.');
    } else if (!quiet) {
      console.log('[auth] ✅ Already logged in.');
    }

    await ensureStorageState(page, projectName);
    return true;
  } catch (error) {
    console.error('[auth] navigateToHome failed:', error);
    return false;
  }
}

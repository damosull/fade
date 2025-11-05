import { defineConfig, devices } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const runId = process.env.CI_RUN_ID ?? 'local';
const authDir = path.resolve(`.auth/${runId}`);
const localShared = path.join(authDir, 'storageState.json');
const perProject = (p: string) => path.join(authDir, `storageState-${p}.json`);

const isSeedRun = process.env.SEED_RUN === '1';

const storageFor = (p: string) =>
  process.env.CI
    ? fs.existsSync(perProject(p))
      ? perProject(p)
      : undefined
    : fs.existsSync(localShared)
      ? localShared
      : undefined;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Ignore seed tests unless it's a seed run */
  testIgnore: isSeedRun ? [] : ['tests/seed.spec.ts'],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  timeout: 60000,
  /* Time out increased to 60 seconds for each test */
  expect: { timeout: 60000 },
  /* Time out for each expect() call */
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['github'], // GH annotations on failures
        ['list'], // live progress in the Actions log
        ['html', { open: 'never' }],
      ]
    : [
        ['list'], // nice local progress
        ['html'],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://qa.fade.systems/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Capture video only for failed tests */
    video: 'retain-on-failure',
    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',
    /* Set viewport size */
    viewport: { width: 1920, height: 1080 },
  },
  globalSetup: require.resolve('./global-setup.cjs'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: storageFor('chromium'),
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: storageFor('firefox'),
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: storageFor('webkit'),
        viewport: { width: 1920, height: 1080 },
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

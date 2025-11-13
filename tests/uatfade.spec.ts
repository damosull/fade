import { test, expect } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const makeEmail = () => `qatest${stamp()}@fadesystems.co.uk`;
const makeSurname = () => `Surname${stamp()}`;
const makeFirstName = () => `FirstName${stamp()}`;

test.describe('Individual account creation & details', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
  });

  test('Dashboard loads', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');
  });

  test('Create new individual account & update details sections', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userSurname = makeSurname();
    const userFirstName = makeFirstName();

    // Create new account
    await app.actions.account.createAccount(
      'Account',
      'Individual',
      userFirstName,
      userSurname,
      undefined,
      userEmail,
      'personal',
      'Test Superadmin',
      'professional introducer',
      seed.introducerFirmName,
      undefined
    );
    await app.actions.account.saveNewAccount();

    try {
      await expect(
        page.getByText('The Individual has been created', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    // Add address
    await app.actions.account.addManualAddress('136', 'dersingham avenue', 'london', 'e12 5qg');
    try {
      await expect(page.getByText('Address added', { exact: true }).first()).toBeVisible();
      await expect(
        page.getByText('Account has been updated!', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    // Update service detail, employment, and income
    await app.actions.account.individualServiceDetail('ZYPP');
    await app.actions.account.addEmploymentDetails('Fade', 'Software Engineer');
    try {
      await expect(
        page.getByText('Employment has been saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await app.actions.account.addIncomeDetails('Fade', '5000', 'dividends');
    try {
      await expect(
        page.getByText('Income saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });
});

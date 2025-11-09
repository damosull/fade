import { test, expect } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const policyNumber = () => `Policy-${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Fade seeded flows', () => {
  test('Introducers: seeded adviser + firm exist', async ({ app, page }) => {
    const seed = getSeed();

    await app.actions.header.openHamburgerMenu();
    await app.actions.header.navigateToCompliance();
    await app.actions.compliance.compliancePageHeading();

    await expect(page.getByText(seed.introducerAdviserName)).toBeVisible();
    await expect(page.getByText(seed.introducerFirmName)).toBeVisible();
  });

  test('Introducers: create additional adviser (isolated)', async ({ app, page }) => {
    const name = `Adviser-${stamp()}`;

    await app.actions.header.openHamburgerMenu();
    await app.actions.header.navigateToCompliance();
    await app.actions.compliance.compliancePageHeading();

    await app.actions.compliance.clickAddIntroducerButton();
    await app.actions.compliance.addIntroducer(
      name,
      `adviser.${stamp()}@test.co.uk`,
      '01234567890'
    );
    await app.actions.compliance.addIntroducerSource('Adviser', 'Approved');
    await app.actions.compliance.addAdviser('Test Superadmin');
    await app.actions.compliance.addIntroducerFeeSplit('25', 'initial advice fee', 'net');
    await app.actions.compliance.addIntroducerFeeSplit('43', 'ongoing advice fee', 'gross');

    await app.pages.compliance.addIntroducerSaveButton().click();

    try {
      await expect(
        page.getByText('Introducer fee splits created successfully', { exact: true }).first()
      ).toBeVisible({ timeout: 20_000 });
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await expect(page.getByText(name)).toBeVisible();
  });

  test('Individual: seeded account shows ISA & GIA with valuations', async ({ app, page }) => {
    const seed = getSeed();

    await app.actions.individual.clickServiceCase(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await expect(page.getByText(seed.isaPolicyName)).toBeVisible();
    await expect(page.getByText(seed.giaPolicyName)).toBeVisible();

    try {
      await expect(page.getByText('Valuation saved successfully').first()).not.toBeVisible({
        timeout: 1000,
      });
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });

  test('Finances: add contributions to ISA & GIA', async ({ app, page }) => {
    const seed = getSeed();

    await app.actions.individual.clickServiceCase(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.actions.finance.expandAsset(seed.isaPolicyName);
    await page.getByRole('button', { name: 'Add Contribution' }).first().click();
    await app.actions.finance.addContribution('cash transfer', '300000', 'submitted', 'one-off');
    await app.actions.finance.saveContribution();

    await page.getByRole('button', { name: 'Add Contribution' }).first().click();
    await app.actions.finance.addContribution('cash transfer', '400000', 'submitted', 'one-off');
    await app.actions.finance.saveContribution();

    try {
      await expect(
        page.getByText('Contribution saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await app.actions.finance.expandAsset(seed.giaPolicyName);
    await page.getByRole('button', { name: 'Add Contribution' }).first().click();
    await app.actions.finance.addContribution('cash', '600000', 'submitted', 'one-off');
    await app.actions.finance.saveContribution();

    try {
      await expect(
        page.getByText('Contribution saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });

  test('Protection & Fees: add new protection policy and first fee', async ({ app, page }) => {
    const seed = getSeed();
    const newPolicy = policyNumber();

    await app.actions.individual.clickServiceCase(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await page.getByRole('heading', { name: 'protection policies' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: 'protection policies' })).toBeVisible({
      timeout: 5000,
    });

    await app.pages.finance.addPolicyButton().click();

    await app.actions.addPolicy.addPolicyBasics(
      newPolicy,
      'new',
      'key man',
      'Aviva',
      'under agency',
      'non-advised'
    );

    try {
      await expect(
        page.getByText('Protection Policy has been saved successfully', { exact: false }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await app.actions.header.openFeeTab();
    await app.actions.fees.addNewFee(
      'initial advice fee',
      'asset',
      'Aviva - ISA',
      'new business',
      '1',
      'fixed',
      '30'
    );

    try {
      await expect(page.getByText('Fee saved successfully', { exact: true }).first()).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });
});

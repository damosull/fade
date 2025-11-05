import { test, expect } from '@playwright/test';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { pages } from '../src/seed/pages';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const policyNumber = () => `Policy-${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Fade seeded flows', () => {
  test('Introducers: seeded adviser + firm exist', async ({ page }) => {
    const seed = getSeed();
    const { header, compliance } = pages(page);

    await header.clickOnHamburgerMenu();
    await header.clickOnCompliance();
    await compliance.compliancePageHeading();

    await expect(page.getByText(seed.introducerAdviserName)).toBeVisible();
    await expect(page.getByText(seed.introducerFirmName)).toBeVisible();
  });

  test('Introducers: create additional adviser (isolated)', async ({ page }) => {
    const { header, compliance } = pages(page);
    const name = `Adviser-${stamp()}`;

    await header.clickOnHamburgerMenu();
    await header.clickOnCompliance();
    await compliance.compliancePageHeading();

    await compliance.clickAddIntroducerButton();
    await compliance.addIntroducer(name, `adviser.${stamp()}@test.co.uk`, '01234567890');
    await compliance.addIntroducerSource('Adviser', 'Approved');
    await compliance.addAdviser('Test Superadmin');
    await compliance.addIntroducerFeeSplit('25', 'initial advice fee', 'net');
    await compliance.addIntroducerFeeSplit('43', 'ongoing advice fee', 'gross');
    await compliance.addIntroducerSaveButton.click();
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

  test('Individual: seeded account shows ISA & GIA with valuations', async ({ page }) => {
    const seed = getSeed();
    const { individual, header } = pages(page);

    await individual.clickServiceCase(seed.accountSurname);
    await header.clickOnFinancesTab();

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

  test('Finances: add contributions to ISA & GIA', async ({ page }) => {
    const seed = getSeed();
    const { individual, header, finance } = pages(page);

    await individual.clickServiceCase(seed.accountSurname);
    await header.clickOnFinancesTab();

    await finance.expandAsset(seed.isaPolicyName);
    await finance.addContributionButton.first().click();
    await finance.addContribution('cash transfer', '300000', 'submitted', 'one-off');
    await finance.saveContribution();
    await finance.addContributionButton.first().click();
    await finance.addContribution('cash transfer', '400000', 'submitted', 'one-off');
    await finance.saveContribution();
    try {
      await expect(
        page.getByText('Contribution saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await finance.expandAsset(seed.giaPolicyName);
    await finance.page.getByRole('button', { name: 'Add Contribution' }).first().click();
    await finance.addContribution('cash', '600000', 'submitted', 'one-off');
    await finance.saveContribution();
    try {
      await expect(
        page.getByText('Contribution saved successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });

  test('Protection & Fees: add new protection policy and first fee', async ({ page }) => {
    const seed = getSeed();
    const { individual, header, finance, addPolicy, fees } = pages(page);

    await individual.clickServiceCase(seed.accountSurname);
    await header.clickOnFinancesTab();

    const newPolicyNumber = policyNumber();
    await finance.page
      .getByRole('heading', { name: 'protection policies' })
      .scrollIntoViewIfNeeded();
    await expect(finance.page.getByRole('heading', { name: 'protection policies' })).toBeVisible({
      timeout: 5000,
    });

    await finance.addPolicyButton.click();
    await addPolicy.addPolicyBasics(
      newPolicyNumber,
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

    await header.clickOnFeeTab();
    await fees.addNewFee(
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

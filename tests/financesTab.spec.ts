import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const policyNumber = () => `Policy-${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  test.describe(`Finances Tab - ${accountType}`, () => {
    test('Verify adding Stocks & Shares ISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('ISA');
      await app.actions.assetModal.addAssetSubType('Stocks & Shares ISA');

      await app.actions.assetModal.addAssetPolicyDetails(
        isaPolicyName,
        provider,
        newPolicy,
        'in force'
      );

      await app.actions.assetModal.addPolicyStatusDate();
      await app.actions.assetModal.saveAsset();

      try {
        await expect(
          page.getByText('Asset has been saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
      await expect(assetRow).toContainText(provider);
      await expect(assetRow).toContainText('ISA');
      await expect(assetRow).toContainText(/stocks & shares isa/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });

    test('Verify adding Cash ISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('ISA');
      await app.actions.assetModal.addAssetSubType('Cash ISA');

      await app.actions.assetModal.addAssetPolicyDetails(
        isaPolicyName,
        provider,
        newPolicy,
        'in force'
      );

      await app.actions.assetModal.addPolicyStatusDate();
      await app.actions.assetModal.saveAsset();

      try {
        await expect(
          page.getByText('Asset has been saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
      await expect(assetRow).toContainText(provider);
      await expect(assetRow).toContainText('ISA');
      await expect(assetRow).toContainText(/cash ISA/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });
  });
});

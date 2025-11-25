import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

const policyNumber = () => `Policy-${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test('Finances Tab - Verify adding Stocks & Shares ISA', async ({ app }) => {
  let isaPolicyName = '';
  const ownerTag = `e2e-${stamp()}`;
  const seed = getSeed();
  const newPolicy = policyNumber();
  const provider = 'Aviva';

  isaPolicyName = `ISA-${ownerTag}`;

  await app.actions.header.searchForAccount(seed.accountSurname);
  await app.actions.header.openFinancesTab();
  await app.pages.finance.addAssetButton().click();
  await app.actions.assetModal.addAssetOverview('isa');
  await app.actions.assetModal.addAssetSubType('Stocks & Shares ISA');

  await app.actions.assetModal.addAssetPolicyDetails(
    isaPolicyName,
    provider,
    newPolicy,
    'in force'
  );

  await app.actions.assetModal.addPolicyStatusDate();
  await app.actions.assetModal.saveAsset();

  await expect(app.pages.finance.assetRowByName(isaPolicyName)).toContainText(provider);
  await expect(app.pages.finance.assetRowByName(isaPolicyName)).toContainText('ISA');
  await expect(app.pages.finance.assetRowByName(isaPolicyName)).toContainText(
    'stocks & shares ISA'
  );
  await expect(app.pages.finance.assetRowByName(isaPolicyName)).toContainText(newPolicy);
  await expect(app.pages.finance.assetRowByName(isaPolicyName)).toContainText('in force');
});

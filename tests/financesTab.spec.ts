import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const policyNumber = () => `Policy-${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Finances Tab', () => {
  test('Verify adding Stocks & Shares ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

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

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('stocks & shares ISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding Cash ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('isa');
    await app.actions.assetModal.addAssetSubType('Cash ISA');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('cash ISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding JISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('isa');
    await app.actions.assetModal.addAssetSubType('JISA');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('JISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding Help to Buy ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('isa');
    await app.actions.assetModal.addAssetSubType('Help to Buy ISA');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('help to buy ISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding Innovative Finance ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('isa');
    await app.actions.assetModal.addAssetSubType('Innovative Finance ISA');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('innovative finance ISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding Lifetime ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('isa');
    await app.actions.assetModal.addAssetSubType('Lifetime ISA');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('ISA');
    await expect(assetRow).toContainText('lifetime ISA');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
  });

  test('Verify adding Pension - Personal', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('pension');
    await app.actions.assetModal.addAssetSubType('Personal');
    await app.actions.assetModal.addPensionType('SIPP');
    await app.actions.assetModal.addAssetAgencyStatus('under agency');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('pension');
    await expect(assetRow).toContainText('personal');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
    await expect(assetRow).toContainText('under agency');
  });

  test('Verify adding Pension - Workplace', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();
    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('pension');
    await app.actions.assetModal.addAssetSubType('Workplace');
    await app.actions.assetModal.addPensionType('AVC');
    await app.actions.assetModal.addAssetAgencyStatus('under agency');

    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );

    await app.actions.assetModal.saveAsset();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    await expect(assetRow).toContainText(provider);
    await expect(assetRow).toContainText('pension');
    await expect(assetRow).toContainText('workplace');
    await expect(assetRow).toContainText(newPolicy);
    await expect(assetRow).toContainText('in force');
    await expect(assetRow).toContainText('under agency');
  });
});

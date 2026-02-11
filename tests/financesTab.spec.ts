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

    test('Verify adding JISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const jisaPolicyName = `JISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('JISA');
      await app.actions.assetModal.addAssetSubType('Junior Cash ISA');

      await app.actions.assetModal.addAssetPolicyDetails(
        jisaPolicyName,
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

      const assetRow = app.pages.finance.assetRowByName(jisaPolicyName);
      await expect(assetRow).toContainText(provider);
      await expect(assetRow).toContainText('JISA');
      await expect(assetRow).toContainText(/junior cash ISA/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });

    test('Verify adding Help to Buy ISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('ISA');
      await app.actions.assetModal.addAssetSubType('Help To Buy ISA');

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
      await expect(assetRow).toContainText(/help to buy ISA/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });

    test('Verify adding Innovative Finance ISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('ISA');
      await app.actions.assetModal.addAssetSubType('Innovative Finance ISA');

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
      await expect(assetRow).toContainText(/innovative finance ISA/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });

    test('Verify adding Lifetime ISA', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('ISA');
      await app.actions.assetModal.addAssetSubType('Lifetime ISA');

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
      await expect(assetRow).toContainText(/lifetime ISA/i);
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
    });

    test('Verify adding Pension - Personal', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

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
      await expect(assetRow).toContainText('pension');
      await expect(assetRow).toContainText('personal');
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
      await expect(assetRow).toContainText('under agency');
    });

    test('Verify adding Pension - Workplace', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

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
      await expect(assetRow).toContainText('pension');
      await expect(assetRow).toContainText('workplace');
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
      await expect(assetRow).toContainText('under agency');
    });

    test('Verify adding Pension - Occupational', async ({ app, page }) => {
      const ownerTag = `e2e-${stamp()}`;
      const isaPolicyName = `ISA-${ownerTag}`;
      const seed = getSeed();
      const newPolicy = policyNumber();
      const provider = 'Aviva';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openFinancesTab();
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('pension');
      await app.actions.assetModal.addAssetSubType('Occupational');
      await app.actions.assetModal.addPensionType('S.32');
      await app.actions.assetModal.addAssetAgencyStatus('under agency');

      await app.actions.assetModal.addAssetPolicyDetails(
        isaPolicyName,
        provider,
        newPolicy,
        'in force'
      );

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
      await expect(assetRow).toContainText('pension');
      await expect(assetRow).toContainText('occupational');
      await expect(assetRow).toContainText(newPolicy);
      await expect(assetRow).toContainText('in force');
      await expect(assetRow).toContainText('under agency');
    });
  });

  test('Finances Tab - Verify successfully adding Withdrawal - Transfer Away', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;
    const withdrawalType = 'transfer away';
    const frequency = 'monthly';

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

    await app.actions.finance.expandAsset(isaPolicyName);
    await app.pages.finance.addWithdrawalButton().click();
    await app.actions.withdrawalModal.addWithdrawalType(withdrawalType);
    await app.actions.withdrawalModal.addTargetAmount(uniqueAmount.toString());
    await app.actions.withdrawalModal.addFrequency(frequency);
    await app.actions.withdrawalModal.saveWithdrawal();

    const withdrawalRow = app.pages.finance.withdrawalRowByAmount(uniqueAmount);
    await expect(withdrawalRow).toContainText(withdrawalType);
    await expect(withdrawalRow).toContainText(frequency);
    await expect(withdrawalRow).toContainText('draft');
    await expect(withdrawalRow).toContainText('pre-existing');
  });

  test('Finances Tab - Verify successfully adding Withdrawal - Cash Withdrawal', async ({
    app,
  }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;
    const withdrawalType = 'cash withdrawal';
    const frequency = 'monthly';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('ISA');
    await app.actions.assetModal.addAssetSubType('stocks & shares ISA');
    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );
    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    await app.actions.finance.expandAsset(isaPolicyName);
    await app.pages.finance.addWithdrawalButton().click();
    await app.actions.withdrawalModal.addWithdrawalType(withdrawalType);
    await app.actions.withdrawalModal.addTargetAmount(uniqueAmount.toString());
    await app.actions.withdrawalModal.addFrequency(frequency);
    await app.actions.withdrawalModal.saveWithdrawal();

    const withdrawalRow = app.pages.finance.withdrawalRowByAmount(uniqueAmount);
    await expect(withdrawalRow).toContainText(withdrawalType);
    await expect(withdrawalRow).toContainText(frequency);
    await expect(withdrawalRow).toContainText('draft');
    await expect(withdrawalRow).toContainText('pre-existing');
  });

  test('Finances Tab - Verify successfully adding contribution - Cash Transfer', async ({
    app,
  }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('ISA');
    await app.actions.assetModal.addAssetSubType('stocks & shares ISA');
    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );
    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    await app.actions.finance.expandAsset(isaPolicyName);

    await app.pages.finance.addContributionButton().click();
    await app.actions.contributionModal.addType('Cash Transfer');
    await app.actions.contributionModal.selectFirstTransferredFrom();
    await app.actions.contributionModal.enterEstimatedAmount(uniqueAmount.toString());
    await app.actions.contributionModal.selectStatus('submitted');
    await app.actions.contributionModal.selectFrequency('monthly');
    await app.actions.contributionModal.selectTransferType('cash');
    await app.actions.contributionModal.selectTargetDateToday();
    await app.actions.contributionModal.saveContribution();

    const contributionRow = app.pages.finance.contributionRowByAmount(uniqueAmount);
    await expect(contributionRow).toContainText('cash transfer');
    await expect(contributionRow).toContainText('submitted');
    await expect(contributionRow).toContainText('monthly');
    await expect(contributionRow).toContainText('existing contribution');
  });

  test('Finances Tab - Verify successfully adding contribution - GIA to ISA', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('ISA');
    await app.actions.assetModal.addAssetSubType('stocks & shares ISA');
    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );
    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    await app.actions.finance.expandAsset(isaPolicyName);

    await app.pages.finance.addContributionButton().click();
    await app.actions.contributionModal.addType('GIA to ISA');
    await app.actions.contributionModal.selectFirstTransferredFrom();
    await app.actions.contributionModal.enterEstimatedAmount(uniqueAmount.toString());
    await app.actions.contributionModal.selectStatus('submitted');
    await app.actions.contributionModal.selectFrequency('monthly');
    await app.actions.contributionModal.selectTargetDateToday();
    await app.actions.contributionModal.saveContribution();

    const contributionRow = app.pages.finance.contributionRowByAmount(uniqueAmount);
    await expect(contributionRow).toContainText('submitted');
    await expect(contributionRow).toContainText('monthly');
    await expect(contributionRow).toContainText('existing contribution');
  });

  test('Finances Tab - Verify successfully adding contribution - Cash', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('ISA');
    await app.actions.assetModal.addAssetSubType('stocks & shares ISA');
    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );
    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    await app.actions.finance.expandAsset(isaPolicyName);

    await app.pages.finance.addContributionButton().click();
    await app.actions.contributionModal.addType('cash');
    await app.actions.contributionModal.enterEstimatedAmount(uniqueAmount.toString());
    await app.actions.contributionModal.selectStatus('submitted');
    await app.actions.contributionModal.selectFrequency('monthly');
    await app.actions.contributionModal.selectTargetDateToday();
    await app.actions.contributionModal.saveContribution();

    const contributionRow = app.pages.finance.contributionRowByAmount(uniqueAmount);
    await expect(contributionRow).toContainText('cash');
    await expect(contributionRow).toContainText('submitted');
    await expect(contributionRow).toContainText('monthly');
    await expect(contributionRow).toContainText('existing contribution');
  });

  test('Finances Tab - Add valuation successfully to asset', async ({ app }) => {
    const ownerTag = `e2e-${stamp()}`;
    const isaPolicyName = `ISA-${ownerTag}`;
    const seed = getSeed();
    const newPolicy = policyNumber();
    const provider = 'Aviva';
    const uniqueAmount = Math.floor(Math.random() * 8901) + 100;

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.header.openFinancesTab();

    await app.pages.finance.addAssetButton().click();
    await app.actions.assetModal.addAssetOverview('ISA');
    await app.actions.assetModal.addAssetSubType('stocks & shares ISA');
    await app.actions.assetModal.addAssetPolicyDetails(
      isaPolicyName,
      provider,
      newPolicy,
      'in force'
    );
    await app.actions.assetModal.addPolicyStatusDate();
    await app.actions.assetModal.saveAsset();

    await app.pages.finance.valuationButtonForAsset(isaPolicyName).click();
    await app.actions.assetModal.addAssetValuation(uniqueAmount.toString());
    await app.actions.assetModal.saveAssetValuation();

    const assetRow = app.pages.finance.assetRowByName(isaPolicyName);
    const formattedAmount = `£${uniqueAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    await expect(assetRow).toContainText(formattedAmount);
  });
});

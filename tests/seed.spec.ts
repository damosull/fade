import { test, expect } from '../src/fixtures/baseTest';
import fs from 'node:fs';
import path from 'node:path';
import { navigateToHome } from '../src/seed/auth';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const policyNumber = () => `Policy-${stamp()}`;
const getSeedOutputDir = (projectName: string) =>
  process.env.SEED_OUTPUT_DIR ? process.env.SEED_OUTPUT_DIR : `.seed-cache/${projectName}`;

if (process.env.CI) test.slow();

test.beforeEach(async ({ page }, testInfo) => {
  console.log('────────────────────────────────────────────');
  console.log(`[seed] beforeEach: project=${testInfo.project.name}`);
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium', { quiet: true });
  console.log('[seed] beforeEach: navigateToHome done →', page.url());
  console.log('────────────────────────────────────────────');
});

test.describe('Fade seeded flows', () => {
  let seedData = {
    ownerTag: '',
    introducerAdviserName: '',
    introducerFirmName: '',
    accountSurname: '',
    isaPolicyName: '',
    giaPolicyName: '',
    protectionPolicyNumber: '',
    trustAccountName: '',
    corporationAccountName: '',
  };

  test('Introducers + Individual account creation + assets + protection', async ({ app, page }) => {
    console.log('──────────────────────────────');
    console.log('[seed] START createOneSeed()');
    console.log('──────────────────────────────');

    const ownerTag = `e2e-${stamp()}`;
    console.log(`[seed] Using ownerTag: ${ownerTag}`);
    console.log('[seed] Current URL:', page.url());

    let introducerAdviserName = '';
    let introducerFirmName = '';
    let accountSurname = '';
    let isaPolicyName = '';
    let giaPolicyName = '';
    let protectionPolicyNumber = '';

    seedData.ownerTag = ownerTag;

    await test.step('Open Compliance via hamburger', async () => {
      console.log('[seed] Opening hamburger…');
      await app.actions.header.openHamburgerMenu();
      console.log('[seed] ✅ Hamburger clicked.');
      console.log('[seed] Clicking Compliance…');
      await app.actions.header.navigateToCompliance();
      console.log('[seed] ✅ Compliance clicked, waiting for heading…');
      await app.actions.compliance.compliancePageHeading();
      console.log('[seed] ✅ Compliance heading present.');
      console.log('[seed] Waiting for Add Introducer button…');
      await expect(app.pages.compliance.addIntroducerButton()).toBeVisible({ timeout: 120000 });
      await app.pages.compliance.addIntroducerButton().scrollIntoViewIfNeeded();
      await expect(app.pages.compliance.addIntroducerButton()).toBeEnabled({ timeout: 120000 });
      console.log('[seed] ✅ Add Introducer button is visible & enabled.');
    });

    await test.step('Create Adviser introducer', async () => {
      console.log('[seed] Clicking Add Introducer for Adviser…');
      await app.actions.compliance.clickAddIntroducerButton();
      console.log('[seed] ✅ Add Introducer modal opened (Adviser).');

      introducerAdviserName = `Adviser-${ownerTag}`;
      seedData.introducerAdviserName = introducerAdviserName;
      console.log('[seed] Filling Adviser introducer form…');
      await app.actions.compliance.addIntroducer(
        introducerAdviserName,
        `adviser.${ownerTag}@test.co.uk`,
        '01234567890'
      );
      console.log('[seed] ✅ Basic details entered.');
      await app.actions.compliance.addIntroducerSource('adviser', 'approved');
      console.log('[seed] ✅ Source set.');
      await app.actions.compliance.addAdviser('Finance Hub');
      console.log('[seed] ✅ Adviser assigned.');
      await app.actions.compliance.addIntroducerFeeSplit('25', 'initial advice fee', 'net');
      await app.actions.compliance.addIntroducerFeeSplit('43', 'ongoing advice fee', 'gross');
      console.log('[seed] ✅ Fee splits added.');
      await app.pages.compliance.addIntroducerSaveButton().click();
      console.log('[seed] ✅ Save clicked, waiting for settle…');
      try {
        await expect(
          page.getByText('Introducer fee splits created successfully', { exact: false }).first()
        ).toBeVisible({ timeout: 20_000 });
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }
      console.log(`[seed] ✅ Adviser introducer created: ${introducerAdviserName}`);
    });

    await test.step('Create Firm introducer', async () => {
      console.log('[seed] Preparing to add Firm introducer…');
      await expect(app.pages.compliance.addIntroducerButton()).toBeVisible({ timeout: 120000 });
      await app.pages.compliance.addIntroducerButton().scrollIntoViewIfNeeded();
      await expect(app.pages.compliance.addIntroducerButton()).toBeEnabled({ timeout: 120000 });
      await app.actions.compliance.clickAddIntroducerButton();
      console.log('[seed] ✅ Add Introducer modal opened (Firm).');

      introducerFirmName = `Firm-${ownerTag}`;
      seedData.introducerFirmName = introducerFirmName;
      console.log('[seed] Filling Firm introducer form…');
      await app.actions.compliance.addIntroducer(
        introducerFirmName,
        `firm.${ownerTag}@test.co.uk`,
        '01234567890'
      );
      console.log('[seed] ✅ Firm details entered.');
      await app.actions.compliance.addIntroducerSource('firm generated', 'approved');
      console.log('[seed] ✅ Firm source set.');
      await app.actions.compliance.addIntroducerFeeSplit('30', 'initial advice fee', 'gross');
      await app.actions.compliance.addIntroducerFeeSplit('13', 'ongoing advice fee', 'net');
      console.log('[seed] ✅ Firm fee splits added.');
      await app.pages.compliance.addIntroducerSaveButton().click();
      console.log('[seed] ✅ Save clicked (Firm), waiting…');
      try {
        await expect(
          page.getByText('Introducer fee splits created successfully', { exact: false }).first()
        ).toBeVisible({ timeout: 20_000 });
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }
      console.log(`[seed] ✅ Firm introducer created: ${introducerFirmName}`);
    });

    await test.step('Create Individual account', async () => {
      accountSurname = `Rec-${ownerTag}`;
      seedData.accountSurname = accountSurname;
      console.log('[seed] Creating Individual account:', accountSurname);
      await app.actions.account.createAccount(
        'Account & Service Case',
        'Individual',
        'Test Superadmin',
        accountSurname,
        undefined,
        `test${ownerTag}@test.co.uk`,
        'personal',
        'Finance Hub',
        'professional introducer',
        introducerFirmName, // use the actual created firm
        '1000'
      );
      console.log('[seed] ✅ Account details entered.');
      await app.actions.account.saveNewAccount();
      console.log('[seed] ✅ Individual account save clicked.');
      try {
        await expect(
          page.getByText('The Individual has been created', { exact: true }).first()
        ).toBeVisible({ timeout: 20_000 });
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }
      console.log(`[seed] ✅ Individual account created: ${accountSurname}`);
    });

    await test.step('Create ISA + valuation for Individual account', async () => {
      console.log('[seed] Navigating to Finances tab…');
      await app.actions.header.openFinancesTab();
      console.log('[seed] ✅ Finances tab open.');

      isaPolicyName = `ISA-${ownerTag}`;
      seedData.isaPolicyName = isaPolicyName;
      console.log('[seed] Adding ISA asset:', isaPolicyName);
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('isa');
      await app.actions.assetModal.addAssetAgencyStatus('under agency');
      await app.actions.assetModal.addAssetPolicyDetails(
        isaPolicyName,
        'Aviva',
        policyNumber(),
        'in force'
      );
      await app.actions.assetModal.saveAsset();
      console.log('[seed] ✅ ISA asset saved.');

      await app.pages.assetModal.addValuationButton().first().scrollIntoViewIfNeeded();
      await expect(app.pages.assetModal.addValuationButton().first()).toBeVisible({
        timeout: 20_000,
      });
      await expect(app.pages.assetModal.addValuationButton().first()).toBeEnabled();
      await app.pages.assetModal.addValuationButton().first().click();
      await app.actions.assetModal.addAssetValuation('2000000');
      await app.actions.assetModal.saveAssetValuation();
      console.log('[seed] ✅ ISA valuation saved.');
    });

    await test.step('Create GIA + valuation for Individual account', async () => {
      giaPolicyName = `GIA-${ownerTag}`;
      seedData.giaPolicyName = giaPolicyName;
      console.log('[seed] Adding GIA asset:', giaPolicyName);
      await app.pages.finance.addAssetButton().click();
      await app.actions.assetModal.addAssetOverview('gia');
      await app.actions.assetModal.addAssetAgencyStatus('under agency');
      await app.actions.assetModal.addAssetPolicyDetails(
        giaPolicyName,
        'Aviva',
        policyNumber(),
        'in force'
      );
      await app.actions.assetModal.saveAsset();
      console.log('[seed] ✅ GIA asset saved.');

      await app.pages.assetModal.addValuationButton().last().scrollIntoViewIfNeeded();
      await expect(app.pages.assetModal.addValuationButton().last()).toBeVisible({
        timeout: 20_000,
      });
      await expect(app.pages.assetModal.addValuationButton().last()).toBeEnabled();
      await app.pages.assetModal.addValuationButton().last().click();
      await app.actions.assetModal.addAssetValuation('5000000');
      await app.actions.assetModal.saveAssetValuation();
      console.log('[seed] ✅ GIA valuation saved.');
    });

    await test.step('Create protection policy for Individual account', async () => {
      console.log('[seed] Adding protection policy…');
      await page.getByRole('heading', { name: 'protection policies' }).scrollIntoViewIfNeeded();
      await app.pages.finance.addPolicyButton().click();
      protectionPolicyNumber = policyNumber();
      seedData.protectionPolicyNumber = protectionPolicyNumber;
      await app.actions.addPolicy.addPolicyBasics(
        protectionPolicyNumber,
        'new',
        'key man',
        'Aviva',
        'under agency',
        'non-advised'
      );
      await page.waitForLoadState('networkidle');
      console.log(`[seed] ✅ Protection policy created (${protectionPolicyNumber}).`);
    });

    console.log(`[seed] ✅ Individual account creation completed: ${accountSurname}`);
  });

  test('Trust account creation', async ({ app, page }) => {
    const trustAccountName = `Trust-${seedData.ownerTag}`;
    seedData.trustAccountName = trustAccountName;
    const introducerFirmName = seedData.introducerFirmName;

    console.log('[seed] Creating Trust account:', trustAccountName);
    await app.actions.account.createAccount(
      'Account & Service Case',
      'Trust',
      undefined,
      undefined,
      trustAccountName,
      `trust${seedData.ownerTag}@test.co.uk`,
      'solicitor',
      'Finance Hub',
      'professional introducer',
      introducerFirmName,
      '1000'
    );
    console.log('[seed] ✅ Trust account details entered.');
    await app.actions.account.saveNewAccount();
    console.log('[seed] ✅ Trust account save clicked.');
    try {
      await expect(
        page.getByText('The Trust has been created', { exact: true }).first()
      ).toBeVisible({ timeout: 20_000 });
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
    console.log(`[seed] ✅ Trust account created: ${trustAccountName}`);
  });

  test('Corporation account creation', async ({ app, page }) => {
    const corporationAccountName = `Corp-${seedData.ownerTag}`;
    seedData.corporationAccountName = corporationAccountName;
    const introducerFirmName = seedData.introducerFirmName;

    console.log('[seed] Creating Corporation account:', corporationAccountName);
    await app.actions.account.createAccount(
      'Account & Service Case',
      'Corporation',
      undefined,
      undefined,
      corporationAccountName,
      `corp${seedData.ownerTag}@test.co.uk`,
      'solicitor',
      'Finance Hub',
      'professional introducer',
      introducerFirmName,
      '1000'
    );
    console.log('[seed] ✅ Corporation account details entered.');
    await app.actions.account.saveNewAccount();
    console.log('[seed] ✅ Corporation account save clicked.');
    try {
      await expect(
        page.getByText('The Corporation has been created', { exact: true }).first()
      ).toBeVisible({ timeout: 20_000 });
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
    console.log(`[seed] ✅ Corporation account created: ${corporationAccountName}`);
  });

  test.afterAll(async ({}, testInfo) => {
    const outDir = getSeedOutputDir(testInfo.project.name);
    fs.mkdirSync(outDir, { recursive: true });
    const seedsFile = path.join(outDir, 'seeds.json');
    const payload = {
      project: testInfo.project.name,
      createdAt: new Date().toISOString(),
      data: seedData,
    };
    fs.writeFileSync(seedsFile, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`[seed] wrote ${seedsFile}`);

    console.log('──────────────────────────────');
    console.log('[seed] ✅ Single seed creation completed and saved.');
    console.log('──────────────────────────────');
  });
});

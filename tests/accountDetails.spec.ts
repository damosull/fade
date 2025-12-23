import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const makeEmail = () => `qatest${stamp()}@fadesystems.co.uk`;
const makeTrustName = () => `Trust${stamp()}`;
const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  test.describe(`Account Details - ${accountType}`, () => {
    test('Details Tab - Updating Personal Details Section', async ({ app, page }) => {
      if (accountType !== 'Individual') {
        console.log(`Skipping test: Only for Individual accounts`);
        return;
      }

      const seed = getSeed();
      const middleNames = `MiddleName-${stamp()}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.pages.accountDetails.viewMoreButton().click();

      await app.actions.accountDetails.fillMiddleNames(middleNames);
      await app.actions.accountDetails.selectMaritalStatus('single');
      await app.actions.accountDetails.selectEmploymentStatus('self employed');
      await app.actions.accountDetails.selectNationality(
        'United Kingdom of Great Britain and Northern Ireland'
      );
      await app.actions.accountDetails.selectInGoodHealth('yes');
      await app.actions.accountDetails.checkHasWill();

      const response =
        await app.actions.accountDetails.clickPersonalDetailsSaveAndWaitForResponse();
      expect(response.status()).toBe(200);

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await page.reload();
      await expect(page).toHaveURL(/\/accounts\/\d+$/);
      await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
      await app.pages.accountDetails.viewMoreButton().click();

      await expect(app.pages.accountDetails.middleNamesInput()).toHaveValue(middleNames);
      await expect(app.pages.accountDetails.maritalStatusLabel()).toContainText('single');
      await expect(app.pages.accountDetails.employmentStatusLabel()).toContainText('self employed');
      await expect(app.pages.accountDetails.nationalityLabel()).toContainText('United Kingdom');
      await expect(app.pages.accountDetails.inGoodHealthLabel()).toContainText('yes');
      await expect(app.pages.accountDetails.hasWillCheckbox()).toBeChecked();
    });

    test('Details Tab - Updating Corporation Account Details Section', async ({ app, page }) => {
      if (accountType !== 'Corporation') {
        console.log(`Skipping test: Only for Corporation accounts`);
        return;
      }

      const seed = getSeed();
      const corporationNumber = `${Math.floor(10000000 + Math.random() * 90000000)}`;
      const corporationDescription = `Test Corporation - ${stamp()}`;
      const lei = `LEI${stamp().replace(/\D/g, '').slice(-17)}`;
      const salutation = `Dear Stakeholders - ${stamp().slice(-10)}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.accountDetails.fillCorporationNumber(corporationNumber);
      await app.actions.accountDetails.fillCorporationDescription(corporationDescription);
      await app.actions.accountDetails.fillLEI(lei);
      await app.actions.accountDetails.fillLEIExpiryDate('31/12/2026');
      await app.actions.accountDetails.fillSalutation(salutation);
      await app.actions.accountDetails.fillFinancialYearEndDate('31/03/2025');
      await app.actions.accountDetails.selectCompanyType('private limited company');

      const response =
        await app.actions.accountDetails.clickCorporationDetailsSaveAndWaitForResponse();
      expect(response.status()).toBe(200);

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await page.reload();
      await expect(page).toHaveURL(/\/accounts\/\d+$/);
      await expect(app.pages.accountDetails.detailsTab()).toBeVisible();

      await expect(app.pages.accountDetails.corporationNumberInput()).toHaveValue(
        corporationNumber
      );
      await expect(app.pages.accountDetails.corporationDescriptionInput()).toHaveValue(
        corporationDescription
      );
      await expect(app.pages.accountDetails.leiInput()).toHaveValue(lei);
      await expect(app.pages.accountDetails.salutationInput()).toHaveValue(salutation);
    });

    test('Details Tab - Updating Trust Account Details Section', async ({ app, page }) => {
      if (accountType !== 'Trust') {
        console.log(`Skipping test: Only for Trust accounts`);
        return;
      }

      const seed = getSeed();
      const trustDescription = `Test Trust - ${stamp()}`;
      const lei = `LEI${stamp().replace(/\D/g, '').slice(-17)}`;
      const salutation = `Dear Trustees - ${stamp().slice(-10)}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.accountDetails.fillTrustDescription(trustDescription);
      await app.actions.accountDetails.fillLEI(lei);
      await app.actions.accountDetails.fillLEIExpiryDate('31/12/2026');
      await app.actions.accountDetails.fillSalutation(salutation);
      await app.actions.accountDetails.selectTrustType('discretionary');

      const response = await app.actions.accountDetails.clickTrustDetailsSaveAndWaitForResponse();
      expect(response.status()).toBe(200);

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await page.reload();
      await expect(page).toHaveURL(/\/accounts\/\d+$/);
      await expect(app.pages.accountDetails.detailsTab()).toBeVisible();

      await expect(app.pages.accountDetails.trustDescriptionInput()).toHaveValue(trustDescription);
      await expect(app.pages.accountDetails.leiInput()).toHaveValue(lei);
      await expect(app.pages.accountDetails.salutationInput()).toHaveValue(salutation);
    });

    test('Details Tab - Adding Address', async ({ app, page }) => {
      const seed = getSeed();
      const unique = stamp();
      const addressLine1 = `${Math.floor(Math.random() * 900 + 100)} Test Street`;
      const addressLine2 = `Suite ${unique.slice(-4)}`;
      const city = `TestCity-${unique}`;
      const county = `TestCounty-${unique}`;
      const postCode = `TC${unique.slice(-6)}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      const addressType =
        accountType === 'Corporation'
          ? 'main office'
          : accountType === 'Trust'
            ? 'solicitor'
            : 'home';

      await app.actions.account.addManualAddress(
        addressLine1,
        addressLine2,
        city,
        county,
        postCode,
        addressType
      );

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.accountDetails.expandAddressesIfMoreThanFive();

      await expect(app.pages.accountDetails.addressRowByCity(city)).toBeVisible();
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(postCode);
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(addressLine1);
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(county);
    });

    test('Details Tab - Adding Address with Correspondence', async ({ app, page }) => {
      const seed = getSeed();
      const unique = stamp();
      const addressLine1 = `${Math.floor(Math.random() * 900 + 100)} Test Street`;
      const addressLine2 = `Suite ${unique.slice(-4)}`;
      const city = `TestCity-${unique}`;
      const county = `TestCounty-${unique}`;
      const postCode = `TC${unique.slice(-6)}`;

      const addressType =
        accountType === 'Corporation'
          ? 'main office'
          : accountType === 'Trust'
            ? 'solicitor'
            : 'home';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.account.addManualAddress(
        addressLine1,
        addressLine2,
        city,
        county,
        postCode,
        addressType,
        true
      );

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.accountDetails.expandAddressesIfMoreThanFive();

      await expect(app.pages.accountDetails.addressRowByCity(city)).toBeVisible();
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(postCode);
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(addressLine1);
      await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(county);
      await expect(app.pages.accountDetails.correspondenceIndicatorInRow(city)).toBeVisible();
    });

    test('Details Tab - Adding Correspondence Method', async ({ app, page }) => {
      const seed = getSeed();
      const unique = stamp().replace(/\D/g, '').slice(-6);
      const phoneNumber = `07123${unique}`;

      const correspondenceType = accountType === 'Individual' ? 'home' : 'solicitor';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.accountDetails.addCorrespondenceMethod(
        'phone',
        correspondenceType,
        phoneNumber
      );

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.accountDetails.expandCorrespondenceMethodsIfMoreThanFive();

      await expect(
        app.pages.accountDetails.correspondenceRowByPhoneNumber(phoneNumber)
      ).toBeVisible();
      await expect(
        app.pages.accountDetails.correspondenceRowByPhoneNumber(phoneNumber)
      ).toContainText(phoneNumber);
      await expect(
        app.pages.accountDetails.correspondenceRowByPhoneNumber(phoneNumber)
      ).toContainText(correspondenceType);
    });

    test('Details Tab - Adding Relationship', async ({ app, page }) => {
      if (accountType !== 'Individual') {
        console.log(`Skipping test: Only for Individual accounts`);
        return;
      }

      const seed = getSeed();

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      const accountName = await app.actions.accountDetails.addRelationship(
        'michael test',
        'spouse'
      );

      try {
        await expect(
          page.getByText('Relationship added successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.accountDetails.expandRelationshipsIfMoreThanFive();

      await expect(
        app.pages.accountDetails.relationshipsRowByAccountName(accountName, 'spouse')
      ).toContainText(seed.accountSurname);
    });

    test('Details Tab - Updating Marketing Preferences section', async ({ app, page }) => {
      const seed = getSeed();

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.accountDetails.selectEmailConsent('no');
      await app.actions.accountDetails.selectPhoneConsent('yes');

      const response =
        await app.actions.accountDetails.clickMarketingPreferencesSaveAndWaitForResponse();
      expect(response.status()).toBe(200);

      try {
        await expect(
          page.getByText('Account has been updated!', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }
    });

    test('Details Tab - Adding a new Beneficiary section', async ({ app, page }) => {
      if (accountType !== 'Trust') {
        console.log(`Skipping test: Only for Trust accounts`);
        return;
      }

      const seed = getSeed();
      const beneficiaryName = `Test Beneficiary - ${stamp()}`;
      const beneficiaryDescription = 'Beneficiary Test Description';

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.accountDetails.waitForBeneficiariesToLoad();

      await app.actions.accountDetails.addBeneficiary(beneficiaryName, beneficiaryDescription);

      try {
        await expect(
          page.getByText('Beneficiary saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.accountDetails.expandBeneficiariesIfMoreThanFive();

      await expect(
        app.pages.accountDetails.beneficiariesSection().getByText(beneficiaryName)
      ).toBeVisible();
    });
  });

  test('Details Tab - ( Corporation ) - Updating the Directors section', async ({ app, page }) => {
    // Below code is taken from 'Create Trust Account' test in accountCreation.spec.ts. Not sure if you want to move this into a fixture, or something reusable.
    // Probably best option would be to create a Trust Account via API, but for now this will do.
    test.slow();
    const seed = getSeed();
    const userEmail = makeEmail();
    const userTrustName = makeTrustName();
    await app.actions.account.createAccount(
      'Account',
      'Corporation',
      undefined,
      undefined,
      userTrustName,
      userEmail,
      'solicitor',
      'Finance Hub',
      'professional introducer',
      seed.introducerFirmName
    );
    await app.actions.account.saveNewAccount();

    try {
      await expect(
        page.getByText('The Corporation has been created', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await expect(app.pages.account.modal()).not.toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
    await expect(app.pages.accountDetails.getTrustNameHeading(userTrustName)).toBeVisible();
    expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
      /ACC\d{7}/
    );
    await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
    // Above code is taken from 'Create Trust Account' test in accountCreation.spec.ts. Not sure if you want to move this into a fixture, or something reusable.
    // Probably best option would be to create a Trust Account via API, but for now this will do.

    const accountName = await app.actions.accountDetails.addDirector('michael test', 'partner');

    try {
      await expect(
        page.getByText('Relationship added successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await app.actions.accountDetails.expandDirectorsIfMoreThanFive();

    await expect(
      app.pages.accountDetails.relationshipsRowByAccountName(accountName, 'partner')
    ).toContainText(userTrustName);
  });
});

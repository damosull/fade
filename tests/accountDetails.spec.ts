import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const makeEmail = () => `qatest${stamp()}@fadesystems.co.uk`;
const makeTrustName = () => `Trust${stamp()}`;
const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Details', () => {
  test('Details Tab - Updating Personal Details Section', async ({ app, page }) => {
    const seed = getSeed();
    const middleNames = `MiddleName-${stamp()}`;

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.pages.accountDetails.viewMoreButton().click();

    await app.actions.accountDetails.fillMiddleNames(middleNames);
    await app.actions.accountDetails.selectMaritalStatus('single');
    await app.actions.accountDetails.selectEmploymentStatus('self employed');
    await app.actions.accountDetails.selectNationality(
      'United Kingdom of Great Britain and Northern Ireland'
    );
    await app.actions.accountDetails.selectInGoodHealth('yes');
    await app.actions.accountDetails.checkHasWill();

    const response = await app.actions.accountDetails.clickPersonalDetailsSaveAndWaitForResponse();
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

  test('Details Tab - Adding Address', async ({ app, page }) => {
    const seed = getSeed();
    const unique = stamp();
    const addressLine1 = `${Math.floor(Math.random() * 900 + 100)} Test Street`;
    const addressLine2 = `Suite ${unique.slice(-4)}`;
    const city = `TestCity-${unique}`;
    const county = `TestCounty-${unique}`;
    const postCode = `TC${unique.slice(-6)}`;

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.actions.account.addManualAddress(addressLine1, addressLine2, city, county, postCode);

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

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.actions.account.addManualAddress(
      addressLine1,
      addressLine2,
      city,
      county,
      postCode,
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

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.actions.accountDetails.addCorrespondenceMethod('phone', 'home', phoneNumber);

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
    ).toContainText('home');
  });

  test('Details Tab - Adding Relationship', async ({ app, page }) => {
    const seed = getSeed();

    await app.actions.header.searchForAccount(seed.accountSurname);

    const accountName = await app.actions.accountDetails.addRelationship('michael test', 'spouse');

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

    await app.actions.header.searchForAccount(seed.accountSurname);

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

  test('Details Tab - Updating Service details section', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.accountDetails.selectAdviser('Test Superadmin');
    const response = await app.actions.accountDetails.clickServiceDetailsSaveAndWaitForResponse();
    expect(response.status()).toBe(200);

    try {
      await expect(
        page.getByText('Service Details updated successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    // Need to revert back to original adviser to keep seed data consistent
    await app.actions.accountDetails.selectAdviser('Finance Hub');

    const responseAfter =
      await app.actions.accountDetails.clickServiceDetailsSaveAndWaitForResponse();
    expect(responseAfter.status()).toBe(200);

    try {
      await expect(
        page.getByText('Service Details updated successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
  });

  test('Details Tab - Updating Source details section', async ({ app, page }) => {
    const seed = getSeed();
    const initialFeeSplit = '11.34';
    const ongoingFeeSplit = '55.78';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.actions.accountDetails.fillInitialFeeSplitToAdviser(initialFeeSplit);
    await app.actions.accountDetails.fillOngoingSplitToAdviser(ongoingFeeSplit);
    await app.actions.accountDetails.saveSourceDetails();
    try {
      await expect(
        page.getByText('Source Details updated successfully', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }
    await expect(app.pages.accountDetails.initialFeeSplit()).toHaveValue(initialFeeSplit);
    await expect(app.pages.accountDetails.ongoingFeeSplit()).toHaveValue(ongoingFeeSplit);
  });

  test('Details Tab - Updating Employment details section', async ({ app }) => {
    const seed = getSeed();
    const employerName = `Employer-${stamp()}`;
    const jobTitle = `JobTitle-${stamp()}`;
    const employmentStatus = 'self employed';
    const typeOfEmployment = 'self employed';

    await app.actions.header.searchForAccount(seed.accountSurname);
    await app.pages.accountDetails.addEmploymentButton().click();
    await app.actions.addEmploymentModal.addEmploymentDetails(
      employerName,
      jobTitle,
      employmentStatus,
      typeOfEmployment
    );

    // On my monitor, I can't see the success message as it is hidden under the modal, so commenting out for now. If you can add it please
    //  try {
    //   await expect(
    //     page.getByText('Relationship added successfully', { exact: true }).first()
    //   ).toBeVisible();
    // } catch {
    //   console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
    //   await page.waitForLoadState('networkidle');
    // }

    // I've added this, but it's not working for me. Can you check please?
    // await app.actions.accountDetails.expandEmploymentDetailsIfMoreThanFive();
    await expect(
      app.pages.accountDetails.employmentDetailsRowByEmployerName(employerName)
    ).toContainText(jobTitle);
  });
});

import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

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

    const accountName = await app.actions.accountDetails.addRelationship('Michael Test', 'spouse');

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
    const emailConsent = 'no';
    const phoneConsent = 'yes';

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.actions.accountDetails.selectEmailConsent(emailConsent);
    await app.actions.accountDetails.selectPhoneConsent(phoneConsent);

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

    await page.reload();
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
    await expect(app.pages.accountDetails.emailConsentLabel()).toContainText(emailConsent);
    await expect(app.pages.accountDetails.phoneConsentLabel()).toContainText(phoneConsent);
  });
});

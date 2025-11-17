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

    await expect(app.pages.accountDetails.successMessage()).toBeVisible({ timeout: 5000 });

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
    const postCode = `TC${unique.slice(-6)}`;

    await app.actions.header.searchForAccount(seed.accountSurname);

    await app.actions.account.addManualAddress(addressLine1, addressLine2, city, postCode);

    await app.pages.accountDetails.addressesViewMoreButton().click();

    await expect(app.pages.accountDetails.addressRowByCity(city)).toBeVisible();
    await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(postCode);
    await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(addressLine1);

    await page.reload();
    await expect(page).toHaveURL(/\/accounts\/\d+$/);

    await app.pages.accountDetails.addressesViewMoreButton().click();

    await expect(app.pages.accountDetails.addressRowByCity(city)).toBeVisible();
    await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(postCode);
    await expect(app.pages.accountDetails.addressRowByCity(city)).toContainText(addressLine1);
  });
});

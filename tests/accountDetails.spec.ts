import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Details - Personal Details Updates', () => {
  test('WM-99 - Details Tab - Updating Personal Details Section', async ({ app, page }) => {
    const middleNames = `MiddleName-${stamp()}`;

    await app.pages.individual.firstListItem().click();
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();

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
});

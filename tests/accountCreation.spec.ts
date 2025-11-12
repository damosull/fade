import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Creation', () => {
  test('WM-105 - Account Creation - Create Individual Account', async ({ app, page }) => {
    const firstName = 'ACTest';
    const lastName = `Account-${stamp()}`;
    const email = `actest.account.${stamp()}@fadetest.com`;

    await app.actions.accountCreation.clickCreateNew();
    await app.actions.accountCreation.selectAccountType('Individual');
    await app.actions.accountCreation.fillName(firstName, lastName);
    await app.actions.accountCreation.fillEmail(email);
    await app.actions.accountCreation.selectEmailType('personal');
    await app.actions.accountCreation.selectAdviser('Finance Hub');
    await app.actions.accountCreation.selectHighLevelSource('professional introducer');
    await app.actions.accountCreation.selectFirstIntroducer();
    await app.actions.accountCreation.clickAddAccount();

    await expect(app.pages.accountCreation.modal()).not.toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
    await expect(app.pages.accountDetails.getAccountNameHeading(firstName, lastName)).toBeVisible();
    expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
      /ACC\d{7}/
    );
    await expect(app.pages.accountDetails.getEmailLink(email)).toHaveText(email);
  });
});

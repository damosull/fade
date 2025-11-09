import { test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Creation', () => {
  test('WM-105 - Account Creation - Create Individual Account', async ({ app }) => {
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

    await app.actions.accountCreation.assertModalClosed();
    await app.actions.accountDetails.assertOnDetailsTab();
    await app.actions.accountDetails.assertAccountName(firstName, lastName);
    await app.actions.accountDetails.assertAccountNumberExists();
    await app.actions.accountDetails.assertEmailDisplayed(email);
  });
});

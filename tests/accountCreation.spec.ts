import { test } from '@playwright/test';
import { navigateToHome } from '../src/seed/auth';
import { pages } from '../src/seed/pages';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Creation', () => {
  test('WM-105 - Account Creation - Create Individual Account', async ({ page }) => {
    const { accountCreation, accountDetails } = pages(page);

    const firstName = 'ACTest';
    const lastName = `Account-${stamp()}`;
    const email = `actest.account.${stamp()}@fadetest.com`;

    await accountCreation.clickCreateNew();
    await accountCreation.selectAccountType('Individual');
    await accountCreation.fillName(firstName, lastName);
    await accountCreation.fillEmail(email);
    await accountCreation.selectEmailType('personal');
    await accountCreation.selectAdviser('Finance Hub');
    await accountCreation.selectHighLevelSource('Professional Introducer');
    await accountCreation.selectFirstIntroducer();
    await accountCreation.clickAddAccount();

    await accountCreation.assertModalClosed();
    await accountDetails.assertOnDetailsTab();
    await accountDetails.assertAccountName(firstName, lastName);
    await accountDetails.assertAccountNumberExists();
    await accountDetails.assertEmailDisplayed(email);
  });

  test('WM-104 - Account Creation - Create Individual Account & Service Case', async ({ page }) => {
    const { accountCreation, accountDetails } = pages(page);

    const firstName = 'ACTest';
    const lastName = `AccountCreation-${stamp()}`;
    const email = `actest.${stamp()}@fadetest.com`;
    const today = new Date().toLocaleDateString('en-GB');

    await accountCreation.clickCreateNew();
    await accountCreation.selectAccountAndServiceCase();
    await accountCreation.selectAccountType('Individual');
    await accountCreation.fillName(firstName, lastName);
    await accountCreation.fillEmail(email);
    await accountCreation.selectEmailType('work');
    await accountCreation.selectAdviser('Finance Hub');
    await accountCreation.selectHighLevelSource('Professional Introducer');
    await accountCreation.selectFirstIntroducer();
    await accountCreation.fillDateOfEnquiry(today);
    await accountCreation.fillIndicativeValue('1000');
    await accountCreation.clickAddAccount();

    await accountCreation.assertModalClosed();
    await accountDetails.assertOnDetailsTab();
    await accountDetails.assertAccountName(firstName, lastName);
    await accountDetails.assertAccountNumberExists();
    await accountDetails.assertEmailDisplayed(email);
  });
});

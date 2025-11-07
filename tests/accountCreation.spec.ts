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

  test('WM-103 - Account Creation - Create Trust Account', async ({ page }) => {
    const { accountCreation, accountDetails } = pages(page);

    const trustName = `ACTest Trust-${stamp()}`;
    const email = `actest.trust.${stamp()}@fadetest.com`;
    const today = new Date().toLocaleDateString('en-GB');

    await accountCreation.clickCreateNew();
    await accountCreation.selectAccountAndServiceCase();
    await accountCreation.selectAccountType('Trust');
    await accountCreation.fillTrustName(trustName);
    await accountCreation.fillEmail(email);
    await accountCreation.selectEmailType('solicitor');
    await accountCreation.selectAdviser('Finance Hub');
    await accountCreation.selectHighLevelSource('Professional Introducer');
    await accountCreation.selectFirstIntroducer();
    await accountCreation.fillDateOfEnquiry(today);
    await accountCreation.clickAddAccount();

    await accountCreation.assertModalClosed();
    await accountDetails.assertOnDetailsTab();
    await accountDetails.assertTrustName(trustName);
    await accountDetails.assertAccountNumberExists();
    await accountDetails.assertEmailDisplayed(email);
  });

  test('WM-102 - Account Creation - Create Trust Account & Service Case', async ({ page }) => {
    const { accountCreation, accountDetails } = pages(page);

    const trustName = `ACTest TrustServiceCase-${stamp()}`;
    const email = `actest.trustsc.${stamp()}@fadetest.com`;
    const today = new Date().toLocaleDateString('en-GB');

    await accountCreation.clickCreateNew();
    await accountCreation.selectAccountAndServiceCase();
    await accountCreation.selectAccountType('Trust');
    await accountCreation.fillTrustName(trustName);
    await accountCreation.fillEmail(email);
    await accountCreation.selectEmailType('solicitor');
    await accountCreation.selectAdviser('Finance Hub');
    await accountCreation.selectHighLevelSource('Professional Introducer');
    await accountCreation.selectFirstIntroducer();
    await accountCreation.fillDateOfEnquiry(today);
    await accountCreation.fillIndicativeValue('1000');
    await accountCreation.clickAddAccount();

    await accountCreation.assertModalClosed();
    await accountDetails.assertOnDetailsTab();
    await accountDetails.assertTrustName(trustName);
    await accountDetails.assertAccountNumberExists();
    await accountDetails.assertEmailDisplayed(email);
  });
});

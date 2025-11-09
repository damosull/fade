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

  test('WM-104 - Account Creation - Create Individual Account & Service Case', async ({ app }) => {
    const firstName = 'ACTest';
    const lastName = `AccountCreation-${stamp()}`;
    const email = `actest.${stamp()}@fadetest.com`;

    await app.actions.accountCreation.clickCreateNew();
    await app.actions.accountCreation.selectAccountAndServiceCase();
    await app.actions.accountCreation.selectAccountType('Individual');
    await app.actions.accountCreation.fillName(firstName, lastName);
    await app.actions.accountCreation.fillEmail(email);
    await app.actions.accountCreation.selectEmailType('work');
    await app.actions.accountCreation.selectAdviser('Finance Hub');
    await app.actions.accountCreation.selectHighLevelSource('professional introducer');
    await app.actions.accountCreation.selectFirstIntroducer();
    await app.actions.accountCreation.fillDateOfEnquiry();
    await app.actions.accountCreation.fillIndicativeValue('1000');
    await app.actions.accountCreation.clickAddAccount();

    await app.actions.accountCreation.assertModalClosed();
    await app.actions.accountDetails.assertOnDetailsTab();
    await app.actions.accountDetails.assertAccountName(firstName, lastName);
    await app.actions.accountDetails.assertAccountNumberExists();
    await app.actions.accountDetails.assertEmailDisplayed(email);
  });

  test('WM-103 - Account Creation - Create Trust Account', async ({ app }) => {
    const trustName = `ACTest Trust-${stamp()}`;
    const email = `actest.trust.${stamp()}@fadetest.com`;

    await app.actions.accountCreation.clickCreateNew();
    await app.actions.accountCreation.selectAccountAndServiceCase();
    await app.actions.accountCreation.selectAccountType('Trust');
    await app.actions.accountCreation.fillTrustName(trustName);
    await app.actions.accountCreation.fillEmail(email);
    await app.actions.accountCreation.selectEmailType('solicitor');
    await app.actions.accountCreation.selectAdviser('Finance Hub');
    await app.actions.accountCreation.selectHighLevelSource('professional introducer');
    await app.actions.accountCreation.selectFirstIntroducer();
    await app.actions.accountCreation.fillDateOfEnquiry();
    await app.actions.accountCreation.clickAddAccount();

    await app.actions.accountCreation.assertModalClosed();
    await app.actions.accountDetails.assertOnDetailsTab();
    await app.actions.accountDetails.assertTrustName(trustName);
    await app.actions.accountDetails.assertAccountNumberExists();
    await app.actions.accountDetails.assertEmailDisplayed(email);
  });
});

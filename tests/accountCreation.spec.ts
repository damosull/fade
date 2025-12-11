import { test, expect } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const makeEmail = () => `qatest${stamp()}@fadesystems.co.uk`;
const makeSurname = () => `Surname${stamp()}`;
const makeFirstName = () => `FirstName${stamp()}`;
const makeTrustName = () => `Trust${stamp()}`;
const makeCorporationName = () => `Corporation${stamp()}`;

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

test.describe('Account Creation', () => {
  // test('Create Individual Account', async ({ app, page }) => {
  //   test.slow();
  //   const seed = getSeed();

  //   const userEmail = makeEmail();
  //   const userSurname = makeSurname();
  //   const userFirstName = makeFirstName();

  //   await app.actions.account.createAccount(
  //     'Account',
  //     'Individual',
  //     userFirstName,
  //     userSurname,
  //     undefined,
  //     userEmail,
  //     'personal',
  //     'Finance Hub',
  //     'professional introducer',
  //     seed.introducerFirmName,
  //     undefined
  //   );
  //   await app.actions.account.saveNewAccount();

  //   try {
  //     await expect(
  //       page.getByText('The Individual has been created', { exact: true }).first()
  //     ).toBeVisible();
  //   } catch {
  //     console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
  //     await page.waitForLoadState('networkidle');
  //   }

  //   await expect(app.pages.account.modal()).not.toBeVisible({ timeout: 10_000 });
  //   await expect(page).toHaveURL(/\/accounts\/\d+$/);
  //   await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
  //   await expect(
  //     app.pages.accountDetails.getAccountNameHeading(userFirstName, userSurname)
  //   ).toBeVisible();
  //   expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
  //     /ACC\d{7}/
  //   );
  //   await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  // });

  test('Create Individual Account & Service Case', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userSurname = makeSurname();
    const userFirstName = makeFirstName();

    await app.actions.account.createAccount(
      'Account & Service Case',
      'Individual',
      userFirstName,
      userSurname,
      undefined,
      userEmail,
      'personal',
      'Finance Hub',
      'professional introducer',
      seed.introducerFirmName,
      '10000'
    );
    await app.actions.account.saveNewAccount();

    try {
      await expect(
        page.getByText('The Individual has been created', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await expect(app.pages.account.modal()).not.toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
    await expect(
      app.pages.accountDetails.getAccountNameHeading(userFirstName, userSurname)
    ).toBeVisible();
    expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
      /ACC\d{7}/
    );
    await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  });

  // test('Create Trust Account', async ({ app, page }) => {
  //   test.slow();
  //   const seed = getSeed();

  //   const userEmail = makeEmail();
  //   const userTrustName = makeTrustName();

  //   await app.actions.account.createAccount(
  //     'Account',
  //     'Trust',
  //     undefined,
  //     undefined,
  //     userTrustName,
  //     userEmail,
  //     'solicitor',
  //     'Finance Hub',
  //     'professional introducer',
  //     seed.introducerFirmName
  //   );
  //   await app.actions.account.saveNewAccount();

  //   try {
  //     await expect(
  //       page.getByText('The Trust has been created', { exact: true }).first()
  //     ).toBeVisible();
  //   } catch {
  //     console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
  //     await page.waitForLoadState('networkidle');
  //   }

  //   await expect(app.pages.account.modal()).not.toBeVisible({ timeout: 10_000 });
  //   await expect(page).toHaveURL(/\/accounts\/\d+$/);
  //   await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
  //   await expect(app.pages.accountDetails.getTrustNameHeading(userTrustName)).toBeVisible();
  //   expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
  //     /ACC\d{7}/
  //   );
  //   await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  // });

  test('Create Trust Account & Service Case', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userTrustName = makeTrustName();

    await app.actions.account.createAccount(
      'Account & Service Case',
      'Trust',
      undefined,
      undefined,
      userTrustName,
      userEmail,
      'solicitor',
      'Finance Hub',
      'professional introducer',
      seed.introducerFirmName,
      '1000'
    );
    await app.actions.account.saveNewAccount();

    try {
      await expect(
        page.getByText('The Trust has been created', { exact: true }).first()
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
  });

  // test('Create Corporation Account', async ({ app, page }) => {
  //   test.slow();
  //   const seed = getSeed();

  //   const userEmail = makeEmail();
  //   const userCorporationName = makeCorporationName();

  //   await app.actions.account.createAccount(
  //     'Account',
  //     'Corporation',
  //     undefined,
  //     undefined,
  //     userCorporationName,
  //     userEmail,
  //     'solicitor',
  //     'Finance Hub',
  //     'professional introducer',
  //     seed.introducerFirmName
  //   );
  //   await app.actions.account.saveNewAccount();

  //   try {
  //     await expect(
  //       page.getByText('The Corporation has been created', { exact: true }).first()
  //     ).toBeVisible();
  //   } catch {
  //     console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
  //     await page.waitForLoadState('networkidle');
  //   }

  //   await expect(app.pages.account.modal()).not.toBeVisible({ timeout: 10_000 });
  //   await expect(page).toHaveURL(/\/accounts\/\d+$/);
  //   await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
  //   await expect(app.pages.accountDetails.getTrustNameHeading(userCorporationName)).toBeVisible();
  //   expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
  //     /ACC\d{7}/
  //   );
  //   await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  // });

  test('Create Corporation Account & Service Case', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userCorporationName = makeCorporationName();

    await app.actions.account.createAccount(
      'Account & Service Case',
      'Corporation',
      undefined,
      undefined,
      userCorporationName,
      userEmail,
      'solicitor',
      'Finance Hub',
      'professional introducer',
      seed.introducerFirmName,
      '1000'
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
    await expect(app.pages.accountDetails.getTrustNameHeading(userCorporationName)).toBeVisible();
    expect(await app.pages.accountDetails.accountNumberHeading().textContent()!).toMatch(
      /ACC\d{7}/
    );
    await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  });
});

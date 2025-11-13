import { test, expect } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
const makeEmail = () => `qatest${stamp()}@fadesystems.co.uk`;
const makeSurname = () => `Surname${stamp()}`;
const makeFirstName = () => `FirstName${stamp()}`;

test.describe('Account Creation', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
  });

  test('Create Individual Account', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userSurname = makeSurname();
    const userFirstName = makeFirstName();

    await app.actions.individual.createIndividualAccount(
      'Account',
      'individual',
      userFirstName,
      userSurname,
      userEmail,
      'personal',
      'professional introducer',
      'Test Superadmin',
      seed.introducerFirmName
    );
    await app.actions.individual.saveNewAccount();

    try {
      await expect(
        page.getByText('The Individual has been created', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await expect(app.pages.individual.modal()).not.toBeVisible({ timeout: 10_000 });
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

  test('Create Individual Account & Service Case', async ({ app, page }) => {
    test.slow();
    const seed = getSeed();

    const userEmail = makeEmail();
    const userSurname = makeSurname();
    const userFirstName = makeFirstName();

    await app.actions.individual.createIndividualAccount(
      'Account & Service Case',
      'individual',
      userFirstName,
      userSurname,
      userEmail,
      'personal',
      'professional introducer',
      'Test Superadmin',
      seed.introducerFirmName
    );
    await app.actions.individual.newAccountServiceCaseDetails('1000');
    await app.actions.individual.saveNewAccount();

    try {
      await expect(
        page.getByText('The Individual has been created', { exact: true }).first()
      ).toBeVisible();
    } catch {
      console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
      await page.waitForLoadState('networkidle');
    }

    await expect(app.pages.individual.modal()).not.toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/accounts\/\d+$/);
    await expect(app.pages.accountDetails.detailsTab()).toBeVisible();
    await expect(
      app.pages.accountDetails.getAccountNameHeading(userFirstName, userSurname)
    ).toBeVisible();
    expect(await app.pages.accountDetails.accountNumberHeading().textContent()).toMatch(/ACC\d{7}/);
    await expect(app.pages.accountDetails.getEmailLink(userEmail)).toHaveText(userEmail);
  });
});

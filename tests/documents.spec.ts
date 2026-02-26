import { test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  const suiteTag = `@${accountType.toLowerCase()}`;

  test.describe(`Document Tab - ${accountType} ${suiteTag}`, () => {
    test('Add Document and Validate', async ({ app }) => {
      const seed = getSeed();

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openDocumentsTab();
    });
  });
});

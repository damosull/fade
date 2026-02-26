import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  const suiteTag = `@${accountType.toLowerCase()}`;

  test.describe(`Document Tab - ${accountType} ${suiteTag}`, () => {
    test('Add Document and Validate', async ({ app }) => {
      const seed = getSeed();
      const docDescription = `Doc Desc ${stamp()}`;

      const docType = 'research';
      const docSubType = 'comparison';
      const docURL = 'https://example.com/test-document';

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayFormatted = `${day}/${month}/${year}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);
      await app.actions.header.openDocumentsTab();
      await app.pages.documents.addDocumentButton().click();

      await expect(app.pages.addDocumentModal.header()).toBeVisible();

      await app.actions.addDocumentModal.addDocument({
        type: docType,
        subtype: docSubType,
        url: docURL,
        description: docDescription,
      });

      await expect(app.pages.addDocumentModal.header()).toBeHidden();

      await app.actions.documentsTab.expandDocumentsIfMoreThanFive();

      const docRow = app.pages.documents.documentRowByText(docDescription);
      await expect(app.pages.documents.docLinkColumn(docRow)).toContainText(docURL);
      await expect(app.pages.documents.docTypeColumn(docRow)).toContainText(docType);
      await expect(app.pages.documents.docSubTypeColumn(docRow)).toContainText(docSubType);
      await expect(app.pages.documents.docDateCreatedColumn(docRow)).toContainText(todayFormatted);
    });
  });
});

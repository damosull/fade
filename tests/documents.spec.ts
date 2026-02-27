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

    test('Edit document and Validate', async ({ app, page }) => {
      const seed = getSeed();
      const docDescription = `Doc Desc ${stamp()}`;

      const docType = 'research';
      const docSubType = 'comparison';
      const docURL = 'https://example.com/test-document';

      const updatedType = 'core documents';
      const updatedSubtype = 'fact find';
      const updatedURL = 'https://example.com/edited-doc';
      const updatedDescription = `Edit ${Date.now().toString(36)}`;

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

      await app.actions.documentsTab.expandDocumentRowByText(docDescription);
      await app.actions.documentsTab.updateExpandedDocument({
        type: updatedType,
        subtype: updatedSubtype,
        url: updatedURL,
        description: updatedDescription,
      });
      try {
        await expect(
          page.getByText('Document has been saved', { exact: true }).first()
        ).toBeVisible();
      } catch {
        await page.waitForLoadState('networkidle');
      }

      const docRow = app.pages.documents.documentSummaryRowByText(updatedDescription);
      await expect(app.pages.documents.docLinkColumn(docRow)).toContainText(updatedURL);
      await expect(app.pages.documents.docTypeColumn(docRow)).toContainText(updatedType);
      await expect(app.pages.documents.docSubTypeColumn(docRow)).toContainText(updatedSubtype);
      await expect(app.pages.documents.docDescriptionColumn(docRow)).toContainText(
        updatedDescription
      );
    });

    test('Delete document and Validate', async ({ app }) => {
      const seed = getSeed();
      const docDescription = `Doc Desc ${stamp()}`;

      const docType = 'research';
      const docSubType = 'comparison';
      const docURL = 'https://example.com/test-document';

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

      await expect(app.pages.documents.documentRowByText(docDescription)).toBeVisible();

      const countBefore = await app.pages.documents.documentDataRows().count();

      await app.actions.documentsTab.deleteDocumentRow(docDescription);

      await expect(app.pages.documents.documentDataRows()).toHaveCount(countBefore - 1);
    });
  });
});

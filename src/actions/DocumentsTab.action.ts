import { expect, type Page } from '@playwright/test';
import DocumentsTabPage from '../pages/documentsTab.page';
import { selectFromDropdown } from '../support/helpers';

export class DocumentsTabActions {
  private readonly page: Page;
  private readonly view: DocumentsTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new DocumentsTabPage(page);
  }

  async expandDocumentsIfMoreThanFive(): Promise<void> {
    const rows = this.view.documentsRows();

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      const viewMore = this.view.documentsViewMoreButton();
      if ((await viewMore.count()) > 0) {
        await viewMore.click();
        await expect(this.view.documentsViewLessButton()).toBeVisible();
      }
    } else {
      await expect(this.view.documentsViewMoreButton()).toHaveCount(0);
    }
  }

  async expandDocumentRowByText(docDescription: string): Promise<void> {
    await this.expandDocumentsIfMoreThanFive();
    const row = this.view.documentRowByText(docDescription);
    await this.view.docLinkColumn(row).click();
  }

  async updateExpandedDocument(options: {
    type: string;
    subtype: string;
    url: string;
    description: string;
  }): Promise<void> {
    await selectFromDropdown(this.page, this.view.expandedDocumentRowType(), options.type);
    await selectFromDropdown(this.page, this.view.expandedDocumentRowSubType(), options.subtype);
    await this.view.expandedDocumentRowURL().fill(options.url);
    await this.view.expandedDocumentRowDescription().fill(options.description);
    await this.view.expandedDocumentSaveButton().click();
  }

  async deleteDocumentRow(docDescription: string): Promise<void> {
    await this.expandDocumentsIfMoreThanFive();
    const row = this.view.documentRowByText(docDescription);
    await expect(row).toBeVisible();
    await row.scrollIntoViewIfNeeded();
    await this.view.documentRowDeleteButton(row).click();
  }
}

export default DocumentsTabActions;

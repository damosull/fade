import { expect, type Page } from '@playwright/test';
import DocumentsTabPage from '../pages/documentsTab.page';

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
      await this.view.documentsViewMoreButton().click();
      await expect(this.view.documentsViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.documentsViewMoreButton()).toHaveCount(0);
    }
  }
}

export default DocumentsTabActions;

import { type Locator, type Page } from '@playwright/test';

export class DocumentsTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addDocumentButton() {
    return this.page.getByRole('button', { name: 'Add Document' });
  }

  documentRowByText(docText: string) {
    return this.page.locator('table tbody tr').filter({ hasText: docText });
  }

  expandedDocumentRow() {
    return this.documentsTable()
      .locator('tr')
      .filter({ has: this.page.getByRole('button', { name: 'Save' }) });
  }

  expandedDocumentRowSubType() {
    return this.documentsTable()
      .locator('tr')
      .getByRole('combobox', { name: /^Subtype\*/i });
  }

  expandedDocumentSaveButton() {
    return this.documentsTable().getByRole('button', { name: 'Save' });
  }

  docLinkColumn(row: Locator) {
    return row.locator('td').nth(0);
  }

  docTypeColumn(row: Locator) {
    return row.locator('td').nth(1);
  }

  docSubTypeColumn(row: Locator) {
    return row.locator('td').nth(2);
  }

  docDateCreatedColumn(row: Locator) {
    return row.locator('td').nth(5);
  }

  documentsTable() {
    return this.page.locator('h2').filter({ hasText: 'Documents' }).locator('..').locator('table');
  }

  documentsRows() {
    return this.documentsTable().locator('tbody tr');
  }

  documentsViewMoreButton() {
    return this.documentsTable().getByRole('button', { name: 'View more' });
  }

  documentsViewLessButton() {
    return this.documentsTable().getByRole('button', { name: 'View less' });
  }
}

export default DocumentsTabPage;

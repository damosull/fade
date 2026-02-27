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

  /** Data row with given text, excluding the expanded form row (so column assertions apply). */
  documentSummaryRowByText(docText: string) {
    return this.documentsTable()
      .locator('tbody tr')
      .filter({ hasText: docText })
      .filter({ hasNot: this.documentsTable().getByRole('button', { name: 'Save' }) });
  }

  expandedDocumentRow() {
    return this.documentsTable()
      .locator('tr')
      .filter({ has: this.page.getByRole('button', { name: 'Save' }) });
  }

  expandedDocumentRowType() {
    return this.expandedDocumentRow().getByRole('combobox', { name: /^Type\*/i });
  }

  expandedDocumentRowSubType() {
    return this.expandedDocumentRow().getByRole('combobox', { name: /^Subtype\*/i });
  }

  expandedDocumentRowURL() {
    return this.expandedDocumentRow().getByRole('textbox', { name: /URL/i });
  }

  expandedDocumentRowDescription() {
    return this.expandedDocumentRow().getByRole('textbox', { name: 'Description' });
  }

  expandedDocumentSaveButton() {
    return this.expandedDocumentRow().getByRole('button', { name: 'Save' });
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

  docDescriptionColumn(row: Locator) {
    return row.locator('td').nth(3);
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

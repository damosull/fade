import { type Locator, type Page } from '@playwright/test';

export class DocumentsTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addDocumentButton() {
    return this.page.getByRole('button', { name: 'Add Document' });
  }

  documentRowByText(noteText: string) {
    return this.page.locator('table tbody tr').filter({ hasText: noteText });
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
}

export default DocumentsTabPage;

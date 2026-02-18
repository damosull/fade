import { type Locator, type Page } from '@playwright/test';

export class CommunicationTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addCommunicationButton() {
    return this.page.getByRole('button', { name: 'Add Communication' });
  }

  communicationsTable() {
    return this.page
      .locator('h2')
      .filter({ hasText: 'Communication' })
      .locator('..')
      .locator('table');
  }

  communicationRowMatching(
    type: string,
    direction: string,
    categories: string,
    dateFormatted: string
  ) {
    return this.communicationsTable()
      .locator('tbody tr')
      .filter({ hasText: type })
      .filter({ hasText: direction })
      .filter({ hasText: categories })
      .filter({ hasText: dateFormatted })
      .first();
  }

  communicationTypeColumn(row: Locator) {
    return row.locator('td').nth(0);
  }

  communicationDirectionColumn(row: Locator) {
    return row.locator('td').nth(1);
  }

  communicationCategoriesColumn(row: Locator) {
    return row.locator('td').nth(2);
  }

  communicationDateColumn(row: Locator) {
    return row.locator('td').nth(3);
  }
}

export default CommunicationTabPage;

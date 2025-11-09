import { type Page } from '@playwright/test';

export class AccountDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  detailsTab() {
    return this.page.getByRole('link', { name: 'Details' });
  }

  accountNumberHeading() {
    return this.page.locator('text=/ACC\\d{7}/');
  }

  getAccountNameHeading(firstName: string, lastName: string) {
    const expectedName = `${firstName} ${lastName}`;
    return this.page.locator('h1').filter({ hasText: expectedName });
  }

  getTrustNameHeading(name: string) {
    return this.page.locator('h1').filter({ hasText: name });
  }

  getEmailLink(email: string) {
    return this.page.locator(`a[href="mailto:${email}"]`);
  }
}

export default AccountDetailsPage;

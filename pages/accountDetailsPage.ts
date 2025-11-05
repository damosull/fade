import { type Locator, type Page, expect } from '@playwright/test';

export class AccountDetailsPage {
  //variables
  readonly page: Page;
  readonly detailsTab: Locator;
  readonly accountNumberHeading: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.detailsTab = page.getByRole('link', { name: 'Details' });
    this.accountNumberHeading = page.locator('text=/ACC\\d{7}/');
  }

  //methods
  getAccountNameHeading(firstName: string, lastName: string): Locator {
    const expectedName = `${firstName} ${lastName}`;
    return this.page.locator('h1').filter({ hasText: expectedName });
  }

  getEmailLink(email: string): Locator {
    return this.page.locator(`a[href="mailto:${email}"]`);
  }

  async assertOnDetailsTab() {
    await expect(this.page).toHaveURL(/\/accounts\/\d+$/, { timeout: 5000 });
    await expect(this.detailsTab).toBeVisible({ timeout: 5000 });
  }

  async assertAccountName(firstName: string, lastName: string) {
    const heading = this.getAccountNameHeading(firstName, lastName);
    await expect(heading).toBeVisible({ timeout: 5000 });
  }

  async assertAccountNumberExists() {
    await expect(this.accountNumberHeading).toBeVisible({ timeout: 5000 });
    const accountNumber = await this.accountNumberHeading.textContent();
    expect(accountNumber).toMatch(/ACC\d{7}/);
    return accountNumber;
  }

  async assertEmailDisplayed(email: string) {
    const emailLink = this.getEmailLink(email);
    await expect(emailLink).toBeVisible({ timeout: 5000 });
    await expect(emailLink).toHaveText(email);
  }
}

export default AccountDetailsPage;

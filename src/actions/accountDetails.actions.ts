import { type Page, expect } from '@playwright/test';
import AccountDetailsPage from '../pages/accountDetails.page';

export class AccountDetailsActions {
  private readonly page: Page;
  private readonly view: AccountDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AccountDetailsPage(page);
  }

  async assertOnDetailsTab() {
    await expect(this.page).toHaveURL(/\/accounts\/\d+$/);
    await expect(this.view.detailsTab()).toBeVisible();
  }

  async assertAccountName(firstName: string, lastName: string) {
    const heading = this.view.getAccountNameHeading(firstName, lastName);
    await expect(heading).toBeVisible();
  }

  async assertTrustName(name: string) {
    const heading = this.view.getTrustNameHeading(name);
    await expect(heading).toBeVisible();
  }

  async assertAccountNumberExists() {
    await expect(this.view.accountNumberHeading()).toBeVisible();
    const accountNumber = await this.view.accountNumberHeading().textContent();
    expect(accountNumber).toMatch(/ACC\d{7}/);
    return accountNumber;
  }

  async assertEmailDisplayed(email: string) {
    const emailLink = this.view.getEmailLink(email);
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText(email);
  }
}

export default AccountDetailsActions;

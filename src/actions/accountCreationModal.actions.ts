import { type Page, expect } from '@playwright/test';
import AccountCreationModalPage from '../pages/accountCreationModal.page';

export class AccountCreationModalActions {
  private readonly page: Page;
  private readonly view: AccountCreationModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AccountCreationModalPage(page);
  }

  async clickCreateNew() {
    await this.view.createNewButton().click();
    await expect(this.view.modal()).toBeVisible();
  }

  async selectAccountAndServiceCase() {
    await this.view.accountTypeDropdown().click();
    await this.page.getByRole('option', { name: 'Account & Service Case', exact: true }).click();
  }

  async selectAccountType(accountType: string) {
    await this.view.accountTypeInput().click();
    await this.page.getByRole('option', { name: accountType }).click();
  }

  async fillName(firstName: string, lastName: string) {
    await this.view.firstNameInput().fill(firstName);
    await this.view.lastNameInput().fill(lastName);
  }

  async fillTrustName(name: string) {
    await this.view.nameInput().fill(name);
  }

  async fillEmail(email: string) {
    await this.view.emailInput().fill(email);
  }

  async selectEmailType(emailType: string) {
    await this.view.emailTypeInput().click();
    await this.page.getByRole('option', { name: emailType }).click();
  }

  async selectFirstEmailType() {
    await this.view.emailTypeInput().click();
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async selectAdviser(adviser: string) {
    await this.view.adviserInput().click();
    await this.page.getByRole('option', { name: adviser }).click();
  }

  async selectHighLevelSource(source: string) {
    await this.view.highLevelSourceInput().click();
    await this.page.getByRole('option', { name: source }).click();
  }

  async selectFirstIntroducer() {
    await expect(this.view.introducerInput()).toBeVisible();
    await this.view.introducerInput().click();
    await this.page.waitForSelector('div[role="option"]', { state: 'visible', timeout: 10000 });
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async fillDateOfEnquiry() {
    await expect(this.view.dateOfEnquiryInput()).toBeVisible();
    await this.view.dateOfEnquiryInput().click();
    await this.view.dateOfEnquiryPicker().click();
  }

  async fillIndicativeValue(value: string) {
    await expect(this.view.indicativeValueInput()).toBeVisible();
    await this.view.indicativeValueInput().fill(value);
  }

  async clickAddAccount() {
    await this.view.addAccountButton().click();
  }

  async assertModalClosed() {
    await expect(this.view.modal()).not.toBeVisible({ timeout: 10000 });
  }
}

export default AccountCreationModalActions;

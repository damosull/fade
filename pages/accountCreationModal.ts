import { type Locator, type Page, expect } from '@playwright/test';

export class AccountCreationModalPage {
  //variables
  readonly page: Page;
  readonly createNewButton: Locator;
  readonly modal: Locator;
  readonly accountTypeDropdown: Locator;
  readonly accountTypeInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly emailTypeInput: Locator;
  readonly adviserInput: Locator;
  readonly highLevelSourceInput: Locator;
  readonly introducerInput: Locator;
  readonly dateOfEnquiryInput: Locator;
  readonly addAccountButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.createNewButton = page.getByRole('button', { name: 'Create New' });
    this.modal = page.locator('div[role="dialog"]');
    this.accountTypeDropdown = page.locator('div[role="dialog"] input[role="combobox"]').first();
    this.accountTypeInput = page.locator('label:has-text("Account Type") input[role="combobox"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.emailTypeInput = page.locator('label:has-text("Email type") input[role="combobox"]');
    this.adviserInput = page.locator('label:has-text("Adviser") input[role="combobox"]');
    this.highLevelSourceInput = page.locator(
      'label:has-text("High Level Source") input[role="combobox"]'
    );
    this.introducerInput = page
      .locator('label')
      .filter({ hasText: 'IntroducerSelect' })
      .locator('svg');
    this.dateOfEnquiryInput = page.locator('input[name="startDate"]');
    this.addAccountButton = page.getByRole('button', { name: 'Add Account' });
  }

  //methods
  async clickCreateNew() {
    await this.createNewButton.click();
    await expect(this.modal).toBeVisible({ timeout: 5000 });
  }

  async selectAccountAndServiceCase() {
    await this.accountTypeDropdown.click();
    await this.accountTypeDropdown.fill('Account & Service');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async selectAccountType(accountType: string) {
    await this.accountTypeInput.click();
    await this.accountTypeInput.fill(accountType);
    await this.page.keyboard.press('Enter');
  }

  async fillName(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async selectEmailType(emailType: string) {
    await this.emailTypeInput.click();
    await this.emailTypeInput.fill(emailType);
    await this.page.keyboard.press('Enter');
  }

  async selectAdviser(adviser: string) {
    await this.adviserInput.click();
    await this.adviserInput.fill(adviser);
    await this.page.keyboard.press('Enter');
  }

  async selectHighLevelSource(source: string) {
    await this.highLevelSourceInput.click();
    await this.highLevelSourceInput.fill(source);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async selectFirstIntroducer() {
    await expect(this.introducerInput).toBeVisible({ timeout: 5000 });
    await this.introducerInput.click();
    await this.page.waitForSelector('div[role="option"]', { state: 'visible', timeout: 10000 });
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async fillDateOfEnquiry(date: string) {
    await expect(this.dateOfEnquiryInput).toBeVisible({ timeout: 5000 });
    await this.dateOfEnquiryInput.fill(date);
  }

  async clickAddAccount() {
    await this.addAccountButton.click();
  }

  async assertModalClosed() {
    await expect(this.modal).not.toBeVisible({ timeout: 10000 });
  }
}

export default AccountCreationModalPage;

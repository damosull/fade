import { type Page } from '@playwright/test';

export class AccountCreationModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  createNewButton() {
    return this.page.getByRole('button', { name: 'Create New' });
  }

  modal() {
    return this.page.locator('div[role="dialog"]');
  }

  accountTypeDropdown() {
    return this.page.locator('div[role="dialog"] input[role="combobox"]').first();
  }

  accountTypeInput() {
    return this.page.locator('label').filter({ hasText: 'Account TypeSelect' }).locator('svg');
  }

  firstNameInput() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  lastNameInput() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  nameInput() {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  emailInput() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  emailTypeInput() {
    return this.page.locator('label').filter({ hasText: 'Email typeSelect' }).locator('svg');
  }

  adviserInput() {
    return this.page.locator('label').filter({ hasText: 'AdviserSelect' }).locator('svg');
  }

  highLevelSourceInput() {
    return this.page.locator('label').filter({ hasText: 'High Level SourceSelect' }).locator('svg');
  }

  introducerInput() {
    return this.page.locator('label').filter({ hasText: 'IntroducerSelect' }).locator('svg');
  }

  dateOfEnquiryInput() {
    return this.page.getByRole('group', { name: 'Service Case' }).locator('svg');
  }

  dateOfEnquiryPicker() {
    return this.page.locator('.react-datepicker__day--today');
  }

  indicativeValueInput() {
    return this.page.getByRole('textbox', { name: 'Indicative Value' });
  }

  addAccountButton() {
    return this.page.getByRole('button', { name: 'Add Account' });
  }
}

export default AccountCreationModalPage;

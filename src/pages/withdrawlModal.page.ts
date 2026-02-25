import { type Page } from '@playwright/test';

export class WithdrawalModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addWithdrawalHeading() {
    return this.page.getByRole('heading', { name: 'Add Withdrawal' });
  }

  withdrawalTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Withdrawal Type' }).locator('svg');
  }

  selectWithdrawalTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  targetAmount() {
    return this.page.getByRole('textbox', { name: 'Target Amount' });
  }

  frequencyDropdown() {
    return this.page
      .getByRole('group', { name: 'Overview' })
      .locator('label')
      .filter({ hasText: 'Frequency' })
      .locator('svg');
  }

  selectFrequencyTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addWithdrawalSaveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }
}

export default WithdrawalModalPage;

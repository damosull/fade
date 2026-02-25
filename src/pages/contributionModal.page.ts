import { type Page } from '@playwright/test';

export class ContributionModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modalContainer() {
    return this.page.locator('div').filter({
      has: this.page.getByRole('heading', { name: 'Add Contribution' }),
    });
  }

  addContributionHeading() {
    return this.page.getByRole('heading', { name: 'Add Contribution' });
  }

  typeDropdown() {
    return this.modalContainer()
      .locator('label', {
        has: this.page.locator('span').getByText('Type', { exact: true }),
      })
      .locator('svg')
      .first();
  }

  selectTypeOption(name: string, exact = true) {
    return this.page.getByRole('option', { name, exact });
  }

  transferredFromDropdown() {
    return this.modalContainer()
      .locator('label')
      .filter({ hasText: 'Transferred From' })
      .locator('svg')
      .first();
  }

  firstDropdownOption() {
    return this.page.getByRole('option').first();
  }

  estimatedAmountInput() {
    return this.modalContainer().getByRole('textbox', { name: 'Estimated Amount' });
  }

  statusDropdown() {
    return this.modalContainer()
      .locator('label')
      .filter({ hasText: 'Status' })
      .locator('svg')
      .first();
  }

  selectStatusOption(name: string, exact = true) {
    return this.page.getByRole('option', { name, exact });
  }

  frequencyDropdown() {
    return this.modalContainer()
      .locator('label')
      .filter({ hasText: 'Frequency' })
      .locator('svg')
      .first();
  }

  selectFrequencyOption(name: string, exact = true) {
    return this.page.getByRole('option', { name, exact });
  }

  transferTypeDropdown() {
    return this.modalContainer()
      .locator('label')
      .filter({ hasText: 'Transfer Type' })
      .locator('svg')
      .first();
  }

  selectTransferTypeOption(name: string, exact = true) {
    return this.page.getByRole('option', { name, exact });
  }

  targetDateInput() {
    return this.modalContainer().locator('input[name="fromDate"]');
  }

  datePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }

  addButton() {
    return this.modalContainer().getByRole('button', { name: 'Add' });
  }
}

export default ContributionModalPage;

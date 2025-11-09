import { type Page } from '@playwright/test';

export class ProviderPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  providerHeading() {
    return this.page.getByRole('heading', { name: 'Providers', exact: true });
  }

  providerSearchHeading() {
    return this.page.getByRole('heading', { name: 'All Providers' });
  }

  providerSearchBox() {
    return this.page.getByRole('main').getByRole('searchbox', { name: 'Search' });
  }

  providerAddButton() {
    return this.page.getByRole('button', { name: 'Add Provider' });
  }

  providerSelectLink(providerName: string) {
    return this.page.getByRole('link', { name: providerName });
  }

  addProviderHeading() {
    return this.page.getByRole('heading', { name: 'Add Provider' });
  }

  addProviderName() {
    return this.page.getByRole('textbox', { name: 'Provider Name' });
  }

  saveAddProviderButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  mainDetailsTab() {
    return this.page.getByRole('link', { name: 'Main Details' });
  }

  adminTab() {
    return this.page.getByRole('link', { name: 'Admin', exact: true });
  }

  typeDropdown() {
    return this.page.locator('label').filter({ hasText: /type/i }).locator('svg');
  }

  typeOption(name: string, exact = false) {
    return this.page.getByRole('option', { name, exact });
  }

  providerTypeDescription() {
    return this.page.getByRole('textbox', { name: 'Provider description' });
  }

  addProviderDescriptionButton(typeName: string) {
    const key = typeName.toLowerCase().split(' ')[0];
    return this.page
      .locator('fieldset')
      .filter({ hasText: `Create newType${key}` })
      .getByRole('button');
  }

  bankPaymentRef() {
    return this.page.getByRole('textbox', { name: 'Reference' });
  }

  addBankPaymentRefButton() {
    return this.page
      .locator('fieldset')
      .filter({ hasText: 'Create newReference Add' })
      .getByRole('button');
  }

  bankPaymentRefHeading() {
    return this.page.getByRole('heading', { name: 'Bank Payment Reference Details' });
  }

  ongoingAdviceFeeDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Ongoing Advice Fee Payment' })
      .locator('svg');
  }

  ongoingAdviceFeeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  renewalCommDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Renewal Commission Payment' })
      .locator('svg');
  }

  renewalCommOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  fundBasedCommPaymentDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Fund Based Commission Payment' })
      .locator('svg');
  }

  fundBasedCommPaymentOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  providerAdminSave() {
    return this.page.getByRole('button', { name: 'Save' });
  }
}

export default ProviderPage;

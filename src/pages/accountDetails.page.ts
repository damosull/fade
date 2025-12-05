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

  titleInput() {
    return this.page.locator('label').filter({ hasText: 'Title' }).locator('svg');
  }

  firstNameInput() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  middleNamesInput() {
    return this.page.getByRole('textbox', { name: 'Middle Names' });
  }

  lastNameInput() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  genderInput() {
    return this.page.locator('label').filter({ hasText: 'Gender' }).locator('svg');
  }

  maritalStatusInput() {
    return this.page.locator('label').filter({ hasText: 'Marital Status' }).locator('svg');
  }

  maidenNameInput() {
    return this.page.getByRole('textbox', { name: 'Maiden Name' });
  }

  employmentStatusInput() {
    return this.page.locator('label').filter({ hasText: 'Employment Status' }).locator('svg');
  }

  niNumberInput() {
    return this.page.getByRole('textbox', { name: 'NI Number' });
  }

  nationalityInput() {
    return this.page.locator('label').filter({ hasText: 'Nationality' }).locator('svg');
  }

  ukResidentForTaxCheckbox() {
    return this.page.getByRole('checkbox', { name: 'UK Resident For Tax Purposes' });
  }

  ukDomicileCheckbox() {
    return this.page.getByRole('checkbox', { name: 'UK Domicile' });
  }

  inGoodHealthInput() {
    return this.page.locator('label').filter({ hasText: 'In Good Health' }).locator('svg');
  }

  hasSmokedInput() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Has Smoked In Last 12 Months' })
      .locator('svg');
  }

  hasWillCheckbox() {
    return this.page.getByRole('checkbox', { name: 'Has Will' });
  }

  isWillUpToDateCheckbox() {
    return this.page.getByRole('checkbox', { name: 'Is Will Up To Date' });
  }

  viewMoreButton() {
    return this.page.getByRole('button', { name: 'View more' });
  }

  maritalStatusLabel() {
    return this.page.locator('label').filter({ hasText: 'Marital Status' });
  }

  employmentStatusLabel() {
    return this.page.locator('label').filter({ hasText: 'Employment Status' });
  }

  nationalityLabel() {
    return this.page.locator('label').filter({ hasText: 'Nationality' });
  }

  inGoodHealthLabel() {
    return this.page.locator('label').filter({ hasText: 'In Good Health' });
  }

  personalDetailsSaveButton() {
    return this.page.locator('button:has-text("Save")').first();
  }

  successMessage() {
    return this.page.locator('text=Account has been updated!');
  }

  addressesSection() {
    return this.page.locator('#addresses');
  }

  addressesViewMoreButton() {
    return this.addressesSection().getByRole('button', { name: 'View more' });
  }

  addressesViewLessButton() {
    return this.addressesSection().getByRole('button', { name: 'View less' });
  }

  addressRows() {
    return this.addressesSection().locator('tbody tr');
  }

  addressesLoadingSpinner() {
    return this.addressesSection().locator('svg[data-sentry-element="ArrowPathIcon"]');
  }

  addressRowByCity(city: string) {
    return this.addressesSection().locator('tr').filter({ hasText: city });
  }

  correspondenceIndicatorInRow(city: string) {
    return this.addressRowByCity(city).getByRole('button', { name: 'Correspondence Address' });
  }

  correspondenceMethodsSection() {
    return this.page
      .locator('div.border.border-green.border-l-8')
      .filter({ hasText: 'Correspondence Methods' });
  }

  correspondenceLoadingSpinner() {
    return this.correspondenceMethodsSection().locator('svg[data-sentry-element="ArrowPathIcon"]');
  }

  correspondenceRows() {
    return this.correspondenceMethodsSection().locator('tbody tr');
  }

  correspondenceViewMoreButton() {
    return this.correspondenceMethodsSection().getByRole('button', { name: 'View more' });
  }

  correspondenceViewLessButton() {
    return this.correspondenceMethodsSection().getByRole('button', { name: 'View less' });
  }

  correspondenceMethodInput() {
    return this.correspondenceMethodsSection()
      .locator('label')
      .filter({ hasText: 'Method' })
      .locator('svg');
  }

  correspondenceTypeInput() {
    return this.correspondenceMethodsSection()
      .locator('label')
      .filter({ hasText: 'Type' })
      .locator('svg');
  }

  correspondencePhoneNumberInput() {
    return this.correspondenceMethodsSection().getByRole('textbox', { name: 'Phone number' });
  }

  correspondenceAddButton() {
    return this.correspondenceMethodsSection().getByRole('button', { name: 'Add' });
  }

  correspondenceRowByPhoneNumber(phoneNumber: string) {
    return this.correspondenceMethodsSection().locator('tr').filter({ hasText: phoneNumber });
  }

  correspondenceMethodOption(method: string) {
    return this.page.getByRole('option', { name: method });
  }

  correspondenceTypeOption(type: string) {
    return this.page.getByRole('option', { name: type });
  }

  relationshipsSection() {
    return this.page
      .locator('div.border.border-green.border-l-8')
      .filter({ hasText: 'Relationships' })
      .first();
  }

  relationshipsTable() {
    return this.page.locator('table').filter({ hasText: ' is the ' });
  }

  relationshipsViewMoreButton() {
    return this.relationshipsTable().getByRole('button', { name: 'View more' });
  }

  relationshipsViewLessButton() {
    return this.relationshipsTable().getByRole('button', { name: 'View less' });
  }

  relationshipsAccountInput() {
    return this.relationshipsSection().getByRole('combobox').first();
  }

  relationshipsTypeInput() {
    return this.relationshipsSection().getByRole('combobox').nth(1);
  }

  relationshipsAddButton() {
    return this.relationshipsSection().getByRole('button', { name: 'Add' });
  }

  relationshipsRows() {
    return this.relationshipsTable()
      .locator('tbody tr')
      .filter({ has: this.page.locator('a[href^="/accounts/"]'), hasText: /is the/i });
  }

  relationshipsLoadingSpinner() {
    return this.relationshipsSection().locator('svg[data-sentry-element="ArrowPathIcon"]');
  }

  relationshipsRowByAccountName(accountName: string, relationType: string) {
    const descriptionText = `${accountName} is the ${relationType} of`;
    return this.relationshipsRows().filter({ hasText: descriptionText }).first();
  }

  marketingPreferencesSection() {
    return this.page
      .locator('div.border.border-green.border-l-8')
      .filter({ hasText: 'Marketing Preferences' })
      .first();
  }

  emailConsentInput() {
    return this.page.locator('label').filter({ hasText: 'Email Consent' }).locator('svg');
  }

  phoneConsentInput() {
    return this.page.locator('label').filter({ hasText: 'Phone Consent' }).locator('svg');
  }

  emailConsentLabel() {
    return this.page.locator('label').filter({ hasText: 'Email Consent' });
  }

  phoneConsentLabel() {
    return this.page.locator('label').filter({ hasText: 'Phone Consent' });
  }

  marketingPreferencesSaveButton() {
    return this.marketingPreferencesSection().locator('button').filter({ hasText: 'Save' });
  }
}

export default AccountDetailsPage;

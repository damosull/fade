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

  addressRowByCity(city: string) {
    return this.addressesSection().locator('tr').filter({ hasText: city });
  }

  correspondenceIndicatorInRow(city: string) {
    return this.addressRowByCity(city).getByRole('button', { name: 'Correspondence Address' });
  }

  correspondenceMethodsSection() {
    return this.page.locator('div').filter({ hasText: 'Correspondence Methods' }).first();
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
    return this.correspondenceMethodsSection()
      .locator('form[data-sentry-component="CorrespondenceForm"]')
      .getByRole('button', { name: 'Add' });
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
}

export default AccountDetailsPage;

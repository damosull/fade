import { type Locator, type Page, expect } from '@playwright/test';

export class ProviderPage {
  //variables
  readonly page: Page;
  readonly providerHeading: Locator;
  readonly providerSearchBox: Locator;
  readonly providerAddButton: Locator;
  readonly providerSearchHeading: Locator;
  readonly providerSelect: Locator;
  readonly addProviderName: Locator;
  readonly addProviderHeading: Locator;
  readonly saveAddProviderButton: Locator;
  readonly mainDetailsTab: Locator;
  readonly adminTab: Locator;
  readonly newTypeDropdown: Locator;
  readonly providerType: Locator;
  readonly providerTypeDescription: Locator;
  readonly addProviderDescription: Locator;
  readonly bankPaymentRef: Locator;
  readonly AddBankPaymentRef: Locator;
  readonly bankPaymentRefHeading: Locator;
  readonly providerAdminSave: Locator;
  readonly ongoingAdviceFeeDropdown: Locator;
  readonly ongoingAdviceFeeSelect: Locator;
  readonly renewalCommDropdown: Locator;
  readonly renewalCommSelect: Locator;
  readonly fundBasedCommPaymentDropdown: Locator;
  readonly fundBasedCommPaymentSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.providerHeading = page.getByRole('heading', { name: 'Providers', exact: true });
    this.providerSearchHeading = page.getByRole('heading', { name: 'All Providers' });
    this.providerSearchBox = page.getByRole('main').getByRole('searchbox', { name: 'Search' });
    this.providerAddButton = page.getByRole('button', { name: 'Add Provider' });
    this.providerSelect = page.getByRole('link', { name: 'Select Provider' });
    //popup modal
    this.addProviderHeading = page.getByRole('heading', { name: 'Add Provider' });
    this.addProviderName = page.getByRole('textbox', { name: 'Provider Name' });
    this.saveAddProviderButton = page.getByRole('button', { name: 'Add' });
    //provider
    this.mainDetailsTab = page.getByRole('link', { name: 'Main Details' });
    this.adminTab = page.getByRole('link', { name: 'Admin', exact: true });
    this.newTypeDropdown = page.locator('label').filter({ hasText: /type/i }).locator('svg');
    this.providerType = page.getByRole('option', { name: 'initial advice fee' });
    this.providerTypeDescription = page.getByRole('textbox', { name: 'Provider description' });
    this.addProviderDescription = page
      .locator('fieldset')
      .filter({ hasText: 'Create newTypeinitial advice' })
      .getByRole('button');
    this.bankPaymentRef = page.getByRole('textbox', { name: 'Reference' });
    this.AddBankPaymentRef = page
      .locator('fieldset')
      .filter({ hasText: 'Create newReference Add' })
      .getByRole('button');
    this.bankPaymentRefHeading = page.getByRole('heading', {
      name: 'Bank Payment Reference Details',
    });
    this.ongoingAdviceFeeDropdown = page
      .locator('label')
      .filter({ hasText: 'Ongoing Advice Fee Payment' })
      .locator('svg');
    this.ongoingAdviceFeeSelect = page.getByRole('option', { name: 'monthly' });
    this.renewalCommDropdown = page
      .locator('label')
      .filter({ hasText: 'Renewal Commission Payment' })
      .locator('svg');
    this.renewalCommSelect = page.getByRole('option', { name: 'biannually' });
    this.fundBasedCommPaymentDropdown = page
      .locator('label')
      .filter({ hasText: 'Fund Based Commission Payment' })
      .locator('svg');
    this.fundBasedCommPaymentSelect = page.getByRole('option', { name: 'quarterly' });
    this.providerAdminSave = page.getByRole('button', { name: 'Save' });
  }

  async assertProviderPage() {
    await expect(this.providerHeading).toBeVisible({ timeout: 5000 });
    await expect(this.providerSearchHeading).toBeVisible({ timeout: 5000 });
  }

  async addNewProvider(addProviderName: string) {
    await this.providerAddButton.click();
    await expect(this.addProviderHeading).toBeVisible({ timeout: 5000 });
    await this.addProviderName.fill(addProviderName);
    await this.saveAddProviderButton.click();
    await expect(this.addProviderHeading).toBeHidden();
  }

  async providerDetails(providerSearchBox: string) {
    await this.providerSearchBox.click();
    await this.providerSearchBox.fill(providerSearchBox);
  }

  async selectProvider(providerName: string) {
    const providerLocator = this.page.getByRole('link', { name: providerName });
    await providerLocator.click();
  }

  async providerAdminTab() {
    await this.adminTab.click();
  }

  async createProviderType(typeName: string, description: string, exactMatch: boolean = false) {
    // Click the type dropdown
    await this.page.locator('label').filter({ hasText: 'Type' }).locator('svg').click();

    // Select the type option with exact matching
    const optionSelector = exactMatch
      ? this.page.getByRole('option', { name: typeName, exact: true })
      : this.page.getByRole('option', { name: typeName });

    await optionSelector.click();

    // Fill in the description
    await this.providerTypeDescription.click();
    await this.providerTypeDescription.fill(description);

    // Click the add button
    const addButton = this.page
      .locator('fieldset')
      .filter({ hasText: `Create newType${typeName.toLowerCase().split(' ')[0]}` })
      .getByRole('button');
    await addButton.click();
  }

  async createBankPaymentRef(bankPaymentRef: string) {
    await expect(this.bankPaymentRefHeading).toBeVisible({ timeout: 5000 });
    await this.bankPaymentRef.fill(bankPaymentRef);
    await this.AddBankPaymentRef.click();
  }
  async regularFeePayment(
    ongoingAdviceFeeSelect: string,
    renewalCommSelect: string,
    fundBasedCommPaymentSelect: string
  ) {
    await this.ongoingAdviceFeeDropdown.click();
    await this.page.getByRole('option', { name: ongoingAdviceFeeSelect }).click();
    await this.renewalCommDropdown.click();
    await this.page.getByRole('option', { name: renewalCommSelect }).click();
    await this.fundBasedCommPaymentDropdown.click();
    await this.page.getByRole('option', { name: fundBasedCommPaymentSelect }).click();
  }
}
export default ProviderPage;

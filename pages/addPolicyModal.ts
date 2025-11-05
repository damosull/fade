import { type Locator, type Page, expect } from '@playwright/test';

export class AddPolicyModalPage {
  readonly page: Page;
  readonly addPolicyHeading: Locator;
  readonly policyName: Locator;
  readonly policyNumber: Locator;
  readonly businessTypeDropdown: Locator;
  readonly businessTypeSelect: Locator;
  readonly agencyStatusDropdown: Locator;
  readonly agencyStatusSelect: Locator;
  readonly addPolicySaveButton: Locator;
  readonly categoryDropdown: Locator;
  readonly categorySelect: Locator;
  readonly providerDropdown: Locator;
  readonly adviceTypeDropdown: Locator;
  readonly providerSelect: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.addPolicyHeading = page.getByRole('heading', { name: 'Add Policy' });
    this.policyName = page.getByRole('textbox', { name: 'Policy Name' });
    this.policyNumber = page.getByRole('textbox', { name: 'Policy Number', exact: true });
    this.businessTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Business TypeSelect' })
      .locator('svg');
    this.businessTypeSelect = page.getByRole('option', { name: 'existing' });
    this.agencyStatusDropdown = page
      .locator('label')
      .filter({ hasText: 'Agency StatusSelect' })
      .locator('svg');
    this.agencyStatusSelect = page.getByRole('option', { name: 'under agency', exact: true });
    this.addPolicySaveButton = page.getByRole('button', { name: 'Save' });
    this.categoryDropdown = page
      .locator('label')
      .filter({ hasText: 'CategorySelect' })
      .locator('svg');
    this.categorySelect = page.getByRole('option', { name: 'key man' });
    this.providerDropdown = page
      .locator('label')
      .filter({ hasText: 'ProviderSelect...' })
      .locator('svg');
    this.providerSelect = page.getByRole('option', { name: 'Aviva' });
    this.adviceTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Advice TypeSelect...' })
      .locator('svg');
  }

  //methods
  async addPolicyBasics(
    policyNumber: string,
    businessTypeSelect: string,
    categorySelect: string,
    providerSelect: string,
    agencyStatusSelect: string,
    adviceTypeSelect: string
  ) {
    await expect(this.addPolicyHeading).toBeVisible({ timeout: 5000 });

    await this.policyNumber.fill(policyNumber);
    await this.businessTypeDropdown.click();
    await this.page.getByRole('option', { name: businessTypeSelect }).click();
    await this.categoryDropdown.click();
    await this.page.getByRole('option', { name: categorySelect }).click();
    await this.providerDropdown.click();
    await this.page.getByRole('option', { name: providerSelect }).click();
    await this.agencyStatusDropdown.click();
    await this.page.getByRole('option', { name: agencyStatusSelect, exact: true }).click();
    await this.adviceTypeDropdown.click();
    await this.page.getByRole('option', { name: adviceTypeSelect }).click();
    await this.addPolicySaveButton.click();
  }
}
export default AddPolicyModalPage;

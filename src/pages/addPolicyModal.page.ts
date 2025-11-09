import { type Page } from '@playwright/test';

export class AddPolicyModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addPolicyHeading() {
    return this.page.getByRole('heading', { name: 'Add Policy' });
  }

  policyName() {
    return this.page.getByRole('textbox', { name: 'Policy Name' });
  }

  policyNumber() {
    return this.page.getByRole('textbox', { name: 'Policy Number', exact: true });
  }

  businessTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Business TypeSelect' }).locator('svg');
  }

  agencyStatusDropdown() {
    return this.page.locator('label').filter({ hasText: 'Agency StatusSelect' }).locator('svg');
  }

  categoryDropdown() {
    return this.page.locator('label').filter({ hasText: 'CategorySelect' }).locator('svg');
  }

  providerDropdown() {
    return this.page.locator('label').filter({ hasText: 'ProviderSelect...' }).locator('svg');
  }

  adviceTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Advice TypeSelect...' }).locator('svg');
  }

  addPolicySaveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }
}

export default AddPolicyModalPage;

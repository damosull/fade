import { type Page } from '@playwright/test';

export class AddBeneficiaryModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addPolicyHeading() {
    return this.page.getByRole('heading', { name: 'Add Beneficiary' });
  }

  beneficiaryName() {
    return this.page.getByRole('textbox', { name: 'Beneficiary Name' });
  }

  beneficiaryDescription() {
    return this.page.getByRole('textbox', { name: 'Description' });
  }

  addButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }
}

export default AddBeneficiaryModalPage;

import { expect, type Page } from '@playwright/test';
import AddPolicyModalPage from '../pages/addPolicyModal.page';
import { selectFromDropdown } from '../support/helpers';

export class AddPolicyModalActions {
  private readonly page: Page;
  private readonly view: AddPolicyModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddPolicyModalPage(page);
  }

  async addPolicyBasics(
    policyNumber: string,
    businessTypeSelect: string,
    categorySelect: string,
    providerSelect: string,
    agencyStatusSelect: string,
    adviceTypeSelect: string
  ): Promise<void> {
    await expect(this.view.addPolicyHeading()).toBeVisible();

    await this.view.policyNumber().fill(policyNumber);

    await selectFromDropdown(this.page, this.view.businessTypeDropdown(), businessTypeSelect);
    await selectFromDropdown(this.page, this.view.categoryDropdown(), categorySelect);
    await selectFromDropdown(this.page, this.view.providerDropdown(), providerSelect);
    await selectFromDropdown(this.page, this.view.agencyStatusDropdown(), agencyStatusSelect, true);
    await selectFromDropdown(this.page, this.view.adviceTypeDropdown(), adviceTypeSelect);

    await this.view.addPolicySaveButton().click();
  }
}

export default AddPolicyModalActions;

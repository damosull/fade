import { type Page } from '@playwright/test';

export class RunNewAmlCheckModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  runNewAmlCheckHeading() {
    return this.page.getByRole('heading', { name: 'Run New AML Check' });
  }

  proofOfIdDropdown() {
    return this.page.locator('label').filter({ hasText: 'Proof of IDSelect' }).locator('svg');
  }

  proofOfAddressDropdown() {
    return this.page.locator('label').filter({ hasText: 'Proof of AddressSelect' }).locator('svg');
  }

  politicallyExposedDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Is Politically ExposedSelect' })
      .locator('svg');
  }

  electronicCheckResultDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Electronic Check ResultSelect' })
      .locator('svg');
  }

  passedButton() {
    return this.page.getByRole('button', { name: 'Passed' });
  }
}

export default RunNewAmlCheckModalPage;

import { expect, type Page } from '@playwright/test';
import RunNewAmlCheckModalPage from '../pages/runNewAmlCheckModal.page';
import { selectFromDropdown } from '../support/helpers';

export class RunNewAmlCheckModalActions {
  private readonly page: Page;
  private readonly view: RunNewAmlCheckModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new RunNewAmlCheckModalPage(page);
  }

  async runNewAmlCheck(
    proofOfId: string,
    proofOfAddress: string,
    isPoliticallyExposed: string,
    electronicCheckResult: string,
    result: string
  ) {
    await expect(this.view.runNewAmlCheckHeading()).toBeVisible();

    await selectFromDropdown(this.page, this.view.proofOfIdDropdown(), proofOfId);
    await selectFromDropdown(this.page, this.view.proofOfAddressDropdown(), proofOfAddress);
    await selectFromDropdown(
      this.page,
      this.view.politicallyExposedDropdown(),
      isPoliticallyExposed
    );
    await selectFromDropdown(
      this.page,
      this.view.electronicCheckResultDropdown(),
      electronicCheckResult
    );
    if (result !== 'Passed') {
      throw new Error(`Unsupported AML result: ${result}`);
    }
    await this.view.passedButton().click();
    await expect(this.view.runNewAmlCheckHeading()).toBeHidden();
  }
}

export default RunNewAmlCheckModalActions;

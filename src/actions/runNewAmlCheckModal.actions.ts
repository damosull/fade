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
    await expect(this.view.runNewAmlCheckHeading()).toBeVisible({ timeout: 5000 });

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
    if (result === 'Passed') {
      await this.view.passedButton().click();
    }
  }
}

export default RunNewAmlCheckModalActions;

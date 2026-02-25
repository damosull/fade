import { type Page, expect } from '@playwright/test';
import FeesTabPage from '../pages/feesTab.page';
import { chooseDropdownOption } from '../support/helpers';

export class FeesTabActions {
  private readonly page: Page;
  private readonly view: FeesTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new FeesTabPage(page);
  }

  async addNewFee(
    feeType: string,
    feeSource: string,
    linkToAsset: string,
    linkToServiceCase: string,
    feePayablePercent: string,
    fixedOrPercentage: string,
    amount: string
  ): Promise<void> {
    await this.view.addFeeButton().click();
    await expect(this.view.addFeeHeading()).toBeVisible();

    await this.view.addFeeTypeDropdown().click();
    await chooseDropdownOption(this.page, feeType);

    await this.view.addFeeSourceDropdown().click();
    await chooseDropdownOption(this.page, feeSource);

    await this.view.addFeeLinkToAssetsDropdown().click();
    await chooseDropdownOption(this.page, linkToAsset, false);

    await this.view.addFeeLinkToServiceCaseDropdown().click();
    await chooseDropdownOption(this.page, linkToServiceCase, false);

    await this.view.addFeeFixedPercentageDropdown().click();
    await chooseDropdownOption(this.page, fixedOrPercentage);

    await this.view.addFeePayableToAdviser().fill(feePayablePercent);
    await this.view.amountValue().fill(amount);
    await this.view.addFeeCompleteButton().click();
  }
}

export default FeesTabActions;

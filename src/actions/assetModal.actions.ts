import { expect, type Page } from '@playwright/test';
import AssetModalPage from '../pages/assetModal.page';
import { selectDateByOffset, selectFromDropdown } from '../support/helpers';

export class AssetModalActions {
  private readonly page: Page;
  private readonly view: AssetModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AssetModalPage(page);
  }

  async addAssetOverview(selectAssetType: string) {
    await expect(this.view.addAssetHeading()).toBeVisible({ timeout: 5000 });
    await selectFromDropdown(this.page, this.view.assetTypeDropdown(), selectAssetType, true);
  }

  async addAssetSubType(selectAssetSubType: string) {
    await selectFromDropdown(this.page, this.view.assetSubTypeDropdown(), selectAssetSubType, true);
  }

  async addAssetAgencyStatus(agencyStatusSelect: string) {
    await selectFromDropdown(this.page, this.view.agencyStatusDropdown(), agencyStatusSelect, true);
    await this.view.agencyStatusDateDropdown().click();
    await this.view.agencyStatusDatePickerToday().click();
  }

  async addAssetPolicyDetails(
    policyName: string,
    provider: string,
    policyNumber: string,
    policyStatus: string
  ) {
    await this.view.policyName().fill(policyName);
    await selectFromDropdown(this.page, this.view.providerDropdown(), provider, true);
    await this.view.policyNumber().fill(policyNumber);
    await selectFromDropdown(this.page, this.view.policyStatusDropdown(), policyStatus, true);
  }

  async saveAsset() {
    await this.view.addAssetSaveButton().click();
  }

  async addAssetValuation(value: string) {
    await this.view.assetValue().fill(value);
    await this.view.assetValuationDateDropdown().click();
    await this.view.assetValuationDatePickerToday().click();
  }

  async addAssetValuationDate(daysOffset: number = 0) {
    await selectDateByOffset(this.page, this.view.assetValuationDateDropdown(), daysOffset);
  }

  async saveAssetValuation() {
    await this.view.saveValuationButton().click();
  }

  async addPolicyStatusDate() {
    await this.view.policyStatusDateDropdown().click();
    await this.view.policyStatusDatePickerToday().click();
  }
}

export default AssetModalActions;

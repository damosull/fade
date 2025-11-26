import { expect, type Page } from '@playwright/test';
import AssetModalPage from '../pages/assetModal.page';
import { selectDateByOffset } from '../support/helpers';

export class AssetModalActions {
  private readonly page: Page;
  private readonly view: AssetModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AssetModalPage(page);
  }

  async addAssetOverview(selectAssetType: string) {
    await expect(this.view.addAssetHeading()).toBeVisible({ timeout: 5000 });
    await this.view.assetTypeDropdown().click();
    await this.view.selectAssetTypeOption(selectAssetType).click();
  }

  async addAssetSubType(selectAssetSubType: string) {
    await this.view.assetSubTypeDropdown().click();
    await this.view.selectAssetSubTypeOption(selectAssetSubType).click();
  }

  async addAssetAgencyStatus(agencyStatusSelect: string) {
    await this.view.agencyStatusDropdown().click();
    await this.view.selectAgencyStatusOption(agencyStatusSelect, true).click();
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
    await this.view.providerDropdown().click();
    await this.view.selectProviderOption(provider).click();
    await this.view.policyNumber().fill(policyNumber);
    await this.view.policyStatusDropdown().click();
    await this.view.selectPolicyStatusOption(policyStatus).click();
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

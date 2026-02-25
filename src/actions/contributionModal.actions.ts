import { expect, type Page } from '@playwright/test';
import ContributionModalPage from '../pages/contributionModal.page';

export class ContributionModalActions {
  private readonly page: Page;
  private readonly view: ContributionModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new ContributionModalPage(page);
  }

  async addType(selectType: string) {
    await expect(this.view.addContributionHeading()).toBeVisible();
    await this.view.typeDropdown().click();
    await this.view.selectTypeOption(selectType).click();
  }

  async selectFirstTransferredFrom() {
    await this.view.transferredFromDropdown().click();
    await this.view.firstDropdownOption().click();
  }

  async enterEstimatedAmount(amount: string) {
    await this.view.estimatedAmountInput().fill(amount);
  }

  async selectStatus(status: string) {
    await this.view.statusDropdown().click();
    await this.view.selectStatusOption(status, false).click();
  }

  async selectFrequency(frequency: string) {
    await this.view.frequencyDropdown().click();
    await this.view.selectFrequencyOption(frequency, false).click();
  }

  async selectTransferType(transferType: string) {
    await this.view.transferTypeDropdown().click();
    await this.view.selectTransferTypeOption(transferType, false).click();
  }

  async selectTargetDateToday() {
    await this.view.targetDateInput().click();
    await this.view.datePickerToday().click();
  }

  async saveContribution() {
    await this.view.addButton().click();
  }
}

export default ContributionModalActions;

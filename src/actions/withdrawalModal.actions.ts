import { type Page, expect } from '@playwright/test';
import WithdrawalModalPage from '../pages/withdrawalModal.page';

export class WithdrawalModalActions {
  private readonly page: Page;
  private readonly view: WithdrawalModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new WithdrawalModalPage(page);
  }

  async addWithdrawalType(selectWithdrawalType: string) {
    await expect(this.view.addWithdrawalHeading()).toBeVisible({ timeout: 5000 });
    await this.view.withdrawalTypeDropdown().click();
    await this.view.selectWithdrawalTypeOption(selectWithdrawalType).click();
  }

  async addTargetAmount(amount: string) {
    await this.view.targetAmount().fill(amount);
  }

  async addFrequency(selectFrequency: string) {
    await expect(this.view.addWithdrawalHeading()).toBeVisible({ timeout: 5000 });
    await this.view.frequencyDropdown().click();
    await this.view.selectFrequencyTypeOption(selectFrequency).click();
  }

  async saveWithdrawal() {
    await this.view.addWithdrawalSaveButton().click();
  }
}

export default WithdrawalModalActions;

import { type Page, expect } from '@playwright/test';
import FinanceTabPage from '../pages/financeTab.page';
import { chooseDropdownOption } from '../support/helpers';

export class FinanceTabActions {
  private readonly page: Page;
  private readonly view: FinanceTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new FinanceTabPage(page);
  }

  async expandAsset(assetName: string): Promise<void> {
    const cell = this.page.getByRole('cell', { name: assetName, exact: true });
    await expect(cell).toBeVisible();

    const row = this.page.locator('tr').filter({ has: cell });
    await row.scrollIntoViewIfNeeded();

    const clickableCell = row.locator('td.cursor-pointer').first();
    await expect(clickableCell).toBeVisible();
    await clickableCell.click();
  }

  async addContribution(
    contributionType: string,
    amount: string,
    status: string,
    frequency: string
  ): Promise<void> {
    await this.view.contributionTypeDropdown().click();
    await chooseDropdownOption(this.page, contributionType, true);

    await this.view.estimatedAmount().fill(amount);

    await this.view.statusDropdown().click();
    await chooseDropdownOption(this.page, status);

    await this.view.frequencyDropdown().click();
    await chooseDropdownOption(this.page, frequency);
  }

  async cashTransferContribution(transferType: string): Promise<void> {
    await this.view.transferFromDropdown().click();
    await chooseDropdownOption(this.page, transferType);
  }

  async saveContribution(): Promise<void> {
    await this.view.saveContributionButton().click();
  }
}

export default FinanceTabActions;

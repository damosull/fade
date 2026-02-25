import { type Page, expect } from '@playwright/test';
import FinanceTabPage from '../pages/financeTab.page';
import { chooseDropdownOption, waitForSpinnersToDisappear } from '../support/helpers';

export class FinanceTabActions {
  private readonly page: Page;
  private readonly view: FinanceTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new FinanceTabPage(page);
  }

  async ensureAssetsTableWithAllVisible(): Promise<void> {
    await expect(this.view.assetsNoDataRow()).toHaveCount(0);
    await expect(this.view.assetsTableRows()).not.toHaveCount(0);
    const select = this.view.assetsPerPageSelect();
    const count = await select.count();
    if (count === 0) {
      console.error('[ensureAssetsTableWithAllVisible] Pagination filter select not found.');
      throw new Error('Pagination filter select not found.');
    }
    try {
      await select.first().waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      console.error(
        '[ensureAssetsTableWithAllVisible] Pagination filter select exists but did not become visible.'
      );
      throw new Error('Pagination filter select exists but did not become visible.');
    }
    const options = await this.view.assetsPerPageOptions().allTextContents();
    const allIndex = options.findIndex((opt: string) => opt.toLowerCase() === 'all');
    if (allIndex === -1) {
      console.error(
        '[ensureAssetsTableWithAllVisible] "All" option not found in pagination filter. Options:',
        options
      );
      throw new Error('"All" option not found in pagination filter.');
    }
    const allText = options[allIndex];
    for (let i = 0; i < 2; i++) {
      await select.selectOption({ label: allText });
      try {
        await waitForSpinnersToDisappear(this.page);
      } catch {
        await this.page.waitForLoadState('networkidle');
      }
    }
  }

  async expandAsset(assetIdentifier: string | number): Promise<void> {
    const row =
      typeof assetIdentifier === 'string'
        ? await this.view.assetRowByName(assetIdentifier)
        : await this.view.assetRowByIndex(assetIdentifier);

    await expect(row).toBeVisible();
    await row.scrollIntoViewIfNeeded();

    const clickableCell = row.locator('td.cursor-pointer').first();
    await expect(clickableCell).toBeVisible();
    await clickableCell.click();
  }

  async ensureNonServiceableAssetsVisible() {
    const checkbox = this.view.nonServiceableCheckBox();
    try {
      await checkbox.waitFor({ state: 'visible', timeout: 10000 });
      if (await checkbox.isChecked()) {
        await checkbox.click();
        try {
          await waitForSpinnersToDisappear(this.page, 10000);
        } catch {
          await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        }
      }
    } catch {
      console.log('[finance] Hide non-serviceable assets checkbox not present or visible.');
    }
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

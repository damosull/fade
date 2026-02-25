import { expect, type Page } from '@playwright/test';

export class FinanceTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  assetsNoDataRow() {
    return this.assetsSection()
      .locator('tbody tr')
      .filter({ hasText: /there is no data to display/i });
  }

  assetsTableRows() {
    return this.assetsSection().locator('tbody tr');
  }

  assetsPerPageOptions() {
    return this.assetsPerPageSelect().locator('option');
  }

  assetsHeading() {
    return this.page.getByRole('heading', { name: 'Assets' });
  }

  addAssetButton() {
    return this.page.getByRole('button', { name: 'Add Asset' });
  }

  nonServiceableCheckBox() {
    return this.page.getByRole('checkbox', { name: 'Hide non-serviceable assets' });
  }

  contributionHeading() {
    return this.page.getByText('Contributions');
  }

  addContributionButton() {
    return this.page.getByRole('button', { name: 'Add Contribution' });
  }

  contributionTypeDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: /^TypeSelect\.\.\.$/ })
      .locator('svg');
  }

  contributionTypeOption(name: string) {
    return this.page.getByRole('option', { name, exact: true });
  }

  adviceTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Advice TypeSelect...' }).locator('svg');
  }

  adviceTypeOption(name: string) {
    return this.page.getByRole('option', { name, exact: true });
  }

  estimatedAmount() {
    return this.page.getByRole('textbox', { name: 'Estimated Amount' });
  }

  statusDropdown() {
    return this.page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'StatusSelect...' })
      .locator('svg');
  }

  statusOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  frequencyDropdown() {
    return this.page.locator('label').filter({ hasText: 'FrequencySelect...' }).locator('svg');
  }

  frequencyOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  saveContributionButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  transferFromDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Transferred FromSelect...' })
      .locator('svg');
  }

  transferTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Transfer TypeSelect...' }).locator('svg');
  }

  transferTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  withdrawalHeading() {
    return this.page.getByText('Withdrawals');
  }

  addWithdrawalButton() {
    return this.page.getByRole('button', { name: 'Add Withdrawal' });
  }

  addFeeButton() {
    return this.page.getByRole('button', { name: 'Add Fee' });
  }

  investmentDetailHeading() {
    return this.page.getByText('Investment Details');
  }

  underlyingHoldingsHeading() {
    return this.page.getByText('Underlying Holdings');
  }

  investmentChangesHeading() {
    return this.page.getByText('Investment Changes');
  }

  addPolicyButton() {
    return this.page.getByRole('button', { name: 'Add Policy' });
  }

  assetsSection() {
    return this.page.locator('#assets');
  }

  assetsPerPageSelect() {
    return this.assetsSection().locator('tfoot select');
  }

  async assetRowByName(name: string) {
    const row = this.assetsSection().locator('tbody tr').filter({ hasText: name });
    await expect(row).toHaveCount(1);
    return row;
  }

  async assetRowByIndex(index: number) {
    return this.assetsSection().locator('tbody tr').nth(index);
  }

  withdrawalsSection() {
    return this.page.getByRole('group', { name: 'Withdrawals' });
  }

  withdrawalRowByAmount(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return this.withdrawalsSection().locator('tr').filter({ hasText: formattedAmount });
  }

  contributionsSection() {
    return this.page.getByRole('group', { name: 'Contributions' });
  }

  contributionRowByAmount(amount: number) {
    const formattedAmount = `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return this.contributionsSection().locator('tr').filter({ hasText: formattedAmount });
  }
}

export default FinanceTabPage;

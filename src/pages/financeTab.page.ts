import { type Page } from '@playwright/test';

export class FinanceTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
}

export default FinanceTabPage;
